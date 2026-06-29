import { useConfig } from '../../context/ConfigContext'
import { useAdmin } from '../../context/AdminContext'
import styles from './AboutSection.module.css'

export default function AboutSection() {
  const { config, story, faqs } = useConfig()
  const { openAdmin } = useAdmin()

  return (
    <section className={styles.section} id="sobre">
      {/* Ceremony */}
      <div className={styles.card} id="cerimonia">
        <div className={styles.cardOrnament}>🌿</div>
        <h2 className={`${styles.cardTitle} serif`}>Cerimônia</h2>
        <div className={styles.divider} />
        <div className={styles.infoGrid}>
          <InfoItem icon="📅" label="Data" value={config.date_display} />
          <InfoItem icon="🕕" label="Horário" value={`${config.ceremony_time}\nRecepção ${config.reception_time}`} />
          <InfoItem icon="📍" label="Local" value={config.venue_name || 'A confirmar'} sub={config.venue_address} />
        </div>
      </div>

      {/* Story */}
      <div className={styles.card} id="historia">
        <div className={styles.cardOrnament}>♡</div>
        <h2 className={`${styles.cardTitle} serif`}>Nossa História</h2>
        <div className={styles.divider} />
        <div className={styles.timeline}>
          {story.map((item, i) => (
            <TimelineItem key={item.id} year={item.year} title={item.title} desc={item.desc} last={i === story.length - 1} />
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className={styles.card}>
        <div className={styles.cardOrnament}>?</div>
        <h2 className={`${styles.cardTitle} serif`}>Perguntas Frequentes</h2>
        <div className={styles.divider} />
        <div className={styles.faqs}>
          {faqs.map(item => (
            <FaqItem key={item.id} q={item.q} a={item.a} />
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className={styles.contactCard}>
        <p className={styles.contactLabel}>Dúvidas? Fale com a gente!</p>
        <a
          href={`https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent('Olá! Vim pelo site do casamento 💚')}`}
          target="_blank" rel="noreferrer"
          className={styles.contactBtn}
        >
          💬 Falar no WhatsApp
        </a>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerLine} />
        <p className={`${styles.verse} serif`}>"{config.bible_verse}"</p>
        <p className={styles.verseRef}>{config.bible_ref}</p>
        <div className={styles.footerLine} />
        <button className={styles.adminTrigger} onClick={openAdmin} aria-label="Área administrativa">
          <span>⚙</span>
          <span>Área Admin</span>
        </button>
        <p className={styles.version}>Versão 1.0</p>
      </div>
    </section>
  )
}

function InfoItem({ icon, label, value, sub }) {
  return (
    <div className={styles.infoItem}>
      <span className={styles.infoIcon}>{icon}</span>
      <div>
        <p className={styles.infoLabel}>{label}</p>
        <p className={styles.infoValue}>{value}</p>
        {sub && <p className={styles.infoSub}>{sub}</p>}
      </div>
    </div>
  )
}

function TimelineItem({ year, title, desc, last }) {
  return (
    <div className={`${styles.tlItem} ${last ? styles.tlLast : ''}`}>
      <div className={styles.tlLeft}><span className={`${styles.tlYear} serif`}>{year}</span></div>
      <div className={styles.tlDotCol}>
        <div className={styles.tlDot} />
        {!last && <div className={styles.tlLine} />}
      </div>
      <div className={styles.tlRight}>
        <h4 className={styles.tlTitle}>{title}</h4>
        <p className={styles.tlDesc}>{desc}</p>
      </div>
    </div>
  )
}

function FaqItem({ q, a }) {
  return (
    <div className={styles.faqItem}>
      <p className={styles.faqQ}>• {q}</p>
      <p className={styles.faqA}>{a}</p>
    </div>
  )
}
