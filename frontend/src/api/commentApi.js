import apiClient from './client'

export const getComments = async (ticketId) => {
  const response = await apiClient.get(`/tickets/${ticketId}/comments`)
  return response.data
}

export const addComment = async (ticketId, message) => {
  const response = await apiClient.post(`/tickets/${ticketId}/comments`, { message })
  return response.data
}
