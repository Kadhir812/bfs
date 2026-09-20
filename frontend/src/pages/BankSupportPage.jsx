import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SupportTicketList from '../components/bank_support/SupportTicketList'
import SupportTicketDetails from '../components/bank_support/SupportTicketDetails'
import { addComment, getComments } from '../api/commentApi'
import { getApiError } from '../api/authApi'
import { getAllTickets, updateTicketStatus } from '../api/ticketApi'

const BankSupportPage = () => {
  const session = JSON.parse(localStorage.getItem('bankticket-session'))
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  const [message, setMessage] = useState('')

  const showError = (error, fallbackMessage) => {
    setMessage(getApiError(error, fallbackMessage))
  }

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const ticketList = await getAllTickets()
        setTickets(ticketList)

        if (ticketList.length > 0) {
          const firstTicket = ticketList[0]
          setSelectedTicket(firstTicket)
          setComments(await getComments(firstTicket.ticketId))
        }
      } catch (error) {
        showError(error, 'Could not load tickets.')
      }
    }

    loadTickets()
  }, [])

  const selectTicket = async (ticket) => {
    setSelectedTicket(ticket)
    try {
      setComments(await getComments(ticket.ticketId))
    } catch (error) {
      showError(error, 'Could not load comments.')
    }
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()

    if (!comment.trim() || !selectedTicket) {
      return
    }

    try {
      const savedComment = await addComment(selectedTicket.ticketId, comment)
      setComments([...comments, savedComment])
      setComment('')
    } catch (error) {
      showError(error, 'Could not add the comment.')
    }
  }

  const handleStatusChange = async (event) => {
    if (!selectedTicket) {
      return
    }

    const status = event.target.value

    try {
      const updatedTicket = await updateTicketStatus(selectedTicket.ticketId, status)
      setSelectedTicket(updatedTicket)
      const updatedTickets = tickets.map((ticket) => (
        ticket.ticketId === updatedTicket.ticketId ? updatedTicket : ticket
      ))

      setTickets(updatedTickets)
      setMessage('Ticket status updated.')
    } catch (error) {
      showError(error, 'Could not update the ticket status.')
    }
  }

  return (
    <main className="dashboard">
      <Header session={session} />

      <section className="dashboard-content support-content">
        <p className="eyebrow accent">SUPPORT DESK</p>
        <h1>Ticket comments</h1>
        <p className="dashboard-copy">Select a ticket to reply to the customer.</p>

        <SupportTicketList tickets={tickets} onSelect={selectTicket} />

        {selectedTicket && (
          <SupportTicketDetails
            ticket={selectedTicket}
            comments={comments}
            comment={comment}
            onCommentChange={setComment}
            onCommentSubmit={handleCommentSubmit}
            onStatusChange={handleStatusChange}
          />
        )}

        {message && <p className="ticket-message">{message}</p>}
      </section>

      <Footer />
    </main>
  )
}

export default BankSupportPage
