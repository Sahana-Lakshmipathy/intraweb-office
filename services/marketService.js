export const generateRandomWalk = (count, start, volatility) => {
  const data = [];
  let currentPrice = start;
  const today = new Date();

  for (let i = 0; i < count; i++) {
    if (i > 0) {
      const change = (Math.random() - 0.5) * 2 * volatility;
      currentPrice += change;
      if (currentPrice < 10) currentPrice = 10;
    }

    const date = new Date(today);
    date.setDate(today.getDate() - (count - 1 - i));

    data.push({
      day: i,
      price: parseFloat(currentPrice.toFixed(2)),
      date: date.toISOString().split('T')[0], // YYYY-MM-DD
    });
  }

  return data;
};

export const simulateStockPrice = (basePrice, volatility) => {
  const price = basePrice * (1 + (Math.random() - 0.5) * volatility);
  const change = price - basePrice;
  const changePercent = (change / basePrice) * 100;

  return {
    price: parseFloat(price.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    volume: `${(Math.random() * 10 + 1).toFixed(1)}M`,
    marketCap: `$${(Math.random() * 100 + 50).toFixed(1)}B`
  };
};

export const generateMockFinancialNews = (count) => {
  const headlines = [
    'Tech stocks rally as market eyes new AI breakthroughs',
    'Consumer demand strengthens Q2 earnings forecasts',
    'Global inflation cools, boosting investor confidence',
    'Semiconductor sector outpaces broader market gains',
    'Energy stocks dip amid oil price correction',
    'Markets open higher after strong retail sales data'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    headline: headlines[Math.floor(Math.random() * headlines.length)],
    timestamp: Date.now() - i * 86400000
  }));
};

const indexFundData = [
  { day: 0, price: 150, date: '2025-06-19' },
  { day: 1, price: 152.3, date: '2025-06-20' },
  { day: 2, price: 151.6, date: '2025-06-21' },
  { day: 3, price: 153.2, date: '2025-06-22' },
  { day: 4, price: 155.1, date: '2025-06-23' },
  { day: 5, price: 154.0, date: '2025-06-24' },
  { day: 6, price: 156.4, date: '2025-06-25' },
  { day: 7, price: 158.2, date: '2025-06-26' },
  { day: 8, price: 157.5, date: '2025-06-27' },
  { day: 9, price: 159.3, date: '2025-06-28' },
  { day: 10, price: 160.1, date: '2025-06-29' },
  { day: 11, price: 161.4, date: '2025-06-30' },
  { day: 12, price: 162.0, date: '2025-07-01' },
  { day: 13, price: 163.5, date: '2025-07-02' },
  { day: 14, price: 165.2, date: '2025-07-03' },
  { day: 15, price: 164.3, date: '2025-07-04' },
  { day: 16, price: 166.1, date: '2025-07-05' },
  { day: 17, price: 168.4, date: '2025-07-06' },
  { day: 18, price: 169.2, date: '2025-07-07' },
  { day: 19, price: 170.6, date: '2025-07-08' },
  { day: 20, price: 172.1, date: '2025-07-09' },
  { day: 21, price: 173.3, date: '2025-07-10' },
  { day: 22, price: 172.9, date: '2025-07-11' },
  { day: 23, price: 171.6, date: '2025-07-12' },
  { day: 24, price: 170.2, date: '2025-07-13' },
  { day: 25, price: 171.5, date: '2025-07-14' },
  { day: 26, price: 172.7, date: '2025-07-15' },
  { day: 27, price: 174.0, date: '2025-07-16' },
  { day: 28, price: 175.1, date: '2025-07-17' },
  { day: 29, price: 176.3, date: '2025-07-18' },
];

class MarketService {
  async getMarketData() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const keyStocks = [
      {
        symbol: 'COMP',
        name: 'Company Stock',
        ...simulateStockPrice(145.67, 0.05),
      },
      {
        symbol: 'TECH',
        name: 'Tech Index',
        ...simulateStockPrice(3421.89, 0.03),
      },
      {
        symbol: 'INNO',
        name: 'Innovation Fund',
        ...simulateStockPrice(89.23, 0.08),
      }
    ];

    return {
      keyStocks,
      indexFundData
    };
  }
}

export const marketService = new MarketService();
