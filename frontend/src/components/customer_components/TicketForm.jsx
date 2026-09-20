const TicketForm = ({ ticket, isEditing, onChange, onSubmit, onCancel }) => {
  
    const updateField = (field, value) => {
    onChange({ ...ticket, [field]: value })
  }

  return (
    <form className="ticket-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Category</span>
        <select
          value={ticket.category}
          onChange={(event) => updateField('category', event.target.value)}
        >
          <option value="ATM">ATM</option>
          <option value="CARD">Card</option>
          <option value="TRANSACTION">Transaction</option>
          <option value="ACCOUNT">Account</option>
          <option value="LOAN">Loan</option>
        </select>
      </label>

      <label className="field">
        <span>Subject</span>
        <input
          required
          value={ticket.subject}
          onChange={(event) => updateField('subject', event.target.value)}
        />
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          required
          rows="4"
          value={ticket.description}
          onChange={(event) => updateField('description', event.target.value)}
        />
      </label>

      <button className="primary-button" type="submit">
        {isEditing ? 'Save changes' : 'Submit ticket'}
      </button>

      {isEditing && (
        <button className="customer-action" type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  )
}

export default TicketForm
