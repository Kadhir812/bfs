import apiClient from './client'

export async function login(username, password) {
  const response = await apiClient.post('/api/auth/login', {
    username,
    password,
  })

  return response.data
}

export async function register(user) {
  await apiClient.post('/api/auth/register', user)
  return login(user.username, user.password)
}

export function getApiError(error, fallbackMessage) {
  const responseData = error.response?.data

  if (typeof responseData === 'string' && responseData) {
    return responseData
  }

  return responseData?.message || error.message || fallbackMessage
}
