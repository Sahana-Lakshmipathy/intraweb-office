const GOALS_KEY = 'colleagueConnectGoals';

/**
 * Retrieves all goals from localStorage.
 * @returns {Array<Object>} An array of goal objects.
 */
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

/**
 * Saves the given array of goals to localStorage.
 * @param {Array<Object>} goals - The array of goal objects to save.
 */
const saveGoals = (goals) => {
  try {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
    console.log("goalService - saveGoals: Saved to localStorage:", goals);
  } catch (error) {
    console.error("goalService - Error saving goals to localStorage", error);
  }
};

export const goalService = {
  /**
   * Retrieves goals filtered by Center of Excellence (CoE) name.
   * @param {string} coeName - The name of the CoE to filter goals by.
   * @returns {Array<Object>} An array of goal objects for the specified CoE.
   */
  getGoalsByCoe: (coeName) => {
    const allGoals = getGoals();
    const filtered = allGoals.filter(goal => goal.coeName === coeName);
    console.log(`goalService - getGoalsByCoe(${coeName}):`, filtered);
    return filtered;
  },

  /**
   * Adds a new goal.
   * Ensures the goals array is updated immutably.
   * @param {Object} data - The goal data (e.g., description, coeName, month).
   * @returns {Object} The newly created goal object.
   */
  addGoal: (data) => {
    const goals = getGoals(); // Get current state
    const newGoal = {
      id: `goal-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // More robust ID
      status: 'Not Started',
      progress: 0, // Initialize progress for new goals
      timestamp: new Date().toISOString(), // Add timestamp for order/tracking
      ...data,
    };
    const updatedGoals = [...goals, newGoal]; // Create a NEW array
    saveGoals(updatedGoals);
    console.log("goalService - addGoal: New goal added and saved:", newGoal);
    return newGoal;
  },

  /**
   * Updates the status of an existing goal.
   * Ensures goals array and goal object are updated immutably.
   * Automatically sets progress to 100 if status is 'Completed'.
   * @param {string} goalId - The ID of the goal to update.
   * @param {string} status - The new status for the goal.
   * @returns {Object | undefined} The updated goal object, or undefined if not found.
   */
  updateGoalStatus: (goalId, newStatus) => { // Renamed 'status' to 'newStatus' for clarity
    const goals = getGoals(); // Get current state
    const goalIndex = goals.findIndex(g => g.id === goalId);

    if (goalIndex === -1) {
      console.warn(`goalService - updateGoalStatus: Goal with ID ${goalId} not found.`);
      return undefined;
    }

    // Create a NEW goal object with the updated status and progress
    const updatedGoal = {
      ...goals[goalIndex], // Copy all existing properties
      status: newStatus,   // Set the new status
      progress: newStatus === 'Completed' ? 100 : (goals[goalIndex].progress || 0), // Update progress
      lastUpdated: new Date().toISOString(), // Add a last updated timestamp
    };

    // Create a NEW array with the updated goal replacing the old one
    const updatedGoals = [
      ...goals.slice(0, goalIndex),      // Elements before the updated goal
      updatedGoal,                       // The new updated goal object
      ...goals.slice(goalIndex + 1),     // Elements after the updated goal
    ];

    saveGoals(updatedGoals); // Save the NEW array
    console.log("goalService - updateGoalStatus: Goal updated and saved:", updatedGoal);
    return updatedGoal;
  },

  /**
   * Deletes a goal by its ID.
   * Ensures the goals array is updated immutably.
   * @param {string} goalId - The ID of the goal to delete.
   * @returns {boolean} True if the goal was deleted, false otherwise.
   */
  deleteGoal: (goalId) => {
    const goals = getGoals(); // Get current state
    const initialLength = goals.length;
    const updatedGoals = goals.filter(g => g.id !== goalId); // Create a NEW array without the deleted goal

    if (updatedGoals.length < initialLength) {
      saveGoals(updatedGoals);
      console.log(`goalService - deleteGoal: Goal ${goalId} deleted.`);
      return true;
    }
    console.warn(`goalService - deleteGoal: Goal ${goalId} not found for deletion.`);
    return false;
  }
};