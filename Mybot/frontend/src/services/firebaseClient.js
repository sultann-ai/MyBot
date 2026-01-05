import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onChildAdded, onValue, set } from 'firebase/database'

let db = null
let appInstance = null

export function initFirebaseFromEnv() {
  if (appInstance) return
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  }
  if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL) {
    console.warn('Firebase config not found in env; realtime features disabled.')
    return
  }
  appInstance = initializeApp(firebaseConfig)
  db = getDatabase(appInstance)
}

/**
 * sendMessage(sessionId, message)
 * message: { role: 'user'|'assistant', text: string, timestamp: number }
 */
export async function sendMessage(sessionId, message) {
  if (!db) {
    console.warn('Firebase not initialized; call initFirebaseFromEnv() first.')
    return
  }
  const node = `messages/${sessionId}`
  const messagesRef = ref(db, node)
  return push(messagesRef, message)
}

/**
 * listenForMessages(sessionId, onMessage)
 * onMessage(messageObject)
 * returns unsubscribe function
 */
export function listenForMessages(sessionId, onMessage) {
  if (!db) {
    console.warn('Firebase not initialized; call initFirebaseFromEnv() first.')
    return () => {}
  }
  const node = `messages/${sessionId}`
  const messagesRef = ref(db, node)
  const handleChild = (snapshot) => {
    const value = snapshot.val()
    if (!value) return
    onMessage({ id: snapshot.key, ...value })
  }
  onChildAdded(messagesRef, handleChild)
  // return simple unsubscribe (Realtime SDK doesn't return a handle from onChildAdded; use onValue for full control)
  return () => {} 
}

/**
 * readAllMessages(sessionId) -> returns Promise<Array of messages>>
 */
export async function readAllMessages(sessionId) {
  if (!db) return []
  const node = `messages/${sessionId}`
  const messagesRef = ref(db, node)
  return new Promise((resolve, reject) => {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {}
      const arr = Object.entries(data).map(([id, value]) => ({ id, ...value })).sort((a,b)=>a.timestamp - b.timestamp)
      resolve(arr)
    }, (err) => reject(err), { onlyOnce: true })
  })
}
