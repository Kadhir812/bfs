const CommentList = ({ comments }) => {
  return (
    <div className="comments">
      {comments.length === 0 ? (
        <p className="empty-message">No comments yet.</p>
      ) : (
        comments.map((item) => (
          <div className="comment" key={item.ticketCommentId}>
            <strong>{item.user?.username || 'User'}</strong>
            <small>{formatDate(item.createdAt)}</small>
            <p>{item.message}</p>
          </div>
        ))
      )}
    </div>
  )
}

const formatDate = (value) => {
  if (!value) return 'Not available'
  return new Date(value).toLocaleString()
}

export default CommentList
