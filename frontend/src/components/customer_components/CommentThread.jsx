import formatDate from '../../utils/formatDate'

const CommentThread = ({
  ticket,
  comments,
  comment,
  onCommentChange,
  onSubmit,
  onEdit,
}) => {
  return (
    <div className="comment-section">
      <div className="selected-ticket-heading">
        <div>
          <h3>#{ticket.ticketId} {ticket.subject}</h3>
          <p className="ticket-details">
            Created: {formatDate(ticket.createdAt)} · Updated: {formatDate(ticket.updatedAt)}
          </p>
        </div>
        <button className="customer-action" type="button" onClick={onEdit}>
          Edit
        </button>
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
        <input
          required
          value={comment}
          placeholder="Write a comment"
          onChange={(event) => onCommentChange(event.target.value)}
        />
        <button className="customer-action" type="submit">Send</button>
      </form>
    </div>
  )
}

export default CommentThread
