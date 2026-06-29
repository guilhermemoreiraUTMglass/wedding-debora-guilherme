import { useState, useEffect } from 'react'
import { Gift, Menu, X } from 'lucide-react'
import { useGifts } from '../../context/GiftsContext'
import { useConfig } from '../../context/ConfigContext'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Início',         href: '#home',      icon: '🏠', sub: 'Voltar para o topo' },
  { label: 'Presentes',      href: '#presentes', icon: '🎁', sub: 'Escolha um presente' },
  { label: 'Cerimônia',      href: '#cerimonia', icon: '📍', sub: 'Data, horário e endereço' },
  { label: 'Nossa História', href: '#historia',  icon: '♡',  sub: 'Nossa jornada até aqui' },
  { label: 'Sobre',          href: '#sobre',     icon: '🖼️', sub: 'Momentos especiais' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { stats } = useGifts()
  const { config } = useConfig()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <button className={styles.hamburger} onClick={() => setMenuOpen(true)}>
          <Menu size={22} color="var(--sage-dark)" />
        </button>
        <a className={styles.logo} href="#home" onClick={e => { e.preventDefault(); scrollTo('#home') }}>
          <span className={styles.logoLeaf}>🌿</span>
          <span className={styles.logoText}>{config.bride.toUpperCase()} & {config.groom.toUpperCase()}</span>
          <span className={styles.logoLeaf}>🌿</span>
        </a>
        <button className={styles.giftBtn} onClick={() => scrollTo('#presentes')}>
          <Gift size={18} />
          <span className={styles.giftCount}>{stats.chosen}/{stats.total}</span>
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)}>
          <div className={styles.drawer} onClick={e => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <button className={styles.drawerClose} onClick={() => setMenuOpen(false)}><X size={20} /></button>
              <div className={styles.drawerCouple}>
                <div className={styles.drawerAvatar}>
                  {config.couple_photo
                    ? <img src={config.couple_photo} alt="Casal" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} />
                    : '💑'
                  }
                </div>
                <h2 className={`${styles.drawerName} serif`}>{config.bride} & {config.groom}</h2>
                <p className={styles.drawerSub}>Nosso Casamento</p>
                <span className={styles.drawerHeart}>♡</span>
              </div>
            </div>
            <nav className={styles.drawerNav}>
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} className={styles.drawerLink}
                  onClick={e => { e.preventDefault(); scrollTo(link.href) }}>
                  <span className={styles.drawerLinkIcon}>{link.icon}</span>
                  <div>
                    <div className={styles.drawerLinkLabel}>{link.label}</div>
                    <div className={styles.drawerLinkSub}>{link.sub}</div>
                  </div>
                  <span className={styles.drawerArrow}>›</span>
                </a>
              ))}
              <a href={`https://wa.me/${config.whatsapp_number}`} className={styles.drawerLink}
                target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                <span className={styles.drawerLinkIcon}>💬</span>
                <div>
                  <div className={styles.drawerLinkLabel}>Falar com os Noivos</div>
                  <div className={styles.drawerLinkSub}>Abrir WhatsApp</div>
                </div>
                <span className={styles.drawerArrow}>›</span>
              </a>
            </nav>
            <div className={styles.drawerFooter}>
              <div className={styles.drawerVerse}>"{config.bible_verse}"</div>
              <div className={styles.drawerVerseRef}>{config.bible_ref}</div>
              <div className={styles.drawerVersion}>Versão 1.0</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
