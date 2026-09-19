import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TicketForm from '../components/TicketForm'
import { addComment, getComments } from '../api/commentApi'
import { getApiError } from '../api/authApi'
import { createTicket, getMyTickets, updateTicket } from '../api/ticketApi'

const emptyTicket = {
  category: 'ATM',
  subject: '',
  description: '',
}

const CustomerPage = () => {
  const session = JSON.parse(localStorage.getItem('bankticket-session'))
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)
  const [ticket, setTicket] = useState(emptyTicket)
  const [message, setMessage] = useState('')

  const showError = (error, fallbackMessage) => {
    setMessage(getApiError(error, fallbackMessage))
  }

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await getMyTickets()
        setTickets(data)
        if (data.length > 0) {
          setSelectedTicket(data[0])
          setComments(await getComments(data[0].ticketId))
        }
      } catch (error) {
        showError(error, 'Could not load tickets.')
      }
    }

    loadTickets()
  }, [])

  const selectTicket = async (ticketToSelect) => {
    setSelectedTicket(ticketToSelect)
    try {
      setComments(await getComments(ticketToSelect.ticketId))
    } catch (error) {
      showError(error, 'Could not load comments.')
    }
  }

  const openNewTicketForm = () => {
    setEditingTicket(null)
    setTicket(emptyTicket)
    setShowForm(true)
  }

  const openEditTicketForm = () => {
    setEditingTicket(selectedTicket)
    setTicket({
      category: selectedTicket.category,
      subject: selectedTicket.subject,
      description: selectedTicket.description,
    })
    setShowForm(true)
  }

  const closeTicketForm = () => {
    setShowForm(false)
    setEditingTicket(null)
    setTicket(emptyTicket)
  }

  const handleTicketSubmit = async (event) => {
    event.preventDefault()
    try {
      const savedTicket = editingTicket
        ? await updateTicket(editingTicket.ticketId, ticket)
        : await createTicket(ticket)

      const updatedTickets = editingTicket
        ? tickets.map((item) => item.ticketId === savedTicket.ticketId ? savedTicket : item)
        : [...tickets, savedTicket]

      setTickets(updatedTickets)
      closeTicketForm()
      await selectTicket(savedTicket)
      setMessage(editingTicket ? 'Ticket updated successfully.' : 'Ticket created successfully.')
    } catch (error) {
      showError(error, 'Could not save the ticket.')
    }
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    if (!comment.trim() || !selectedTicket) return

    try {
      const savedComment = await addComment(selectedTicket.ticketId, comment)
      setComments([...comments, savedComment])
      setComment('')
    } catch (error) {
      showError(error, 'Could not add the comment.')
    }
  }

  return (
    <main className="dashboard customer-page">
      <Header session={session} />
      <section className="customer-content">
        <p className="eyebrow accent">CUSTOMER PORTAL</p>
        <h1>Welcome, <em>{session.username}</em></h1>
        <p className="dashboard-copy">Manage your support tickets here.</p>

        <div className="ticket-section">
          <div className="section-heading">
            <h2>My tickets</h2>
            <button className="customer-action" onClick={showForm ? closeTicketForm : openNewTicketForm}>
              {showForm ? 'Cancel' : 'New ticket'}
            </button>
          </div>

          {showForm && <TicketForm
            ticket={ticket}
            onChange={setTicket}
            onSubmit={handleTicketSubmit}
            isEditing={Boolean(editingTicket)}
            onCancel={closeTicketForm}
          />}

          {tickets.length === 0 && (
            <p className="empty-message">You do not have any tickets yet.</p>
          )}

          {tickets.map((item) => <button
            className="ticket-row"
            key={item.ticketId}
            onClick={() => selectTicket(item)}
          >
            <span>
              <strong>#{item.ticketId} {item.subject}</strong>
              <small>Created: {formatDate(item.createdAt)} · Updated: {formatDate(item.updatedAt)}</small>
            </span>
            <span>{item.status}</span>
          </button>)}

          {selectedTicket && <CommentThread
            ticket={selectedTicket}
            comments={comments}
            comment={comment}
            setComment={setComment}
            onSubmit={handleCommentSubmit}
            onEdit={openEditTicketForm}
          />}
          {message && <p className="ticket-message">{message}</p>}
        </div>
      </section>
      <Footer />
    </main>
  )
}

const CommentThread = ({ ticket, comments, comment, setComment, onSubmit, onEdit }) => {
  return (
    <div className="comment-section">
      <div className="selected-ticket-heading">
        <div>
          <h3>#{ticket.ticketId} {ticket.subject}</h3>
          <p className="ticket-details">Created: {formatDate(ticket.createdAt)} · Updated: {formatDate(ticket.updatedAt)}</p>
        </div>
        <button className="customer-action" type="button" onClick={onEdit}>Edit</button>
      </div>

      <div className="comments">
        {comments.length === 0 ? (
          <p className="empty-message">No comments yet.</p>
        ) : comments.map((item) => (
          <div className="comment" key={item.ticketCommentId}>
            <strong>{item.user?.username || 'User'}</strong>
            <p>{item.message}</p>
          </div>
        ))}
      </div>

      <form className="comment-form" onSubmit={onSubmit}>
        <input required value={comment} placeholder="Write a comment" onChange={(event) => setComment(event.target.value)} />
        <button className="customer-action" type="submit">Send</button>
      </form>
    </div>
  )
}

const formatDate = (value) => {
  if (!value) return 'Not available'
  return new Date(value).toLocaleString()
}

export default CustomerPage
