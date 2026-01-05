import React from 'react'
import ChatWindow from './components/ChatWindow'

export default function App(){
  return (
    <div className="app">
      <div className="layout">
        <aside className="sidebar card">
          <img src="/data/img/profile.png" alt="TANi profile" className="profile-img" />
          <h2>MyBot</h2>
          <div className="subtitle">Portfolio Chatbot — Documentation Navigator</div>

          <p className="about">Hi — I'm a Bot, a demo portfolio chatbot. Ask me about project docs, code, or recent work. I'll cite sources when available.</p>

          <div className="socials">
            <a href="https://linkedin.example/in/dummy" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24h5V7H0v17zM7 7h5v2.2h.1c.7-1.3 2.4-2.6 4.9-2.6C23.5 6.6 24 10 24 14.4V24h-5v-8.5c0-2-0.04-4.6-2.8-4.6-2.8 0-3.2 2.2-3.2 4.4V24H7V7z" />
              </svg>
            </a>

            <a href="https://twitter.example/tani" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M24 4.6c-.9.4-1.8.6-2.8.8 1-0.6 1.7-1.6 2-2.8-1 .6-2 1-3.1 1.2C19 2 17.7 1.5 16.3 1.5c-2.6 0-4.7 2.2-4.7 4.8 0 .4 0 .8.1 1.1C7.7 7.2 4.1 5.3 1.7 2.4c-.4.8-.6 1.6-.6 2.6 0 1.7.8 3.2 2 4.1-.8 0-1.5-.2-2.1-.6v.1c0 2.4 1.7 4.4 3.9 4.8-.4.1-.8.2-1.3.2-.3 0-.6 0-.8-.1.6 1.8 2.3 3.1 4.3 3.1-1.6 1.2-3.5 1.9-5.6 1.9-.4 0-.8 0-1.2-.1C2.3 21.1 5 22 8 22c9.6 0 14.9-8 14.9-14.9v-.7c1-.7 1.8-1.6 2.5-2.6z"/>
              </svg>
            </a>

            <a href="https://github.example/tani" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.7.5.8 5.4.8 11.7c0 5 3.2 9.2 7.6 10.7.6.1.8-.2.8-.6v-2.2c-3.1.7-3.7-1.3-3.7-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.7 2 .9.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.2-5.2-5.2 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 3 .9.9-.2 1.9-.3 2.8-.3s1.9.1 2.8.3c2.1-1.2 3-.9 3-.9.6 1.4.2 2.4.1 2.7.7.8 1.1 1.7 1.1 2.8 0 4-2.7 4.9-5.2 5.2.4.3.8.9.8 1.8v2.7c0 .4.2.7.8.6 4.4-1.5 7.6-5.7 7.6-10.7C23.2 5.4 18.3.5 12 .5z"/>
              </svg>
            </a>
          </div>
          <a className="resume-btn" href="/data/sultan.pdf" download>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 3v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21H3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{marginLeft:8}}>Download Resume</span>
          </a>
        </aside>

        <main className="content card">
          <ChatWindow />
        </main>
      </div>

      <footer className="app-footer">Built with care · Local dev mode</footer>
    </div>
  )
}
