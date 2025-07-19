import React, { useState, useMemo, useCallback } from 'react';
import { forumService } from '../services/forumService';
import Card from './Card';

const TopicDetailView = ({ topic: initialTopic, onBack }) => {
  const [topic, setTopic] = useState(initialTopic);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [author] = useState('Author456');

  const handleReplySubmit = useCallback(async (e) => {
    e.preventDefault();
    const content = replyContent.trim();
    if (!content || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const updatedTopic = forumService.addReply(topic.id, { content, author });
      if (updatedTopic) {
        setTopic(updatedTopic);
        setReplyContent('');
      }
    } catch (error) {
      console.error('Failed to submit reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [replyContent, isSubmitting, topic.id, author]);

  const sortedReplies = useMemo(() => {
    return [...topic.replies].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [topic.replies]);

  const formatDate = useCallback((timestamp) => {
    return new Date(timestamp).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
        >
          <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Topics
        </button>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {sortedReplies.length} {sortedReplies.length === 1 ? 'reply' : 'replies'}
        </div>
      </div>

      <Card className="mb-8 overflow-hidden">
        <div className="p-6 lg:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {topic.title}
              </h1>
              <div className="flex items-center mt-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                      {topic.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {topic.author}
                    </span>
                    <span className="mx-2">•</span>
                    <time dateTime={topic.timestamp}>
                      {formatDate(topic.timestamp)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {topic.content}
            </p>
          </div>
        </div>
      </Card>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Discussion
        </h2>

        {sortedReplies.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-lg font-medium mb-2">No replies yet</p>
              <p className="text-sm">Be the first to join the discussion!</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedReplies.map((reply, index) => (
              <div
                key={reply.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <Card className="hover:shadow-md transition-shadow duration-200">
                  <div className="p-4 lg:p-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                            {reply.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                            {reply.author}
                          </span>
                          <span className="text-gray-400 dark:text-gray-500">•</span>
                          <time dateTime={reply.timestamp} className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(reply.timestamp)}
                          </time>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      <Card>
        <form onSubmit={handleReplySubmit} className="p-6 lg:p-8">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Post a Reply
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="reply-content" className="sr-only">
                Reply content
              </label>
              <textarea
                id="reply-content"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none disabled:opacity-50"
                placeholder="Share your thoughts..."
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {replyContent.length > 0 && <span>{replyContent.length} characters</span>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !replyContent.trim()}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Reply
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TopicDetailView;
