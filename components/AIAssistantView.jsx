import { useState, useEffect, useRef } from 'react';
import { createChat } from '../services/geminiService';
import Card from './Card';
import { Sparkles, Bot, User, MessageCircle } from 'lucide-react';

const AIAssistantView = () => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const initChat = () => {
      const newChat = createChat();
      setChat(newChat);
      setMessages([
        {
          role: 'model',
          text: "Hello! I'm your AI assistant. Ask me anything about campus, academics, or more!",
          id: 'init-0',
        },
      ]);
    };
    initChat();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chat) return;

    const newUserMessage = { role: 'user', text: userInput, id: `user-${Date.now()}` };
    setMessages((prev) => [...prev, newUserMessage]);
    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);

    try {
      const stream = await chat.sendMessageStream({ message: currentInput });
      const modelMessageId = `model-${Date.now()}`;
      let fullText = '';
      setMessages((prev) => [...prev, { role: 'model', text: '', id: modelMessageId }]);

      for await (const chunk of stream) {
        fullText += chunk.text;
        setMessages((prev) =>
          prev.map((m) => (m.id === modelMessageId ? { ...m, text: fullText } : m))
        );
      }
    } catch (error) {
      console.error('AI chat error:', error);
      const errorMessage = {
        role: 'model',
        text: 'Sorry, I encountered an error. Please try again.',
        id: `error-${Date.now()}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { id: 1, label: 'Work Schedule', icon: '📚' },
    { id: 2, label: 'Productivity Tips', icon: '💡' },
    { id: 3, label: 'Office Events', icon: '🎉' },
    { id: 4, label: 'Career Advice', icon: '🚀' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get instant help with your campus and academic needs
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
          <Sparkles size={20} />
          <span>AI Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Office AI Assistant</h3>
                  <p className="text-sm text-green-600 dark:text-green-400">Online</p>
                </div>
              </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  } animate-chat-bubble-in`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[80%] ${
                      msg.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-green-500 to-blue-500'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-white" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex items-start gap-3 animate-chat-bubble-in">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-grow px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-full disabled:bg-indigo-400 dark:disabled:bg-indigo-800 transition-colors"
                  disabled={isLoading || !userInput.trim()}
                >
                  Send
                </button>
              </form>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
                >
                  <span className="text-lg">{action.icon}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">AI Features</h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-blue-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-purple-500" />
                <span>Smart Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-green-500" />
                <span>Instant Responses</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantView;
