import React, { useState, useEffect, useCallback } from 'react';
import { forumService } from '../services/forumService';
import Card from './Card';
import Spinner from './Spinner';
import TopicDetailView from './TopicDetailView';
import {Plus,Search,User,MessagesSquare,CheckCircle,Clock,TrendingUp,MessageCircle,Eye,ChevronRight
} from 'lucide-react';
import forumData from '../data/Forums.json';


const CreateTopicForm = ({ onTopicCreated, isOpen, onToggle }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('AuthorName');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const newTopic = forumService.createTopic({ title, content, author });
      onTopicCreated(newTopic);
      setTitle('');
      setContent('');
      onToggle(); // Close form after successful submission
    } catch (error) {
      console.error('Failed to create topic:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="p-6 mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-2 border-indigo-200 dark:border-indigo-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <MessageCircle className="text-indigo-600" size={24} />
          Start a New Discussion
        </h3>
        <button
          onClick={onToggle}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Topic Title
          </label>
          <input
            type="text"
            placeholder="What would you like to discuss?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Message
          </label>
          <textarea
            placeholder="Share your thoughts, ask questions, or start a conversation..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            rows={4}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <User size={16} />
            <span>Posting as <strong>{author}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggle}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Posting...' : 'Post Topic'}
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};

const ForumStats = ({ forums, topics }) => {
  const activeForums = forums.filter(f => f.status === 'Active').length;
  const totalThreads = forums.reduce((sum, f) => sum + f.numberOfThreads, 0);
  const totalUsers = forums.reduce((sum, f) => sum + f.numberOfUsers, 0);
  const recentTopics = topics.filter(t => {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return new Date(t.timestamp) > dayAgo;
  }).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <CheckCircle className="text-white" size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{activeForums}</p>
            <p className="text-sm text-blue-600/80 dark:text-blue-400/80">Active Forums</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500 rounded-lg">
            <MessagesSquare className="text-white" size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalThreads}</p>
            <p className="text-sm text-green-600/80 dark:text-green-400/80">Total Threads</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500 rounded-lg">
            <User className="text-white" size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalUsers}</p>
            <p className="text-sm text-purple-600/80 dark:text-purple-400/80">Active Users</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500 rounded-lg">
            <TrendingUp className="text-white" size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{recentTopics}</p>
            <p className="text-sm text-orange-600/80 dark:text-orange-400/80">Today's Topics</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ForumView = () => {
  const [forums, setForums] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeView, setActiveView] = useState('all');

  const loadTopics = useCallback(() => {
    const allTopics = forumService.getTopics();
    setTopics(allTopics.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setForums(forumData);
        loadTopics();
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch forums:', error);
        setIsLoading(false);
      }
    };
    loadData();
  }, [loadTopics]);

  console.log("ForumView - Current 'forums' state:", forums);
  console.log("ForumView - Current Topics State:", topics);

  const handleTopicCreated = (newTopic) => {
    setTopics(prev => [newTopic, ...prev]);
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const handleBackToList = () => {
    setSelectedTopic(null);
    loadTopics();
  };

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredForums = forums.filter(forum =>
    forum.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return time.toLocaleDateString();
  };

  if (isLoading) return <Spinner />;
  if (selectedTopic) return <TopicDetailView topic={selectedTopic} onBack={handleBackToList} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Community Forums
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Connect, discuss, and share knowledge with your peers
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock size={16} />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus size={20} />
            <span className="font-semibold">New Discussion</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <ForumStats forums={forums} topics={topics} />

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search forums, topics, or discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setActiveView('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeView === 'all'
                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveView('forums')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeView === 'forums'
                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Forums
          </button>
          <button
            onClick={() => setActiveView('topics')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeView === 'topics'
                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Topics
          </button>
        </div>
      </div>

      {/* Create Topic Form */}
      <CreateTopicForm
        onTopicCreated={handleTopicCreated}
        isOpen={showCreateForm}
        onToggle={() => setShowCreateForm(!showCreateForm)}
      />

      {/* Forums Section */}
      {(activeView === 'all' || activeView === 'forums') && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Forum Categories</h2>
            <div className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForums.map((forum) => (
              <Card key={forum.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {forum.title}
                    </h3>
                    <ChevronRight className="text-gray-400 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" size={20} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <User size={16} className="text-blue-500" />
                        <span className="font-semibold">{forum.numberOfUsers}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MessagesSquare size={16} className="text-purple-500" />
                        <span className="font-semibold">{forum.numberOfThreads}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {forum.status === 'Active' ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-green-600 dark:text-green-400 font-medium text-sm">Active</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span className="text-red-600 dark:text-red-400 font-medium text-sm">Inactive</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Topics Section */}
      {(activeView === 'all' || activeView === 'topics') && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Discussions</h2>
            <div className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <Card
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {topic.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="text-white" size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{topic.author}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{getTimeAgo(topic.timestamp)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <MessageCircle size={14} />
                          <span>{topic.replies.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={14} />
                          <span>{Math.floor(Math.random() * 100) + 10}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <MessageCircle className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No discussions found</p>
                <p className="text-gray-400 dark:text-gray-500">
                  {searchQuery ? 'Try adjusting your search terms' : 'Be the first to start a conversation!'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumView;