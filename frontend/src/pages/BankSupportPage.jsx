import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { addComment, getComments } from '../api/commentApi'
import { getApiError } from '../api/authApi'
import { getAllTickets, updateTicketStatus } from '../api/ticketApi'

function BankSupportPage() {
  const session = JSON.parse(localStorage.getItem('bankticket-session'))
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getAllTickets()
        setTickets(data)
        if (data.length > 0) {
          setSelectedTicket(data[0])
          setComments(await getComments(data[0].ticketId))
        }
      } catch (error) {
        setMessage(getApiError(error, 'Could not load tickets.'))
      }
    }

    loadTickets()
  }, [])

  async function selectTicket(ticket) {
    setSelectedTicket(ticket)
    try {
      setComments(await getComments(ticket.ticketId))
    } catch (error) {
      setMessage(getApiError(error, 'Could not load comments.'))
    }
  }

  async function handleCommentSubmit(event) {
    event.preventDefault()
    if (!comment.trim() || !selectedTicket) return

    try {
      const savedComment = await addComment(selectedTicket.ticketId, comment)
      setComments([...comments, savedComment])
      setComment('')
    } catch (error) {
      setMessage(getApiError(error, 'Could not add the comment.'))
    }
  }

  async function handleStatusChange(event) {
    const status = event.target.value

    try {
      const updatedTicket = await updateTicketStatus(selectedTicket.ticketId, status)
      setSelectedTicket(updatedTicket)
      setTickets(tickets.map((ticket) => ticket.ticketId === updatedTicket.ticketId ? updatedTicket : ticket))
      setMessage('Ticket status updated.')
    } catch (error) {
      setMessage(getApiError(error, 'Could not update the ticket status.'))
    }
  }

  return <main className="dashboard">
    <Header session={session} />
    <section className="dashboard-content support-content">
      <p className="eyebrow accent">SUPPORT DESK</p>
      <h1>Ticket comments</h1>
      <p className="dashboard-copy">Select a ticket to reply to the customer.</p>

      <div className="support-tickets">
        {tickets.length === 0 && <p className="empty-message">There are no tickets yet.</p>}
        {tickets.map((ticket) => <button className="ticket-row" key={ticket.ticketId} onClick={() => selectTicket(ticket)}>
          <span>
            <strong>#{ticket.ticketId} {ticket.subject}</strong>
            <small>{ticket.category} · Customer: {ticket.customer?.user?.username || 'Unknown'} · Created: {formatDate(ticket.createdAt)} · Updated: {formatDate(ticket.updatedAt)}</small>
          </span>
          <span>{ticket.status}</span>
        </button>)}
      </div>

      {selectedTicket && <div className="comment-section">
        <div className="selected-ticket-heading">
          <div>
            <h3>#{selectedTicket.ticketId} {selectedTicket.subject}</h3>
            <p className="ticket-details">Category: {selectedTicket.category} · Customer: {selectedTicket.customer?.user?.username || 'Unknown'}</p>
            <p className="ticket-details">Created: {formatDate(selectedTicket.createdAt)} · Updated: {formatDate(selectedTicket.updatedAt)}</p>
            <p className="ticket-description">{selectedTicket.description}</p>
          </div>
          <label className="status-field">
            <span>Status</span>
            <select value={selectedTicket.status} onChange={handleStatusChange}>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="CLOSED">Closed</option>
            </select>
          </label>
        </div>
        <div className="comments">{comments.length === 0 ? <p className="empty-message">No comments yet.</p> : comments.map((item) => <div className="comment" key={item.ticketCommentId}><strong>{item.user?.username || 'User'}</strong><small>{formatDate(item.createdAt)}</small><p>{item.message}</p></div>)}</div>
        <form className="comment-form" onSubmit={handleCommentSubmit}><input required value={comment} placeholder="Write a reply" onChange={(event) => setComment(event.target.value)} /><button className="customer-action" type="submit">Send</button></form>
      </div>}
      {message && <p className="ticket-message">{message}</p>}
    </section>
    <Footer />
  </main>
}

function formatDate(value) {
  if (!value) return 'Not available'
  return new Date(value).toLocaleString()
}

export default BankSupportPage
