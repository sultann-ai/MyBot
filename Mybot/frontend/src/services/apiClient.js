const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

/**
 * sendQuery(query, k)
 * returns { answer, sources }
 */
export async function sendQuery(query, k = 3) {
  const url = `${API_BASE}/api/v1/query/`
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, k })
  })
  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`Query failed: ${resp.status} ${text}`)
  }
  return resp.json()
}
