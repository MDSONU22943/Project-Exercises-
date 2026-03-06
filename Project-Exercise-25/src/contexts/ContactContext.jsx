import { createContext, useState, useCallback } from 'react'

export const ContactContext = createContext()

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([])

  const addContact = useCallback((contact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      {
        id: Date.now(),
        ...contact,
      },
    ])
  }, [])

  const deleteContact = useCallback((id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    )
  }, [])

  const updateContact = useCallback((id, updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    )
  }, [])

  const value = {
    contacts,
    addContact,
    deleteContact,
    updateContact,
  }

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  )
}
