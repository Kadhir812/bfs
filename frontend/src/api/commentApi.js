import apiClient from './client'

export async function getComments(ticketId) {
  const response = await apiClient.get(`/tickets/${ticketId}/comments`)
  return response.data
}

export async function addComment(ticketId, message) {
  const response = await apiClient.post(`/tickets/${ticketId}/comments`, { message })
  return response.data
}
