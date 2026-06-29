import { useConfig } from '../../context/ConfigContext'
import { useCountdown } from '../../hooks/useCountdown'
import styles from './Hero.module.css'

export default function Hero() {
  const { config } = useConfig()
  const { days, hours, minutes, seconds } = useCountdown(config.date)

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero} id="home">
      <div className={styles.coverPhoto}>
        {config.cover_photo
          ? <img src={config.cover_photo} alt="Casal" />
          : <div className={styles.coverPlaceholder} />
        }
        <div className={styles.coverOverlay} />
      </div>

      <div className={styles.heroContent}>
        <p className={styles.initials}>
          {config.bride[0]} & {config.groom[0]}
        </p>
        <div className={styles.heroLeaf}>🌿</div>
        <h1 className={`${styles.coupleNames} serif`}>
          {config.bride} & {config.groom}
        </h1>
        <div className={styles.heroDivider}>
          <span className={styles.heroDividerLine} />
          <span className={styles.heroDividerHeart}>♥</span>
          <span className={styles.heroDividerLine} />
        </div>
        <p className={styles.weddingDate}>{config.date_display}</p>
      </div>

      <div className={styles.countdownCard}>
        <p className={styles.countdownLabel}>FALTAM</p>
        <span className={styles.countdownHeart}>♥</span>
        <div className={styles.countdownGrid}>
          <CountItem value={days}    unit="DIAS"    />
          <div className={styles.countdownDivider} />
          <CountItem value={hours}   unit="HORAS"   />
          <div className={styles.countdownDivider} />
          <CountItem value={minutes} unit="MINUTOS" />
          <div className={styles.countdownDivider} />
          <CountItem value={seconds} unit="SEGUNDOS"/>
        </div>
      </div>

      <div className={styles.bottomTabs}>
        <button className={styles.tab} onClick={() => scrollTo('#home')}>
          <span className={styles.tabIcon}>🏠</span>
          <span className={styles.tabLabel}>Início</span>
        </button>
        <button className={`${styles.tab} ${styles.tabActive}`} onClick={() => scrollTo('#presentes')}>
          <span className={styles.tabIcon}>🎁</span>
          <span className={styles.tabLabel}>Presentes</span>
        </button>
        <button className={styles.tab} onClick={() => scrollTo('#sobre')}>
          <span className={styles.tabIcon}>♡</span>
          <span className={styles.tabLabel}>Sobre</span>
        </button>
      </div>
    </section>
  )
}

function CountItem({ value, unit }) {
  return (
    <div className={styles.countItem}>
      <span className={`${styles.countNum} serif`}>{String(value).padStart(2, '0')}</span>
      <span className={styles.countUnit}>{unit}</span>
    </div>
  )
}
