import apiClient from './client'

export const createTicket = async (ticket) => {
  const response = await apiClient.post('/tickets', ticket)
  return response.data
}

export const updateTicket = async (ticketId, ticket) => {
  const response = await apiClient.put(`/tickets/${ticketId}`, ticket)
  return response.data
}

export const getMyTickets = async () => {
  const response = await apiClient.get('/tickets')
  return response.data
}

export const getAllTickets = async () => {
  const response = await apiClient.get('/support/tickets')
  return response.data
}

export const updateTicketStatus = async (ticketId, status) => {
  const response = await apiClient.put(`/support/tickets/${ticketId}/status`, null, {
    params: { status },
  })
  return response.data
}
