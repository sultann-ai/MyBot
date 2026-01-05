import React, { useState } from 'react'

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (text.trim()) {
      onSend(text)
      setText('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="input-row">
      <textarea
        aria-label="Message"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        disabled={disabled}
        placeholder={disabled ? "I am thinking..." : "Ask a question or paste a snippet... (Enter to send, Shift+Enter newline)"}
      />

      <button
        className="send"
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        aria-label="Send message"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Send</span>
      </button>
    </div>
  )
}
