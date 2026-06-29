const SUPABASE_URL = 'https://lnilxovhewqnouapipjz.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuaWx4b3ZoZXdxbm91YXBpcGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2ODAzNDcsImV4cCI6MjA5ODI1NjM0N30.sDimrc9q70Gn15kX4KbUMr4xXPTBhjzBwN-zRJGmUeU'

const HEADERS = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation'
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { id } = req.query

  if (req.method === 'GET') {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/gifts?select=*&order=sort_order.asc`, { headers: HEADERS })
    const data = await r.json()
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/gifts`, { method: 'POST', headers: HEADERS, body: JSON.stringify(req.body) })
    const data = await r.json()
    return res.status(r.ok ? 200 : 400).json(data)
  }

  if (req.method === 'PATCH' && id) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/gifts?id=eq.${id}`, { method: 'PATCH', headers: HEADERS, body: JSON.stringify(req.body) })
    const data = await r.json()
    return res.status(r.ok ? 200 : 400).json(data)
  }

  if (req.method === 'DELETE' && id) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/gifts?id=eq.${id}`, { method: 'DELETE', headers: HEADERS })
    return res.status(r.ok ? 200 : 400).json({ ok: r.ok })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
