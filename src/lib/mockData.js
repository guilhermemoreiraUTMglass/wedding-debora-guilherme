// Dados mockados para desenvolvimento local
// Ao conectar o Supabase, estes dados virão do banco

export const WEDDING_CONFIG = {
  groom: 'Guilherme',
  bride: 'Débora',
  date: '2025-08-29T18:00:00',
  date_display: '29 de Agosto de 2025',
  venue_name: 'A confirmar',
  venue_address: '',
  ceremony_time: '18h00',
  reception_time: '17h30',
  whatsapp_number: '5500000000000', // substitua pelo número real
  cover_photo: null, // URL da foto
  couple_photo: null,
  message: 'Querido amigo, sua presença já é o nosso maior presente. Porém, caso deseje nos presentear, preparamos esta lista com muito carinho. Que Deus abençoe sua vida e obrigado por fazer parte deste momento tão especial!',
  bible_verse: 'Assim, eles já não são dois, mas uma só carne.',
  bible_ref: 'Mateus 19:6',
}

export const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'available', label: 'Disponíveis' },
  { id: 'chosen', label: 'Escolhidos' },
  { id: 'cozinha', label: 'Cozinha' },
  { id: 'quarto', label: 'Quarto' },
  { id: 'sala', label: 'Sala' },
  { id: 'decoracao', label: 'Decoração' },
  { id: 'eletronicos', label: 'Eletrônicos' },
]

let _gifts = [
  { id: 1, name: 'Air Fryer', description: 'Para pratos saudáveis e saborosos no dia a dia.', category: 'cozinha', status: 'available', emoji: '🍳', image_url: null },
  { id: 2, name: 'Jogo de Panelas', description: 'Conjunto completo de panelas antiaderentes premium.', category: 'cozinha', status: 'available', emoji: '🥘', image_url: null },
  { id: 3, name: 'Guarda-Roupa Casal', description: 'Roupeiro espaçoso com espelho e gavetas internas.', category: 'quarto', status: 'chosen', emoji: '🪞', image_url: null },
  { id: 4, name: 'Sofá 3 Lugares', description: 'Sofá confortável em tecido suede bege.', category: 'sala', status: 'available', emoji: '🛋️', image_url: null },
  { id: 5, name: 'Smart TV 55"', description: 'Televisão 4K com sistema operacional inteligente.', category: 'eletronicos', status: 'available', emoji: '📺', image_url: null },
  { id: 6, name: 'Jogo de Cama Queen', description: 'Lençóis de algodão egípcio 400 fios, tom champagne.', category: 'quarto', status: 'available', emoji: '🛏️', image_url: null },
  { id: 7, name: 'Batedeira Planetária', description: 'Para tortas, bolos e muito amor na cozinha.', category: 'cozinha', status: 'available', emoji: '🎂', image_url: null },
  { id: 8, name: 'Aparelho de Jantar', description: 'Conjunto para 12 pessoas em porcelana branca.', category: 'cozinha', status: 'chosen', emoji: '🍽️', image_url: null },
  { id: 9, name: 'Quadro Decorativo', description: 'Arte minimalista para a sala de estar.', category: 'decoracao', status: 'available', emoji: '🖼️', image_url: null },
  { id: 10, name: 'Máquina de Café', description: 'Espresso profissional para o casal.', category: 'cozinha', status: 'available', emoji: '☕', image_url: null },
  { id: 11, name: 'Luminária de Piso', description: 'Luminária moderna para sala ou quarto.', category: 'decoracao', status: 'available', emoji: '💡', image_url: null },
  { id: 12, name: 'Aspirador Robot', description: 'Limpeza automática sem esforço.', category: 'eletronicos', status: 'available', emoji: '🤖', image_url: null },
  { id: 13, name: 'Tapete Sala', description: 'Tapete artesanal 2x3m em tons neutros.', category: 'decoracao', status: 'available', emoji: '🟫', image_url: null },
  { id: 14, name: 'Adega Climatizada', description: 'Para conservar seus vinhos favoritos.', category: 'sala', status: 'available', emoji: '🍷', image_url: null },
  { id: 15, name: 'Caixa de Som Bluetooth', description: 'Som de qualidade para os momentos especiais.', category: 'eletronicos', status: 'available', emoji: '🔊', image_url: null },
]

// Mock API (será substituído pelo Supabase)
export const mockApi = {
  getGifts: async () => {
    await new Promise(r => setTimeout(r, 300))
    return [..._gifts]
  },
  claimGift: async (giftId) => {
    await new Promise(r => setTimeout(r, 500))
    const gift = _gifts.find(g => g.id === giftId)
    if (!gift || gift.status !== 'available') throw new Error('Presente não disponível')
    _gifts = _gifts.map(g => g.id === giftId ? { ...g, status: 'chosen' } : g)
    return _gifts.find(g => g.id === giftId)
  }
}
