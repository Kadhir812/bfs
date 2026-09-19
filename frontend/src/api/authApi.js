import apiClient from './client'

export const login = async (username, password) => {
  const response = await apiClient.post('/api/auth/login', {
    username,
    password,
  })

  return response.data
}

export const register = async (user) => {
  await apiClient.post('/api/auth/register', user)
  return login(user.username, user.password)
}

export const getApiError = (error, fallbackMessage) => {
  const responseData = error.response?.data

  if (typeof responseData === 'string' && responseData) {
    return responseData
  }

  return responseData?.message || error.message || fallbackMessage
}
