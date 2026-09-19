import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8090',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const savedSession = localStorage.getItem('bankticket-session')

  if (savedSession) {
    const session = JSON.parse(savedSession)

    if (session.token) {
      config.headers.Authorization = `Bearer ${session.token}`
    }
  }

  return config
})

export default apiClient
