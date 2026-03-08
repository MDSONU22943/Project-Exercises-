import React from 'react';
import { useSelector } from 'react-redux';

const BalanceDisplay = () => {
  const balance = useSelector(state => state.transactions.balance);

  const balanceClass = balance >= 0 ? 'text-green-600' : 'text-red-600';
  const balancePrefix = balance >= 0 ? '+' : '';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Current Balance</h2>
      <div className={`text-4xl font-bold ${balanceClass}`}>
        {balancePrefix}${balance.toFixed(2)}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        {balance >= 0 ? 'Positive Balance' : 'Negative Balance'}
      </div>
    </div>
  );
};

export default BalanceDisplay;
