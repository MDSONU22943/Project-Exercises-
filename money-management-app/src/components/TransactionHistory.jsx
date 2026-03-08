import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTransaction } from '../store/transactionsSlice';

const TransactionHistory = () => {
  const transactions = useSelector(state => state.transactions.transactions);
  const dispatch = useDispatch();

  const handleRemoveTransaction = (id) => {
    dispatch(removeTransaction(id));
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Transaction History</h2>
        <p className="text-gray-500 text-center py-8">No transactions yet. Add your first transaction!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Transaction History</h2>
      
      <div className="space-y-3">
        {transactions.map(transaction => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
                <span className="text-gray-800 font-medium">{transaction.description}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {formatDate(transaction.timestamp)}
              </div>
            </div>
            
            <button
              onClick={() => handleRemoveTransaction(transaction.id)}
              className="ml-4 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="text-sm text-gray-500">
          Total Transactions: {transactions.length}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
