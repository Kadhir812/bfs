import { useNavigate } from 'react-router-dom'

const Header = ({ session }) => {
  const navigate = useNavigate()

  const signOut = () => {
    localStorage.removeItem('bankticket-session')
    navigate('/login', { replace: true })
  }

  return (
    <header className="topbar">
      <span className="topbar-title">BANK TICKET SYSTEM</span>
      <div className="profile">
        <span className="avatar">{session.username?.charAt(0).toUpperCase()}</span>
        <span>{session.username}</span>
        <button onClick={signOut}>Sign out</button>
      </div>
    </header>
  )
}

export default Header
