import React, { useState, useEffect, useMemo } from 'react';
import { pollService } from '../services/pollService';
import Card from './Card';
import Spinner from './Spinner';

const PastPollCard = ({ poll }) => {
  const totalVotes = useMemo(() => poll.options.reduce((sum, option) => sum + option.votes, 0), [poll.options]);

  const sortedOptions = useMemo(() => {
    return [...poll.options].sort((a, b) => b.votes - a.votes);
  }, [poll.options]);

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{poll.question}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Total Votes: {totalVotes}</p>
        <div className="space-y-3">
          {sortedOptions.map((option, index) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            return (
              <div key={option.id}>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className={`font-medium ${index === 0 ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>{option.text}</span>
                  <span className={`font-semibold ${index === 0 ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'}`}>{option.votes} votes</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`${index === 0 ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-400 dark:bg-gray-500'} h-2.5 rounded-full`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  )
};


const PollHistoryView = () => {
  const [pastPolls, setPastPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPastPolls(pollService.getPastPolls());
    setIsLoading(false);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Poll History</h2>
      {pastPolls.length > 0 ? (
        <div className="space-y-6">
          {pastPolls.map((poll, index) => (
            <div key={poll.id} className="animate-pop-in" style={{ animationDelay: `${index * 75}ms` }}>
              <PastPollCard poll={poll} />
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <p className="p-8 text-center text-gray-500">No past polls are available yet.</p>
        </Card>
      )}
    </div>
  );
};

export default PollHistoryView;