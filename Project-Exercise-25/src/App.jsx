import { ContactProvider } from './contexts/ContactContext'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import './App.css'

function App() {
  return (
    <ContactProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Contact Card App</h1>
          <p>Manage your contacts with ease</p>
        </header>

        <main className="app-main">
          <ContactForm />
          <ContactList />
        </main>

        <footer className="app-footer">
          <p>
            Built with React Hooks • useState • useEffect • useContext •
            useMemo • useCallback • useRef
          </p>
        </footer>
      </div>
    </ContactProvider>
  )
}

export default App
