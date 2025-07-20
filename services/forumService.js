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
    const topics = getTopics(); // Get a fresh copy of topics from localStorage
    const topicIndex = topics.findIndex(t => t.id === topicId);

    if (topicIndex === -1) {
        console.warn(`Topic with ID ${topicId} not found.`); // Add a warning
        return undefined;
    }

    const newReply = {
      id: `reply-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Use a more robust ID for replies
      timestamp: new Date().toISOString(),
      ...data,
    };

    // --- FIX STARTS HERE ---
    // Create a new replies array with the new reply added
    const updatedReplies = [...topics[topicIndex].replies, newReply];

    // Create a new topic object with the updated replies array
    const updatedTopic = {
      ...topics[topicIndex], // Copy all existing properties
      replies: updatedReplies // Override replies with the new array
    };

    // Create a new topics array with the updated topic replacing the old one
    const updatedTopicsList = [
      ...topics.slice(0, topicIndex), // Topics before the updated one
      updatedTopic,                  // The new updated topic object
      ...topics.slice(topicIndex + 1) // Topics after the updated one
    ];

    saveTopics(updatedTopicsList); // Save the new array of topics

    return updatedTopic; // Return the *new* updated topic object
    // --- FIX ENDS HERE ---
  }
};