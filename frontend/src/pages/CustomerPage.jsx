import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TicketForm from '../components/customer_components/TicketForm'
import CustomerTicketList from '../components/customer_components/CustomerTicketList'
import CommentThread from '../components/customer_components/CommentThread'
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
        ? tickets.map((item) => 
                            item.ticketId === savedTicket.ticketId ? savedTicket : item)
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

          <CustomerTicketList
            tickets={tickets}
            onSelect={selectTicket}
          />

          {selectedTicket && (
            <CommentThread
              ticket={selectedTicket}
              comments={comments}
              comment={comment}
              onCommentChange={setComment}
              onSubmit={handleCommentSubmit}
              onEdit={openEditTicketForm}
            />
          )}
          {message && <p className="ticket-message">{message}</p>}
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default CustomerPage
