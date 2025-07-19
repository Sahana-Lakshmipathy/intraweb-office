const FORUM_KEY = 'colleagueConnectForum';

const getTopics = () => {
  try {
    const topicsJSON = localStorage.getItem(FORUM_KEY);
    return topicsJSON ? JSON.parse(topicsJSON) : [];
  } catch (error) {
    console.error("Error reading topics from localStorage", error);
    return [];
  }
};

const saveTopics = (topics) => {
  try {
    localStorage.setItem(FORUM_KEY, JSON.stringify(topics));
  } catch (error) {
    console.error("Error saving topics to localStorage", error);
  }
};

export const forumService = {
  getTopics,

  getTopicById: (id) => {
    return getTopics().find(topic => topic.id === id);
  },

  createTopic: (data) => {
    const topics = getTopics();
    const newTopic = {
      id: `topic-${Date.now()}`,
      timestamp: new Date().toISOString(),
      replies: [],
      ...data,
    };
    saveTopics([...topics, newTopic]);
    return newTopic;
  },

  addReply: (topicId, data) => {
    const topics = getTopics();
    const topicIndex = topics.findIndex(t => t.id === topicId);

    if (topicIndex === -1) return undefined;

    const newReply = {
      id: `reply-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...data,
    };

    topics[topicIndex].replies.push(newReply);
    saveTopics(topics);
    return topics[topicIndex];
  }
};

