import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getApiError, register } from '../api/authApi'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    customerPhoneNum: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const auth = await register(form)
      localStorage.setItem('bankticket-session', JSON.stringify(auth))
      navigate(auth.role === 'BANK_SUPPORT' ? '/support' : '/customer')
    } catch (requestError) {
      setError(getApiError(requestError, 'Registration failed.'))
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

          <form onSubmit={handleSubmit}>
            <div className="field-grid">
              <InputField label="Full name" type="text" value={form.name} placeholder="Your name" onChange={(value) => updateField('name', value)} />
              <InputField label="Phone number" type="tel" value={form.customerPhoneNum} placeholder="+91 00000 00000" onChange={(value) => updateField('customerPhoneNum', value)} />
            </div>
            <InputField label="Email" type="email" value={form.email} placeholder="you@example.com" onChange={(value) => updateField('email', value)} />
            <InputField label="Username" type="text" value={form.username} placeholder="Choose a username" onChange={(value) => updateField('username', value)} />
            <InputField label="Password" type="password" value={form.password} placeholder="At least 8 characters" onChange={(value) => updateField('password', value)} />

            {error && <p className="status error">{error}</p>}

            <button className="primary-button" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create account'}
              <span>→</span>
            </button>
          </form>

          <p className="switch-copy">
            Already have an account?{' '}
            <Link className="text-button" to="/login">
              Sign in
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

export default Register
