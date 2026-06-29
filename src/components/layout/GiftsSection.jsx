import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useGifts } from '../../context/GiftsContext'
import { CATEGORIES } from '../../lib/mockData'
import GiftCard from '../ui/GiftCard'
import GiftModal from '../ui/GiftModal'
import GiftsProgress from '../ui/GiftsProgress'
import styles from './GiftsSection.module.css'

export default function GiftsSection() {
  const { gifts, loading } = useGifts()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('todos')
  const [selectedGift, setSelectedGift] = useState(null)

  const filtered = useMemo(() => {
    return gifts.filter(g => {
      const matchSearch =
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.description?.toLowerCase().includes(search.toLowerCase())

      if (!matchSearch) return false
      if (activeFilter === 'todos') return true
      if (activeFilter === 'available') return g.status === 'available'
      if (activeFilter === 'chosen') return g.status === 'chosen'
      return g.category === activeFilter
    })
  }, [gifts, search, activeFilter])

  return (
    <section className={styles.section} id="presentes">
      {/* Progress */}
      <GiftsProgress />

      {/* Search */}
      <div className={styles.searchRow}>
        <div className={styles.searchBox}>
          <Search size={16} color="var(--text-muted)" />
          <input
            className={styles.searchInput}
            placeholder="Buscar presente..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className={styles.filterBtn} aria-label="Filtros">
          <SlidersHorizontal size={18} color="var(--text-muted)" />
          <span>FILTRAR</span>
        </button>
      </div>

      {/* Category tabs */}
      <div className={styles.tabs}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.tab} ${activeFilter === cat.id ? styles.tabActive : ''}`}
            onClick={() => setActiveFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className={styles.list}>
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Carregando presentes...</p>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className={styles.empty}>
            <span style={{ fontSize: 40 }}>🎁</span>
            <p>Nenhum presente encontrado.</p>
          </div>
        )}
        {!loading && filtered.map(gift => (
          <GiftCard
            key={gift.id}
            gift={gift}
            onChoose={setSelectedGift}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedGift && (
        <GiftModal
          gift={selectedGift}
          onClose={() => setSelectedGift(null)}
        />
      )}
    </section>
  )
}
