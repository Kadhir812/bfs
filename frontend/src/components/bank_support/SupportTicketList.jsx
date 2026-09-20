import formatDate from '../../utils/formatDate'

const SupportTicketList = ({ tickets, onSelect }) => {
  return (
    <div className="support-tickets">
      {tickets.length === 0 && (
        <p className="empty-message">There are no tickets yet.</p>
      )}

      {tickets.map((ticket) => (
        <button
          className="ticket-row"
          key={ticket.ticketId}
          onClick={() => onSelect(ticket)}
        >
          <span>
            <strong>#{ticket.ticketId} {ticket.subject}</strong>
            <small>
              {ticket.category} · Customer: {ticket.customer?.user?.username || 'Unknown'}
              {' · '}Created: {formatDate(ticket.createdAt)}
              {' · '}Updated: {formatDate(ticket.updatedAt)}
            </small>
          </span>
          <span>{ticket.status}</span>
        </button>
      ))}
    </div>
  )
}

export default SupportTicketList
