import CommentList from './CommentList'

const SupportTicketDetails = ({
  ticket,
  comments,
  comment,
  onCommentChange,
  onCommentSubmit,
  onStatusChange,
}) => {
  return (
    <div className="comment-section">
      <div className="selected-ticket-heading">
        <div>
          <h3>#{ticket.ticketId} {ticket.subject}</h3>
          <p className="ticket-details">
            Category: {ticket.category} · Customer: {ticket.customer?.user?.username || 'Unknown'}
          </p>
          <p className="ticket-details">
            Created: {formatDate(ticket.createdAt)} · Updated: {formatDate(ticket.updatedAt)}
          </p>
          <p className="ticket-description">{ticket.description}</p>
        </div>

        <label className="status-field">
          <span>Status</span>
          <select value={ticket.status} onChange={onStatusChange}>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="CLOSED">Closed</option>
          </select>
        </label>
      </div>

      <CommentList comments={comments} />

      <form className="comment-form" onSubmit={onCommentSubmit}>
        <input
          required
          value={comment}
          placeholder="Write a reply"
          onChange={(event) => onCommentChange(event.target.value)}
        />
        <button className="customer-action" type="submit">Send</button>
      </form>
    </div>
  )
}

const formatDate = (value) => {
  if (!value) return 'Not available'
  return new Date(value).toLocaleString()
}

export default SupportTicketDetails
