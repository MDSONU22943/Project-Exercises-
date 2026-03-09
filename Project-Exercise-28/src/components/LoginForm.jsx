import { useState } from 'react'
import axios from 'axios'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const validateEmail = (value) => {
    if (!value.trim()) {
      setEmailError('Email is required')
      return false
    }
    if (!EMAIL_REGEX.test(value)) {
      setEmailError('Please enter a valid email address')
      return false
    }
    setEmailError('')
    return true
  }

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Password is required')
      return false
    }
    setPasswordError('')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    if (!isEmailValid || !isPasswordValid) return

    setStatus('loading')
    setMessage('')

    try {
      // Using reqres.in mock API - use "eve.holt@reqres.in" / "cityslicka" for success
      const { data } = await axios.post(
        'https://reqres.in/api/login',
        { email, password }
      )

      setStatus('success')
      setMessage(`Login successful! Token: ${data.token.slice(0, 20)}...`)
      setEmail('')
      setPassword('')
    } catch (err) {
      setStatus('error')
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setMessage(err.response.data.error)
      } else {
        setMessage('An unexpected error occurred. Please try again.')
      }
    }
  }

  const handleEmailBlur = () => {
    if (email) validateEmail(email)
  }

  const handlePasswordBlur = () => {
    if (password) validatePassword(password)
  }

  return (
    <div className="login-card">
      <h1>Sign In</h1>
      <p className="subtitle">Enter your credentials to access your account</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) setEmailError('')
            }}
            onBlur={handleEmailBlur}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={status === 'loading'}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {emailError && (
            <span id="email-error" className="error" role="alert">
              {emailError}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (passwordError) setPasswordError('')
            }}
            onBlur={handlePasswordBlur}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={status === 'loading'}
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? 'password-error' : undefined}
          />
          {passwordError && (
            <span id="password-error" className="error" role="alert">
              {passwordError}
            </span>
          )}
        </div>

        {status === 'loading' && (
          <div className="feedback loading" role="status">
            <span className="spinner" aria-hidden />
            Signing in...
          </div>
        )}
        {status === 'success' && (
          <div className="feedback success" role="alert">
            {message}
          </div>
        )}
        {status === 'error' && (
          <div className="feedback error-feedback" role="alert">
            {message}
          </div>
        )}

        <button type="submit" disabled={status === 'loading'} className="submit-btn">
          Sign In
        </button>
      </form>

      <p className="hint">
        Demo: use <code>eve.holt@reqres.in</code> / <code>cityslicka</code> for success
      </p>
    </div>
  )
}
