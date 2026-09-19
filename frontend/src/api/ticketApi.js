import apiClient from './client'

export async function createTicket(ticket) {
  const response = await apiClient.post('/tickets', ticket)
  return response.data
}

export async function updateTicket(ticketId, ticket) {
  const response = await apiClient.put(`/tickets/${ticketId}`, ticket)
  return response.data
}

export async function getMyTickets() {
  const response = await apiClient.get('/tickets')
  return response.data
}

export async function getAllTickets() {
  const response = await apiClient.get('/support/tickets')
  return response.data
}

export async function updateTicketStatus(ticketId, status) {
  const response = await apiClient.put(`/support/tickets/${ticketId}/status`, null, {
    params: { status },
  })
  return response.data
}
