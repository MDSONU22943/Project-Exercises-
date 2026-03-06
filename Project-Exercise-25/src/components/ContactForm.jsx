import { useRef, useEffect, useContext } from 'react'
import { ContactContext } from '../contexts/ContactContext'
import useFormValidation from '../hooks/useFormValidation'
import './ContactForm.css'

const ContactForm = () => {
  const { addContact } = useContext(ContactContext)
  const nameInputRef = useRef(null)

  const initialValues = {
    name: '',
    phone: '',
    email: '',
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormValidation(initialValues, (formValues) => {
      addContact(formValues)
    })

  // Use useRef and useEffect to focus on name input when component mounts
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [])

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Add New Contact</h2>

      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${touched.name && errors.name ? 'input-error' : ''}`}
          placeholder="Enter your full name"
        />
        {touched.name && errors.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${touched.phone && errors.phone ? 'input-error' : ''}`}
          placeholder="e.g., 123-456-7890"
        />
        {touched.phone && errors.phone && (
          <span className="error-message">{errors.phone}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
          placeholder="e.g., name@example.com"
        />
        {touched.email && errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <button type="submit" className="submit-button">
        Add Contact
      </button>
    </form>
  )
}

export default ContactForm
