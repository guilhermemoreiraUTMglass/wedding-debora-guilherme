import styles from './BottomNav.module.css'

const TABS = [
  { id: 'home',      label: 'Início',    icon: '🏠', href: '#home' },
  { id: 'presentes', label: 'Presentes', icon: '🎁', href: '#presentes' },
  { id: 'sobre',     label: 'Sobre',     icon: '♡',  href: '#sobre' },
]

export default function BottomNav({ active, onChange }) {
  const scrollTo = (href, id) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    onChange(id)
  }

  return (
    <nav className={styles.nav}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
          onClick={() => scrollTo(tab.href, tab.id)}
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
