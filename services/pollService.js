const POLLS_KEY = 'colleagueConnectPolls';
const VOTED_POLLS_KEY = 'colleagueConnectVotedPolls';

const getSeedData = () => [
  {
    id: 'poll-1',
    question: 'Which new workshop would you be most interested in?',
    isActive: true,
    options: [
      { id: 'opt-1-1', text: 'Advanced Public Speaking', votes: 18 },
      { id: 'opt-1-2', text: 'Introduction to Python for Data Science', votes: 45 },
      { id: 'opt-1-3', text: 'Creative Writing & Storytelling', votes: 32 },
      { id: 'opt-1-4', text: 'Personal Finance & Investing', votes: 55 },
    ]
  },
  {
    id: 'poll-2',
    question: 'What should be the theme for the next annual cultural fest?',
    isActive: false,
    options: [
      { id: 'opt-2-1', text: 'Retro 90s Throwback', votes: 120 },
      { id: 'opt-2-2', text: 'Global Carnival', votes: 85 },
      { id: 'opt-2-3', text: 'Sci-Fi & Fantasy', votes: 150 },
      { id: 'opt-2-4', text: 'Masquerade Ball', votes: 110 },
    ]
  },
  {
    id: 'poll-3',
    question: 'Which new facility would you like to see on front office campus?',
    isActive: false,
    options: [
      { id: 'opt-3-1', text: 'Outdoor basketball court', votes: 210 },
      { id: 'opt-3-2', text: 'A dedicated music and arts room', votes: 180 },
      { id: 'opt-3-3', text: 'A quiet and peaceful garden', votes: 250 },
      { id: 'opt-3-4', text: 'An on-campus coffee shop', votes: 350 },
    ]
  }
];

const initializePolls = () => {
  try {
    const pollsJSON = localStorage.getItem(POLLS_KEY);
    if (pollsJSON) {
      return JSON.parse(pollsJSON);
    } else {
      const seedData = getSeedData();
      localStorage.setItem(POLLS_KEY, JSON.stringify(seedData));
      return seedData;
    }
  } catch (error) {
    console.error("Error initializing polls from localStorage", error);
    const seedData = getSeedData();
    localStorage.setItem(POLLS_KEY, JSON.stringify(seedData));
    return seedData;
  }
};

const getPolls = () => {
  return initializePolls();
};

const savePolls = (polls) => {
  try {
    localStorage.setItem(POLLS_KEY, JSON.stringify(polls));
  } catch (error) {
    console.error("Error saving polls to localStorage", error);
  }
};

const getVotedPolls = () => {
  try {
    const votedJSON = localStorage.getItem(VOTED_POLLS_KEY);
    return votedJSON ? JSON.parse(votedJSON) : [];
  } catch (error) {
    return [];
  }
};

const saveVotedPoll = (pollId) => {
  const voted = getVotedPolls();
  if (!voted.includes(pollId)) {
    voted.push(pollId);
    localStorage.setItem(VOTED_POLLS_KEY, JSON.stringify(voted));
  }
};

export const pollService = {
  getActivePoll: () => {
    return getPolls().find(poll => poll.isActive);
  },
  getPastPolls: () => {
    return getPolls()
      .filter(poll => !poll.isActive)
      .sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
  },
  recordVote: (pollId, optionId) => {
    const polls = getPolls();
    const pollIndex = polls.findIndex(p => p.id === pollId);
    if (pollIndex === -1) return undefined;

    const optionIndex = polls[pollIndex].options.findIndex(o => o.id === optionId);
    if (optionIndex === -1) return undefined;

    polls[pollIndex].options[optionIndex].votes += 1;
    savePolls(polls);
    saveVotedPoll(pollId);
    return polls[pollIndex];
  },
  hasVoted: (pollId) => {
    return getVotedPolls().includes(pollId);
  }
};
