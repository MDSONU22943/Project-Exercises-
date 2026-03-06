# Project Exercise 25: Contact Card App with React Hooks

A comprehensive React application demonstrating all major React Hooks for managing a contact list with form validation, global state management, and performance optimization.

## 🎯 Project Overview

This project showcases modern React development practices by building a contact management application that allows users to:

- Add new contacts with name, phone number, and email
- View all contacts in an organized card layout
- Delete contacts from the list
- Validate form input with custom validation logic
- Manage global state using React Context API
- Optimize performance with useMemo and useCallback

## 📚 Topics Covered

### React Hooks Demonstrated

1. **`useState`** - Managing form input values and component state
2. **`useEffect`** - Running side effects (form setup, auto-focus)
3. **`useContext`** - Global state management for contacts
4. **`useMemo`** - Optimizing expensive computations (sorting, stats calculation)
5. **`useCallback`** - Memoizing callback functions for performance optimization
6. **`useRef`** - Direct DOM access (focusing on input field on mount)
7. **Custom Hooks** - `useFormValidation` for reusable form validation logic
8. **`memo`** - Component memoization to prevent unnecessary re-renders

## 🏗️ Project Structure

```
src/
├── App.jsx                      # Main application component
├── App.css                      # App styling
├── index.css                    # Global styles
├── main.jsx                     # React entry point
├── contexts/
│   └── ContactContext.jsx       # Global contact state with Context API
├── hooks/
│   └── useFormValidation.jsx    # Custom hook for form validation
└── components/
    ├── ContactForm.jsx          # Form component with validation
    ├── ContactForm.css
    ├── ContactCard.jsx          # Individual contact card component
    ├── ContactCard.css
    ├── ContactList.jsx          # Contact list display component
    └── ContactList.css
```

## 🚀 Getting Started

### Installation

1. Navigate to the project directory:
   ```bash
   cd Project-Exercise-25
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## 💡 Key Features

### Contact Context (`src/contexts/ContactContext.jsx`)

Manages global state for all contacts using React Context API:

- `addContact(contact)` - Add a new contact
- `deleteContact(id)` - Remove a contact by ID
- `updateContact(id, updatedContact)` - Update an existing contact

All methods use `useCallback` for optimal performance.

### Form Validation Hook (`src/hooks/useFormValidation.jsx`)

Custom hook that encapsulates form logic:

- **State Management**: Manages form values, errors, and touched fields
- **Validation**: Email regex, phone number format, required fields
- **Handlers**: Change, blur, and submit handlers
- **Features**:
  - Real-time validation on blur
  - Error messages with touched field tracking
  - Form reset after submission
  - Returns all necessary methods and state

### ContactForm Component

Features:

- Form inputs with validation
- Auto-focus on name input field using `useRef`
- Real-time error messages
- Form resets after successful submission
- Accessible form labels and placeholders

### ContactCard Component

Features:

- Memoized component to prevent unnecessary re-renders
- Avatar with first letter of contact
- Clickable phone and email links
- Delete button with confirmation
- Responsive design

### ContactList Component

Features:

- `useMemo` for sorted contacts (alphabetical order)
- `useMemo` for calculating statistics
- Statistics display (total, phones, emails)
- Empty state when no contacts exist
- Responsive grid layout

## 🎨 Styling Features

- Modern gradient background
- Responsive design for mobile and desktop
- Smooth transitions and hover effects
- Error state styling
- Custom scrollbar styling
- Grid layout with auto-fill

## 📝 Form Validation Rules

### Name
- Required field
- Minimum 2 characters

### Phone Number
- Required field
- Must contain only digits, spaces, hyphens, plus, parentheses
- Minimum 10 digits when non-numeric characters are removed

### Email
- Required field
- Must match email format (simple regex validation)

## 🔄 Data Flow

1. User fills out the form in `ContactForm`
2. `useFormValidation` hook handles validation and state
3. On submit, `addContact` is called from `ContactContext`
4. New contact is added to global state
5. `ContactList` re-renders with updated contacts
6. Contacts are sorted alphabetically using `useMemo`
7. Each contact is rendered as a memoized `ContactCard`

## ⚡ Performance Optimizations

- **`useCallback`**: All context functions are memoized
- **`useMemo`**: Sorted contacts list and statistics are only recalculated when dependencies change
- **`memo`**: `ContactCard` component is memoized to prevent unnecessary re-renders
- **Dependency Arrays**: Proper dependency arrays ensure efficient hook execution

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🛠️ Technologies Used

- **React 18.3.1** - UI library
- **Vite** - Build tool
- **CSS 3** - Styling (Grid, Flexbox)
- **ESLint** - Code quality

## 📖 Learning Outcomes

After completing this project, you'll understand:

- ✅ How to use all major React Hooks effectively
- ✅ How to create custom hooks for reusable logic
- ✅ How to implement Context API for global state management
- ✅ How to validate forms with real-time feedback
- ✅ How to optimize React performance
- ✅ How to structure a medium-sized React application
- ✅ How to create responsive, accessible components
- ✅ Best practices for form handling and validation

## 🎓 Next Steps

To expand this project:

1. **Add persistence**: Use localStorage to save contacts
2. **Edit functionality**: Allow users to edit existing contacts
3. **Search/Filter**: Add search functionality to filter contacts
4. **Categories**: Organize contacts by categories (friends, family, work)
5. **Import/Export**: Add CSV import/export functionality
6. **Testing**: Write unit tests using Jest and React Testing Library
7. **Backend Integration**: Connect to an API for data persistence
8. **Authentication**: Add user authentication and personal contact lists

## 📄 License

This project is part of the Project Exercises series.
