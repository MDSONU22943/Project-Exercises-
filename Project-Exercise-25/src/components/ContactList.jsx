import { useContext, useMemo } from 'react'
import { ContactContext } from '../contexts/ContactContext'
import ContactCard from './ContactCard'
import './ContactList.css'

const ContactList = () => {
  const { contacts } = useContext(ContactContext)

  // Use useMemo to optimize the sorted contacts list
  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => a.name.localeCompare(b.name))
  }, [contacts])

  // Use useMemo to calculate statistics
  const stats = useMemo(() => {
    return {
      totalContacts: contacts.length,
      emailCount: contacts.filter((c) => c.email).length,
      phoneCount: contacts.filter((c) => c.phone).length,
    }
  }, [contacts])

  return (
    <div className="contact-list-container">
      <div className="list-header">
        <h2>Your Contacts</h2>
        <div className="contact-stats">
          <div className="stat">
            <span className="stat-number">{stats.totalContacts}</span>
            <span className="stat-label">Contacts</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.phoneCount}</span>
            <span className="stat-label">Phones</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.emailCount}</span>
            <span className="stat-label">Emails</span>
          </div>
        </div>
      </div>

      {sortedContacts.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📋</p>
          <h3>No Contacts Yet</h3>
          <p>Add your first contact using the form above!</p>
        </div>
      ) : (
        <div className="contacts-grid">
          {sortedContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ContactList
