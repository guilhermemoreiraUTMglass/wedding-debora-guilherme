import { useGifts } from '../../../context/GiftsContext'
import { SectionTitle } from '../AdminFields'
import styles from './TabEscolhidos.module.css'

export default function TabEscolhidos() {
  const { gifts, resetGift, stats } = useGifts()
  const chosen = gifts.filter(g => g.status === 'chosen')

  return (
    <div>
      <SectionTitle>🎁 {chosen.length} presentes escolhidos</SectionTitle>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{stats.chosen}</span>
          <span className={styles.statLabel}>Escolhidos</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{stats.available}</span>
          <span className={styles.statLabel}>Disponíveis</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{stats.pct}%</span>
          <span className={styles.statLabel}>Completo</span>
        </div>
      </div>

      {chosen.length === 0 ? (
        <div className={styles.empty}>
          <span>🎁</span>
          <p>Nenhum presente escolhido ainda.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {chosen.map(gift => (
            <div key={gift.id} className={styles.item}>
              <div className={styles.itemImg}>
                {gift.image_url
                  ? <img src={gift.image_url} alt={gift.name} />
                  : <span>{gift.emoji}</span>
                }
              </div>
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{gift.name}</p>
                <p className={styles.itemGuest}>
                  👤 {gift.chosen_by || 'Não informado'}
                </p>
                {gift.chosen_at && (
                  <p className={styles.itemDate}>
                    📅 {new Date(gift.chosen_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
              <button
                className={styles.resetBtn}
                onClick={() => resetGift(gift.id)}
                title="Marcar como disponível novamente"
              >
                ↩
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
