import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const API = '/api/gifts'

const GiftsContext = createContext(null)

export function GiftsProvider({ children }) {
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchGifts = useCallback(async () => {
    try {
      setLoading(true)
      const r = await fetch(API)
      const data = await r.json()
      setGifts(Array.isArray(data) ? data : [])
    } catch(e) {
      console.error('Erro load gifts:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchGifts() }, [fetchGifts])

  const claim = useCallback(async (giftId, guestName) => {
    const r = await fetch(`${API}?id=${giftId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        status: 'chosen', 
        chosen_by: guestName,
        chosen_at: new Date().toISOString() 
      })
    })
    if (!r.ok) throw new Error('Erro ao confirmar presente')
    setGifts(prev => prev.map(g => g.id === giftId ? { ...g, status: 'chosen', chosen_by: guestName } : g))
  }, [])

  const addGift = useCallback(async (gift) => {
    const r = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gift)
    })
    fetchGifts()
  }, [fetchGifts])

  const editGift = useCallback(async (id, changes) => {
    await fetch(`${API}?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes)
    })
    setGifts(prev => prev.map(g => g.id === id ? { ...g, ...changes } : g))
  }, [])

  const removeGift = useCallback(async (id) => {
    await fetch(`${API}?id=${id}`, { method: 'DELETE' })
    setGifts(prev => prev.filter(g => g.id !== id))
  }, [])

  const resetGift = useCallback(async (id) => {
    await fetch(`${API}?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'available', chosen_by: null, chosen_at: null })
    })
    setGifts(prev => prev.map(g => g.id === id ? { ...g, status: 'available', chosen_by: null } : g))
  }, [])

  const stats = {
    total: gifts.length,
    chosen: gifts.filter(g => g.status === 'chosen').length,
    available: gifts.filter(g => g.status === 'available').length,
    pct: gifts.length ? Math.round((gifts.filter(g => g.status === 'chosen').length / gifts.length) * 100) : 0,
  }

  return (
    <GiftsContext.Provider value={{ gifts, loading, claim, addGift, editGift, removeGift, resetGift, stats, refetch: fetchGifts }}>
      {children}
    </GiftsContext.Provider>
  )
}

export const useGifts = () => {
  const ctx = useContext(GiftsContext)
  if (!ctx) throw new Error('useGifts must be inside GiftsProvider')
  return ctx
}
