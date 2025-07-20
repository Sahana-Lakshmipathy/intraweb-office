const GOALS_KEY = 'colleagueConnectGoals';

const getGoals = () => {
  try {
    const goalsJSON = localStorage.getItem(GOALS_KEY);
    const goals = goalsJSON ? JSON.parse(goalsJSON) : [];
    console.log("goalService - getGoals: Retrieved from localStorage:", goals);
    return goals;
  } catch (error) {
    console.error("goalService - Error reading goals from localStorage", error);
    return [];
  }
};


const saveGoals = (goals) => {
  try {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
    console.log("goalService - saveGoals: Saved to localStorage:", goals);
  } catch (error) {
    console.error("goalService - Error saving goals to localStorage", error);
  }
};

export const goalService = {
 
  getGoalsByCoe: (coeName) => {
    const allGoals = getGoals();
    const filtered = allGoals.filter(goal => goal.coeName === coeName);
    console.log(`goalService - getGoalsByCoe(${coeName}):`, filtered);
    return filtered;
  },

  
  addGoal: (data) => {
    const goals = getGoals(); 
    const newGoal = {
      id: `goal-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      status: 'Not Started',
      progress: 0, 
      timestamp: new Date().toISOString(), 
      ...data,
    };
    const updatedGoals = [...goals, newGoal]; 
    saveGoals(updatedGoals);
    console.log("goalService - addGoal: New goal added and saved:", newGoal);
    return newGoal;
  },

 
  updateGoalStatus: (goalId, newStatus) => { 
    const goals = getGoals(); 
    const goalIndex = goals.findIndex(g => g.id === goalId);

    if (goalIndex === -1) {
      console.warn(`goalService - updateGoalStatus: Goal with ID ${goalId} not found.`);
      return undefined;
    }

    
    const updatedGoal = {
      ...goals[goalIndex], 
      status: newStatus,   
      progress: newStatus === 'Completed' ? 100 : (goals[goalIndex].progress || 0), 
      lastUpdated: new Date().toISOString(), 
    };

   
    const updatedGoals = [
      ...goals.slice(0, goalIndex),   
      updatedGoal,                      
      ...goals.slice(goalIndex + 1),     
    ];

    saveGoals(updatedGoals); 
    console.log("goalService - updateGoalStatus: Goal updated and saved:", updatedGoal);
    return updatedGoal;
  },

  deleteGoal: (goalId) => {
    const goals = getGoals(); 
    const initialLength = goals.length;
    const updatedGoals = goals.filter(g => g.id !== goalId);

    if (updatedGoals.length < initialLength) {
      saveGoals(updatedGoals);
      console.log(`goalService - deleteGoal: Goal ${goalId} deleted.`);
      return true;
    }
    console.warn(`goalService - deleteGoal: Goal ${goalId} not found for deletion.`);
    return false;
  }
};