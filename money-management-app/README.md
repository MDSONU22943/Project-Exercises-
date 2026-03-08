# Money Management App with Redux

A comprehensive money management application built with React, Redux Toolkit, and Tailwind CSS. This app demonstrates advanced state management using Redux for tracking income and expenses.

## Features

- **Transaction Management**: Add credit (income) and debit (expense) transactions
- **Real-time Balance**: View current balance with color-coded indicators
- **Transaction History**: Complete history with timestamps and details
- **Delete Transactions**: Remove transactions with automatic balance updates
- **Async Operations**: Simulated database operations using Redux Thunk
- **Modern UI**: Clean, responsive design with Tailwind CSS

## Technology Stack

- **Frontend**: React 18 with Vite
- **State Management**: Redux Toolkit with Redux Thunk
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Redux Implementation

### Store Configuration
- Centralized Redux store with `configureStore`
- Transaction slice with reducers and async actions
- Middleware configuration for async operations

### State Management
- **Balance**: Real-time calculation based on transactions
- **Transactions**: Array of transaction objects with metadata
- **Loading States**: Async operation feedback
- **Error Handling**: Comprehensive error management

### Async Actions
- `saveTransactionToDatabase`: Simulated API calls with Redux Thunk
- Loading states and error handling
- Optimistic updates for better UX

## Components

### TransactionForm
- Form for adding new transactions
- Credit/Debit selection
- Input validation
- Loading state feedback

### BalanceDisplay
- Real-time balance display
- Color-coded balance indicators
- Responsive design

### TransactionHistory
- Complete transaction list
- Timestamp formatting
- Delete functionality
- Transaction count display

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd money-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── TransactionForm.jsx
│   ├── BalanceDisplay.jsx
│   └── TransactionHistory.jsx
├── store/
│   ├── store.js
│   └── transactionsSlice.js
├── App.jsx
├── main.jsx
└── index.css
```

## Redux Concepts Demonstrated

1. **Redux Toolkit**: Modern Redux with simplified syntax
2. **createSlice**: Reducers and actions in one place
3. **createAsyncThunk**: Async operations with Redux Thunk
4. **useSelector**: Reading data from Redux store
5. **useDispatch**: Dispatching actions to store
6. **Provider**: Connecting Redux to React components

## Future Enhancements

- Real database integration (Firebase, Supabase, etc.)
- Transaction categories and budgets
- Data visualization with charts
- Export functionality (CSV, PDF)
- User authentication
- Transaction search and filtering

## Learning Outcomes

This project covers:
- Redux state management patterns
- Async operations with Redux Thunk
- React-Redux integration
- Modern React hooks
- Tailwind CSS styling
- Component-based architecture
- Form handling and validation
- Error handling and loading states
