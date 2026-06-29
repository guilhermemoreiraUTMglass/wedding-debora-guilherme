import { useConfig } from '../../context/ConfigContext'
import styles from './MessageSection.module.css'

export default function MessageSection() {
  const { config } = useConfig()
  return (
    <section className={styles.section}>
      <div className={styles.ornament}>🌿</div>
      <h2 className={`${styles.title} serif`}>Uma mensagem para você</h2>
      <p className={styles.text}>{config.message}</p>
      <div className={styles.heartRow}>
        <span className={styles.line} />
        <span className={styles.heart}>♡</span>
        <span className={styles.line} />
      </div>
    </section>
  )
}
