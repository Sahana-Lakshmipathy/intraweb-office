import React, { useState, useEffect } from 'react';
import Card from './Card';
import Spinner from './Spinner';

const generateMockMarketData = () => {
  const indexFundData = [];
  const basePrice = 1000 + Math.random() * 500;
  for (let i = 0; i < 30; i++) {
    const fluctuation = (Math.random() - 0.5) * 10;
    const prevPrice = i === 0 ? basePrice : indexFundData[i - 1].price;
    indexFundData.push({
      timestamp: Date.now() - (30 - i) * 86400000,
      price: parseFloat((prevPrice + fluctuation).toFixed(2)),
    });
  }

  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA', 'NFLX', 'META'];
  const keyStocks = symbols.slice(0, 6 + Math.floor(Math.random() * 2)).map(symbol => {
    const base = 100 + Math.random() * 900;
    const change = (Math.random() - 0.5) * 20;
    return {
      symbol,
      name: `Company ${symbol}`,
      price: parseFloat((base + change).toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(((change / base) * 100).toFixed(2)),
    };
  });

  const financialNews = [
    'Markets rally amid optimism in tech sector.',
    'Investors eye inflation report due tomorrow.',
    'Federal Reserve hints at potential rate pause.',
    'Oil prices dip as supply stabilizes.',
    'Major IPO scheduled for next week.',
    'Crypto sees mild recovery after slump.'
  ].sort(() => Math.random() - 0.5).slice(0, 4 + Math.floor(Math.random() * 2));

  return { keyStocks, indexFundData, financialNews };
};

const tagForNews = (news) => {
  if (news.includes('IPO')) return 'IPO';
  if (news.includes('Crypto')) return 'Crypto';
  if (news.includes('Oil')) return 'Energy';
  if (news.includes('Fed')) return 'Policy';
  return 'General';
};

const StockChart = ({ data }) => {
  if (!data || data.length < 2) return null;

  const width = 500;
  const height = 180;
  const padding = 10;

  const prices = data.map(p => p.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const priceRange = maxPrice - minPrice === 0 ? 1 : maxPrice - minPrice;

  const getX = (index) => (index / (data.length - 1)) * (width - 2 * padding) + padding;
  const getY = (price) => height - padding - ((price - minPrice) / priceRange) * (height - 2 * padding);

  const pathData = data.map((point, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(2)} ${getY(point.price).toFixed(2)}`).join(' ');
  const areaPath = `${pathData} V ${height - padding} H ${padding} Z`;

  const startPrice = data[0].price;
  const endPrice = data[data.length - 1].price;
  const isUp = endPrice >= startPrice;
  const strokeColor = isUp ? 'stroke-green-500' : 'stroke-red-500';
  const fillColor = isUp ? '#22c55e' : '#ef4444';

  const movingAvg = data.map((_, i) => {
    const slice = data.slice(Math.max(0, i - 4), i + 1);
    const avg = slice.reduce((sum, p) => sum + p.price, 0) / slice.length;
    return avg;
  });

  const movingAvgPath = movingAvg.map((price, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(2)} ${getY(price).toFixed(2)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isUp ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'} />
          <stop offset="100%" stopColor={isUp ? 'rgba(34, 197, 94, 0)' : 'rgba(239, 68, 68, 0)'} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#chartGradient)" />
      <path d={pathData} fill="none" className={`${strokeColor} transition-all`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={movingAvgPath} fill="none" className="stroke-blue-500" strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx={getX(data.length - 1)} cy={getY(endPrice)} r="4" fill={fillColor} className="animate-pulse" />
    </svg>
  );
};

const StockMarketView = () => {
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const mockData = generateMockMarketData();
      setMarketData(mockData);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        if (!prev) return prev;
        const updated = prev.keyStocks.map(stock => {
          const change = (Math.random() - 0.5) * 2;
          const newPrice = parseFloat((stock.price + change).toFixed(2));
          return {
            ...stock,
            price: newPrice,
            change,
            changePercent: parseFloat(((change / stock.price) * 100).toFixed(2)),
          };
        });
        return { ...prev, keyStocks: updated };
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <Spinner />;
  if (!marketData) return <div className="text-center text-red-500 dark:text-red-400">Failed to load mock market data.</div>;

  const { keyStocks, indexFundData, financialNews } = marketData;
  const indexStart = indexFundData[0].price;
  const indexEnd = indexFundData[indexFundData.length - 1].price;
  const indexChange = indexEnd - indexStart;
  const indexChangePercent = (indexChange / indexStart) * 100;

  const filteredStocks = keyStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStocks = [...keyStocks].sort((a, b) => b.changePercent - a.changePercent);
  const topGainers = sortedStocks.slice(0, 2);
  const topLosers = sortedStocks.slice(-2).reverse();

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Market Dashboard</h2>

      <Card className="mb-8 p-4 md:p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Company Index Fund</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">30-Day Performance</p>
          </div>
          <div className="text-right">
            <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">${indexEnd.toFixed(2)}</p>
            <p className={`text-sm font-semibold ${indexChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {indexChange >= 0 ? '+' : ''}{indexChange.toFixed(2)} ({indexChangePercent.toFixed(2)}%)
            </p>
          </div>
        </div>
        <StockChart data={indexFundData} />
      </Card>

      <input
        type="text"
        placeholder="Search stocks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 w-full"
      />

      <h4 className="text-xl font-semibold mb-2">Top Movers</h4>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[...topGainers, ...topLosers].map(stock => (
          <Card key={stock.symbol} className="p-3 border-l-4 border-green-500 dark:border-green-400">
            <div className="flex justify-between">
              <div>
                <p className="font-bold">{stock.symbol}</p>
                <p className="text-xs text-gray-500">{stock.name}</p>
              </div>
              <p className={`${stock.change >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </p>
            </div>
          </Card>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Key Stocks</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {filteredStocks.map((stock, index) => (
          <div key={stock.symbol} className="animate-pop-in" style={{ animationDelay: `${index * 75}ms` }}>
            <Card className="p-4">
              <p className="font-bold text-lg text-gray-900 dark:text-white">{stock.symbol}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{stock.name}</p>
              <p className="font-semibold text-xl mt-2 text-gray-900 dark:text-white">${stock.price.toFixed(2)}</p>
              <p className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </p>
            </Card>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Today's Financial News</h3>
      <div className="space-y-4">
        {financialNews.map((news, index) => (
          <div key={index} className="animate-pop-in" style={{ animationDelay: `${(keyStocks.length + index) * 75}ms` }}>
            <Card className="p-4 flex items-center justify-between">
              <p className="text-gray-800 dark:text-gray-200 mr-2">{news}</p>
              <span className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 px-2 py-1 text-xs font-semibold rounded">
                {tagForNews(news)}
              </span>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockMarketView;