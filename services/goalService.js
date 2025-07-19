const GOALS_KEY = 'colleagueConnectGoals';

const getGoals = () => {
  try {
    const goalsJSON = localStorage.getItem(GOALS_KEY);
    return goalsJSON ? JSON.parse(goalsJSON) : [];
  } catch (error) {
    console.error("Error reading goals from localStorage", error);
    return [];
  }
};

const saveGoals = (goals) => {
  try {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error("Error saving goals to localStorage", error);
  }
};

export const goalService = {
  getGoalsByCoe: (coeName) => {
    return getGoals().filter(goal => goal.coeName === coeName);
  },

  addGoal: (data) => {
    const goals = getGoals();
    const newGoal = {
      id: `goal-${Date.now()}`,
      status: 'Not Started',
      ...data
    };
    saveGoals([...goals, newGoal]);
    return newGoal;
  },

  updateGoalStatus: (goalId, status) => {
    const goals = getGoals();
    const goalIndex = goals.findIndex(g => g.id === goalId);
    if (goalIndex === -1) return undefined;

    goals[goalIndex].status = status;
    saveGoals(goals);
    return goals[goalIndex];
  },

  deleteGoal: (goalId) => {
    const goals = getGoals();
    const updatedGoals = goals.filter(g => g.id !== goalId);
    saveGoals(updatedGoals);
  }
};
