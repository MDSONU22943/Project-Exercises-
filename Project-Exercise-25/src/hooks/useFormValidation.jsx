import { useState, useCallback } from 'react'

const useFormValidation = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateForm = useCallback(() => {
    const newErrors = {}

    // Name validation
    if (!values.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (values.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Phone validation
    if (!values.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(values.phone)) {
      newErrors.phone = 'Phone number is invalid'
    } else if (values.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone number must have at least 10 digits'
    }

    // Email validation
    if (!values.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Email is invalid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [values])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }, [])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      setTouched({
        name: true,
        phone: true,
        email: true,
      })

      if (validateForm()) {
        onSubmit(values)
        setValues(initialValues)
        setTouched({})
      }
    },
    [validateForm, onSubmit, initialValues]
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  }
}

export default useFormValidation
