import React, { useState, useEffect, useMemo } from 'react';
import { pollService } from '../services/pollService';
import Card from './Card';
import Spinner from './Spinner';

const PollResults = ({ poll }) => {
  const totalVotes = useMemo(() => poll.options.reduce((sum, option) => sum + option.votes, 0), [poll.options]);

  return (
    <div className="space-y-3 p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{poll.question}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">Thank you for voting! Here are the results:</p>
      <div className="space-y-4 pt-2">
        {poll.options.map(option => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          return (
            <div key={option.id}>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">{option.text}</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{option.votes} votes ({percentage.toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WeeklyPoll = () => {
  const [poll, setPoll] = useState(undefined);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const activePoll = pollService.getActivePoll();
    if (activePoll) {
      setPoll(activePoll);
      setHasVoted(pollService.hasVoted(activePoll.id));
    }
    setIsLoading(false);
  }, []);

  const handleVote = (optionId) => {
    if (!poll || hasVoted) return;
    const updatedPoll = pollService.recordVote(poll.id, optionId);
    if (updatedPoll) {
      setPoll(updatedPoll);
      setHasVoted(true);
    }
  };

  if (isLoading) return <Card><Spinner /></Card>;
  if (!poll) return <Card><p className="p-6 text-center text-gray-500">No active poll at the moment.</p></Card>;

  if (hasVoted) {
    return <Card className="animate-pop-in"><PollResults poll={poll} /></Card>;
  }

  return (
    <Card className="animate-pop-in">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{poll.question}</h3>
        <div className="space-y-3">
          {poll.options.map(option => (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              className="w-full text-left px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:border-indigo-400 transition-all duration-200"
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WeeklyPoll;