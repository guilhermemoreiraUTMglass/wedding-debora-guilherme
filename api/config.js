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
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/wedding_config?select=*&limit=1`, { headers: HEADERS })
    const data = await r.json()
    return res.status(200).json(data)
  }

  if (req.method === 'PATCH') {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/wedding_config?id=not.is.null`,
      { method: 'PATCH', headers: HEADERS, body: JSON.stringify(req.body) }
    )
    if (!r.ok) {
      const err = await r.text()
      return res.status(400).json({ ok: false, error: err })
    }
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
