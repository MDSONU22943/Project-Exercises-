import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, saveTransactionToDatabase, clearError } from '../store/transactionsSlice';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'credit'
  });
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.transactions);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || parseFloat(formData.amount) <= 0) {
      return;
    }

    const transaction = {
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type
    };

    // Add transaction to Redux store immediately
    dispatch(addTransaction(transaction));
    
    // Clear error if any
    dispatch(clearError());
    
    // Save to database (async)
    try {
      await dispatch(saveTransactionToDatabase(transaction)).unwrap();
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }

    // Reset form
    setFormData({
      description: '',
      amount: '',
      type: 'credit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Transaction</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter transaction description"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            step="0.01"
            min="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="credit"
                checked={formData.type === 'credit'}
                onChange={handleChange}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-green-600 font-medium">Credit (+)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="debit"
                checked={formData.type === 'debit'}
                onChange={handleChange}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-red-600 font-medium">Debit (-)</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Processing...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
