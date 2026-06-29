import { Heart } from 'lucide-react'
import { useState } from 'react'
import styles from './GiftCard.module.css'

export default function GiftCard({ gift, onChoose }) {
  const [liked, setLiked] = useState(false)
  const isChosen = gift.status === 'chosen'

  return (
    <div className={`${styles.card} ${isChosen ? styles.chosen : ''}`}>
      {/* Image / Emoji */}
      <div className={styles.imgWrap}>
        {gift.image_url
          ? <img src={gift.image_url} alt={gift.name} className={styles.img} />
          : <span className={styles.emoji}>{gift.emoji}</span>
        }
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.topRow}>
          <h3 className={`${styles.name} serif`}>{gift.name}</h3>
          <button
            className={`${styles.heartBtn} ${liked ? styles.heartActive : ''}`}
            onClick={() => setLiked(l => !l)}
            aria-label="Favoritar"
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className={styles.statusRow}>
          <span className={`${styles.dot} ${isChosen ? styles.dotChosen : styles.dotAvail}`} />
          <span className={`${styles.statusText} ${isChosen ? styles.textChosen : styles.textAvail}`}>
            {isChosen ? 'Escolhido' : 'Disponível'}
          </span>
        </div>

        <div className={styles.actions}>
          {isChosen
            ? (
              <button className={styles.btnChosen} disabled>
                ✓ ESCOLHIDO
              </button>
            )
            : (
              <button className={styles.btnChoose} onClick={() => onChoose(gift)}>
                ESCOLHER
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}
