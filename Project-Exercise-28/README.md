# Project Exercise 28: Dynamic Login Form with Validation

A React login form built with Vite, featuring two-way data binding, client-side validation, and mock API submission.

## Skills Covered

- **Two-way binding** – Form inputs controlled via `useState`
- **Client-side validation** – Email format and non-empty password
- **Form submission** – Uses axios to send data to [reqres.in](https://reqres.in) mock API
- **Feedback states** – Loading, success, and error feedback

## Run the Project

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Demo Credentials

Use these to test successful login:

- **Email:** `eve.holt@reqres.in`
- **Password:** `cityslicka`

Any other credentials will return an error from the mock API.

## Project Structure

```
src/
├── main.jsx           # Entry point
├── App.jsx            # Root component
├── components/
│   └── LoginForm.jsx  # Login form with validation and API submission
└── style.css          # Styles
```
