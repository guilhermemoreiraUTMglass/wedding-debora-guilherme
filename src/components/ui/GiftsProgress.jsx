import { Gift } from 'lucide-react'
import { useGifts } from '../../context/GiftsContext'
import styles from './GiftsProgress.module.css'

export default function GiftsProgress() {
  const { stats } = useGifts()

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <Gift size={22} color="white" />
      </div>
      <div className={styles.info}>
        <p className={styles.label}>Presentes escolhidos</p>
        <p className={styles.count}>
          <strong>{stats.chosen}</strong> de {stats.total}
        </p>
      </div>
      <div className={styles.progressWrap}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${stats.pct}%` }} />
        </div>
        <span className={styles.pct}>{stats.pct}%</span>
      </div>
    </div>
  )
}
