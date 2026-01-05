import React, { useState, useEffect, useRef } from 'react'
import MessageInput from './MessageInput'
import { initFirebaseFromEnv, sendMessage, listenForMessages, readAllMessages } from '../services/firebaseClient'

const SESSION_ID = 'tani_session'

export default function ChatWindow() {
  const [messages, setMessages] = useState([])
  const [ready, setReady] = useState(true)
  const messagesRef = useRef(null)

  // Initialize Firebase and listen for messages
  useEffect(() => {
    initFirebaseFromEnv()

    // Load existing messages
    readAllMessages(SESSION_ID).then(initial => {
      if (initial && initial.length) setMessages(initial)
    })

    // Real-time listener for new messages
    listenForMessages(SESSION_ID, (msg) => {
      setMessages(prev => {
        if (prev.some(m => m.id === msg.id)) return prev
        return [...prev, msg]
      })
    })
  }, [])

  // Auto-scroll behavior: only scroll to bottom when user is near bottom
  useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 120
    if (isNearBottom) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  // Send user query
  const onSend = async (text) => {
    if (!text.trim()) return
    const timestamp = Date.now()
    const userMsg = { role: 'user', text, timestamp }

    // Push user message to Firebase
    try {
      await sendMessage(SESSION_ID, userMsg)
    } catch (err) {
      // fallback: append directly if Firebase fails
      setMessages(prev => [...prev, userMsg])
    }

    // Call backend
    setReady(false)
    try {
      const resp = await fetch('http://localhost:8000/api/v1/query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, k: 3 })
      })
      const data = await resp.json()
      const assistantMsg = {
        role: 'assistant',
        text: data.answer || 'No answer',
        timestamp: Date.now(),
        sources: data.sources || []
      }

      try {
        await sendMessage(SESSION_ID, assistantMsg)
      } catch (err) {
        setMessages(prev => [...prev, assistantMsg])
      }
    } catch (err) {
      const errorMsg = { role: 'assistant', text: `Error: ${err.message}`, timestamp: Date.now() }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setReady(true)
    }
  }
  return (
    <div className="chat-window">
      <div className="messages" aria-live="polite">
        {(() => {
          const VISIBLE_COUNT = 6
          const visible = messages.slice(-VISIBLE_COUNT)
          return visible.map((m, i) => {
          const key = m.id || `${m.role}-${i}-${m.timestamp}`
          const role = m.role || 'assistant'
          const time = m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
          return (
            <div key={key} className={`message-row ${role}`}>
              <div className="avatar" aria-hidden>{role === 'user' ? 'U' : 'T'}</div>
              <div className="bubble">
                <div className="text">{m.text}</div>
                {m.sources && m.sources.length > 0 && (
                  <div className="sources">Sources: {m.sources.map(s => s.source || s.file || 'unknown').join(', ')}</div>
                )}
                <div className="meta">{time}</div>
              </div>
            </div>
          )
        })
        })()}

        {!ready && (
          <div className="message-row assistant">
            <div className="avatar">T</div>
            <div className="bubble">I am thinking...</div>
          </div>
        )}
      </div>

      <MessageInput onSend={onSend} disabled={!ready} />
    </div>
  )
}
