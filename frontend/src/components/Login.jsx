import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getApiError, login } from '../api/authApi'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const data = await login(username, password)

      localStorage.setItem('bankticket-session', JSON.stringify(data))
      navigate(data.role === 'BANK_SUPPORT' ? '/support' : '/customer')
    } catch (requestError) {
      setError(getApiError(requestError, 'Login failed. Check your details.'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-layout">
      <section className="brand-panel">
        <div className="brand-message">
          <p className="eyebrow">BANK TICKET SYSTEM</p>
          <h1>
            Every request,
            <br />
            <em>handled.</em>
          </h1>
          
        </div>
       
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="form-heading">
            <p className="eyebrow accent">WELCOME BACK</p>
          </div>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Username"
              type="text"
              value={username}
              placeholder="you@example.com"
              onChange={setUsername}
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={setPassword}
            />

            {error && <p className="status error">{error}</p>}

            <button className="primary-button" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
              <span>→</span>
            </button>
          </form>

          <p className="switch-copy">
            New to the workspace?{' '}
            <Link className="text-button" to="/register">
              Create an account
            </Link>
          </p>
        </div>

       
      </section>
    </main>
  )
}

const InputField = ({ label, type, value, placeholder, onChange }) => {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        required
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default Login
