import { useContext, memo } from 'react'
import { ContactContext } from '../contexts/ContactContext'
import './ContactCard.css'

const ContactCard = memo(({ contact }) => {
  const { deleteContact } = useContext(ContactContext)

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      deleteContact(contact.id)
    }
  }

  return (
    <div className="contact-card">
      <div className="contact-header">
        <div className="contact-avatar">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <div className="contact-name-section">
          <h3 className="contact-name">{contact.name}</h3>
          <button
            className="delete-button"
            onClick={handleDelete}
            title="Delete contact"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="contact-details">
        <div className="detail-item">
          <span className="detail-icon">📞</span>
          <div className="detail-content">
            <p className="detail-label">Phone</p>
            <a href={`tel:${contact.phone.replace(/\D/g, '')}`}>
              {contact.phone}
            </a>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">✉️</span>
          <div className="detail-content">
            <p className="detail-label">Email</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </div>
    </div>
  )
})

ContactCard.displayName = 'ContactCard'

export default ContactCard
