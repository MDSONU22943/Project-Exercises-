# Project Exercise 26: Multi-Page Authentication App with React Router

## Overview

This project is a comprehensive multi-page authentication application built with React and React Router. It demonstrates modern web development concepts including user authentication, form validation, programmatic navigation, and local storage integration.

## Features

### 🔐 Authentication System
- User registration with form validation
- Secure login with email/password authentication
- Session management using localStorage
- Conditional rendering based on authentication status

### 🚀 React Router Integration
- Dynamic routing between pages
- Programmatic navigation with `useNavigate`
- Navigation links using `<Link>` component
- Protected routes and conditional access

### ✨ Form Validation
- Real-time form validation
- Email format validation
- Password strength requirements
- Password confirmation matching
- Error handling and user feedback

### 📱 Responsive Design
- Modern, clean UI design
- Mobile-responsive layout
- Smooth transitions and animations
- Professional gradient backgrounds

## Project Structure

```
Project-Exercise-26/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   └── Navbar.css
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── Login.js
│   │   ├── Login.css
│   │   ├── Register.js
│   │   └── Register.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Technologies Used

- **React 18.2.0** - Core JavaScript library for building user interfaces
- **React Router DOM 6.8.0** - Client-side routing library
- **React Scripts 5.0.1** - Build and development scripts
- **CSS3** - Styling and animations
- **LocalStorage API** - Client-side data persistence

## Key Concepts Demonstrated

### 1. React Router Setup
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
</Router>
```

### 2. useNavigate for Programmatic Navigation
```javascript
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/'); // Redirect to home page
```

### 3. Form Validation
```javascript
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### 4. LocalStorage Integration
```javascript
// Store user data
localStorage.setItem('user', JSON.stringify(userData));

// Retrieve user data
const user = JSON.parse(localStorage.getItem('user'));
```

### 5. Context API for State Management
```javascript
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
```

## Pages

### Home Page (`/`)
- Landing page with different content for authenticated and unauthenticated users
- Feature showcase and project information
- Call-to-action buttons for registration and login

### Login Page (`/login`)
- Login form with email and password fields
- Form validation with error messages
- Authentication against stored user data
- Redirect to home page on successful login

### Register Page (`/register`)
- Registration form with name, email, password, and password confirmation
- Comprehensive form validation
- Duplicate email checking
- Automatic login after successful registration

## Installation and Setup

1. **Navigate to the project directory:**
   ```bash
   cd Project-Exercise-26
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage Instructions

### Registering a New User
1. Click "Get Started" or navigate to `/register`
2. Fill in your name, email, password, and confirm password
3. Click "Register" to create your account
4. You'll be automatically logged in and redirected to the home page

### Logging In
1. Click "Login" or navigate to `/login`
2. Enter your registered email and password
3. Click "Login" to access your account
4. You'll be redirected to the home page with personalized content

### Logging Out
1. Click the "Logout" button in the navigation bar
2. Your session will be cleared and you'll be redirected to the home page

## Skills Covered

This project demonstrates the following React and web development skills:

- ✅ React Router setup and configuration
- ✅ `<Link>` for declarative navigation
- ✅ `useNavigate` for programmatic navigation
- ✅ Form validation and error handling
- ✅ LocalStorage for data persistence
- ✅ Context API for state management
- ✅ Conditional rendering based on authentication
- ✅ Responsive CSS design
- ✅ Component-based architecture
- ✅ Modern ES6+ JavaScript features

## Browser Compatibility

This application is compatible with all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential improvements for this project:
- Password hashing for better security
- User profile editing
- Password reset functionality
- Social media authentication
- Protected routes with role-based access
- API integration for backend authentication
- Unit tests and integration tests

## License

This project is part of a learning exercise and is for educational purposes only.
