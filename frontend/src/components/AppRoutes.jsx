import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import CustomerPage from '../pages/CustomerPage'
import BankSupportPage from '../pages/BankSupportPage'

const getSession = () => {
  const saved = localStorage.getItem('bankticket-session')
  return saved ? JSON.parse(saved) : null
}

const ProtectedRoute = ({ role, children }) => {
  const session = getSession()
  if (!session) return <Navigate to="/login" replace />
  if (role && session.role !== role) {
    return <Navigate to={session.role === 'BANK_SUPPORT' ? '/support' : '/customer'} replace />
  }
  return children
}

const AppRoutes = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/customer" element={<ProtectedRoute role="CUSTOMER"><CustomerPage /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute role="BANK_SUPPORT"><BankSupportPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={getSession() ? (getSession().role === 'BANK_SUPPORT' ? '/support' : '/customer') : '/login'} replace />} />
    </Routes>
  </BrowserRouter>
}

export default AppRoutes
