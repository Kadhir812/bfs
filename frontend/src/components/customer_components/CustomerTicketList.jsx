import formatDate from '../../utils/formatDate'

const CustomerTicketList = ({ tickets, onSelect }) => {
  if (tickets.length === 0) {
    return <p className="empty-message">You do not have any tickets yet.</p>
  }

  return (
    <div className="customer-tickets">
      {tickets.map((ticket) => (
        <button
          className="ticket-row"
          key={ticket.ticketId}
          onClick={() => onSelect(ticket)}
        >
          <span>
            <strong>#{ticket.ticketId} {ticket.subject}</strong>
            <small>
              Created: {formatDate(ticket.createdAt)} · Updated: {formatDate(ticket.updatedAt)}
            </small>
          </span>
          <span>{ticket.status}</span>
        </button>
      ))}
    </div>
  )
}

export default CustomerTicketList
