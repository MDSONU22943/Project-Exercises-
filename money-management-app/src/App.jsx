import React from 'react';
import TransactionForm from './components/TransactionForm';
import BalanceDisplay from './components/BalanceDisplay';
import TransactionHistory from './components/TransactionHistory';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Money Management App
          </h1>
          <p className="text-gray-600">
            Track your income and expenses with Redux-powered state management
          </p>
        </header>

        <main className="space-y-6">
          <BalanceDisplay />
          <TransactionForm />
          <TransactionHistory />
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with React, Redux Toolkit, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
