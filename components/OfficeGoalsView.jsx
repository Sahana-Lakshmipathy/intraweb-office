import React, { useState, useMemo, useEffect } from 'react';
import { Award, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { STATIC_CLUBS } from '../constants';
import { goalService } from '../services/goalService';

const uniqueCategories = [...new Set(STATIC_CLUBS.map(club => club.category))];

const OfficeGoalsView = () => {
  const coeList = useMemo(() => STATIC_CLUBS.filter(c => c.category === 'Technology'), []);
  const [selectedCoe, setSelectedCoe] = useState(coeList[0]?.name || '');
  const [goals, setGoals] = useState([]);
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  // Load goals for the selected CoE
  useEffect(() => {
    if (selectedCoe) {
      setGoals(goalService.getGoalsByCoe(selectedCoe));
    }
  }, [selectedCoe]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalDescription.trim() || !selectedCoe) return;

    // When adding, default status is 'Not Started' and progress is 0
    goalService.addGoal({
      coeName: selectedCoe,
      description: newGoalDescription,
      month: currentMonth,
      status: 'Not Started', // Set initial status
      progress: 0,           // Set initial progress
    });
    setGoals(goalService.getGoalsByCoe(selectedCoe));
    setNewGoalDescription('');
  };

  // This function will now toggle the status between 'Completed' and 'Not Started'
  const handleToggleComplete = (goalId) => {
    const goalToUpdate = goals.find(g => g.id === goalId);
    if (!goalToUpdate) return;

    // Determine the new status and progress based on the current status
    let newStatus;
    let newProgress;

    if (goalToUpdate.status === 'Completed') {
      newStatus = 'Not Started';
      newProgress = 0;
    } else {
      newStatus = 'Completed';
      newProgress = 100;
    }

    // Update the goal using the service
    goalService.updateGoalStatus(goalId, newStatus, newProgress); // Assuming updateGoalStatus can take progress now
    setGoals(goalService.getGoalsByCoe(selectedCoe)); // Re-fetch goals to update UI
  };


  // Removed getStatusColor as we are using a checkbox,
  // but keeping it if you want to use it for other UI elements in the future.
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'In Progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'Near Completion': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  // Calculate summary statistics
  const totalGoals = goals.length;
  const completedGoalsCount = goals.filter(g => g.status === 'Completed').length;
  const avgProgress = totalGoals > 0
    ? Math.round(goals.reduce((sum, g) => sum + (g.status === 'Completed' ? 100 : 0), 0) / totalGoals)
    : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Office Goals</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage strategic goals by various clubs</p>
        </div>
        <div className="w-full sm:w-auto">
          <select
            value={selectedCoe}
            onChange={(e) => setSelectedCoe(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleAddGoal} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Add a new goal for this CoE..."
          value={newGoalDescription}
          onChange={(e) => setNewGoalDescription(e.target.value)}
          className="flex-grow px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Add Goal
        </button>
      </form>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
              <Target size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalGoals}</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Total Goals</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">For {selectedCoe}</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
              <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{completedGoalsCount}</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Completed</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
              <TrendingUp size={24} className="text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {avgProgress}%
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Avg Progress</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Across all goals</p>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-6">
        {goals.length > 0 ? goals.map((goal, index) => (
          <div key={goal.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 animate-pop-in" style={{ animationDelay: `${index * 75}ms` }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.description}</h3>
                  {/* Replaced select with a checkbox for toggle functionality */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={goal.status === 'Completed'}
                      onChange={() => handleToggleComplete(goal.id)}
                      className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500" // Tailwind form-checkbox styling
                    />
                    <span className={`text-sm font-medium ${goal.status === 'Completed' ? 'text-green-600' : 'text-gray-500'}`}>
                      {goal.status === 'Completed' ? 'Completed' : 'Not Started'}
                    </span>
                  </label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Month: {goal.month}</p>
              </div>
              <Award size={20} className="text-yellow-500" />
            </div>
            {/* Progress Bar - now directly reflects Completed (100%) or Not Started (0%) */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${goal.status === 'Completed' ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}
                style={{ width: `${goal.status === 'Completed' ? 100 : 0}%` }}
              ></div>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No goals set for this CoE yet. Add one above!</p>
        )}
      </div>
    </div>
  );
};

export default OfficeGoalsView;