import { createContext, useContext, useState, useEffect } from 'react'
import { WEDDING_CONFIG as FALLBACK } from '../lib/mockData'

// Usa a API do Vercel como proxy — funciona em qualquer rede
const API = '/api/config'

const ConfigContext = createContext(null)

export const DEFAULT_STORY = [
  { id: 1, year: '2021', title: 'O primeiro encontro', desc: 'O destino nos colocou no mesmo caminho. Um sorriso, uma conversa, e tudo mudou.' },
  { id: 2, year: '2022', title: 'Assumindo o namoro', desc: 'Tornamos oficial o que o coração já sabia: queríamos estar juntos para sempre.' },
  { id: 3, year: '2024', title: 'O pedido de noivado', desc: 'Com um anel e muita emoção, o sim que já estava guardado no coração finalmente foi dito.' },
  { id: 4, year: '2025', title: 'O grande dia', desc: '29 de agosto — o dia em que nos tornamos um só, diante de Deus e das pessoas que amamos.' },
]

export const DEFAULT_FAQS = [
  { id: 1, q: 'Como funciona a lista de presentes?', a: 'Escolha um presente disponível, confirme em 3 passos e finalize pelo WhatsApp com os noivos.' },
  { id: 2, q: 'Posso dar dinheiro ou Pix?', a: 'Sim! Fale com os noivos pelo WhatsApp e eles passarão os dados para transferência.' },
  { id: 3, q: 'Posso levar presente no dia?', a: 'Preferiríamos combinar a entrega antes pelo WhatsApp para facilitar a logística do dia.' },
  { id: 4, q: 'O que fazer se o presente foi reservado?', a: 'Escolha outro da lista! Caso queira muito aquele específico, entre em contato com os noivos.' },
]

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState({ ...FALLBACK })
  const [story, setStory] = useState(DEFAULT_STORY)
  const [faqs, setFaqs] = useState(DEFAULT_FAQS)

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => {
        if (!data || data.length === 0) return
        const row = data[0]
        setConfig({
          bride: row.bride || FALLBACK.bride,
          groom: row.groom || FALLBACK.groom,
          date: row.wedding_date || FALLBACK.date,
          date_display: row.date_display || FALLBACK.date_display,
          venue_name: row.venue_name || '',
          venue_address: row.venue_address || '',
          ceremony_time: row.ceremony_time || '18h00',
          reception_time: row.reception_time || '17h30',
          whatsapp_number: row.whatsapp_number || FALLBACK.whatsapp_number,
          cover_photo: row.cover_photo_url || null,
          couple_photo: row.couple_photo_url || null,
          message: row.message || FALLBACK.message,
          bible_verse: row.bible_verse || FALLBACK.bible_verse,
          bible_ref: row.bible_ref || FALLBACK.bible_ref,
        })
        if (row.story) try { setStory(JSON.parse(row.story)) } catch(e) {}
        if (row.faqs) try { setFaqs(JSON.parse(row.faqs)) } catch(e) {}
      })
      .catch(e => console.error('Erro load config:', e))
  }, [])

  const saveToDb = async (fields) => {
    const clean = {}
    Object.keys(fields).forEach(k => { if (fields[k] !== undefined) clean[k] = fields[k] })
    try {
      const r = await fetch(API, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clean)
      })
      const result = await r.json()
      return result.ok !== false
    } catch(e) {
      console.error('Erro save:', e)
      return false
    }
  }

  const updateConfig = async (partial) => {
    setConfig(prev => ({ ...prev, ...partial }))
    return await saveToDb({
      bride: partial.bride,
      groom: partial.groom,
      wedding_date: partial.date,
      date_display: partial.date_display,
      venue_name: partial.venue_name,
      venue_address: partial.venue_address,
      ceremony_time: partial.ceremony_time,
      reception_time: partial.reception_time,
      whatsapp_number: partial.whatsapp_number,
      cover_photo_url: partial.cover_photo,
      couple_photo_url: partial.couple_photo,
      message: partial.message,
      bible_verse: partial.bible_verse,
      bible_ref: partial.bible_ref,
    })
  }

  const updateStory = async (newStory) => {
    setStory(newStory)
    return await saveToDb({ story: JSON.stringify(newStory) })
  }

  const updateFaqs = async (newFaqs) => {
    setFaqs(newFaqs)
    return await saveToDb({ faqs: JSON.stringify(newFaqs) })
  }

  return (
    <ConfigContext.Provider value={{ config, updateConfig, story, updateStory, faqs, updateFaqs }}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => {
  const ctx = useContext(ConfigContext)
  if (!ctx) throw new Error('useConfig must be inside ConfigProvider')
  return ctx
}
