import styles from './AdminFields.module.css'

export function Field({ label, hint, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {hint && <p className={styles.hint}>{hint}</p>}
      {children}
    </div>
  )
}

export function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  )
}

export function Select({ value, onChange, options }) {
  return (
    <select className={styles.select} value={value} onChange={e => onChange(e.target.value)}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

export function SaveBtn({ onClick, saved }) {
  return (
    <button
      className={`${styles.saveBtn} ${saved ? styles.saveBtnSaved : ''}`}
      onClick={onClick}
    >
      {saved ? '✓ Salvo!' : 'Salvar alterações'}
    </button>
  )
}

export function SectionTitle({ children }) {
  return <h3 className={styles.sectionTitle}>{children}</h3>
}

export function Divider() {
  return <div className={styles.divider} />
}
