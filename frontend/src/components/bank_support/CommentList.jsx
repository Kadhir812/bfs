import formatDate from '../../utils/formatDate'

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

export default CommentList
