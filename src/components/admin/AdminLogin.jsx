import { useState } from 'react'
import { X, Lock, Eye, EyeOff } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
  const { showLoginModal, setShowLoginModal, login } = useAdmin()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)

  if (!showLoginModal) return null

  const handleSubmit = () => {
    const ok = login(password)
    if (!ok) {
      setError('Senha incorreta. Tente novamente.')
      setPassword('')
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className={styles.overlay} onClick={() => setShowLoginModal(false)}>
      <div
        className={`${styles.modal} ${shaking ? styles.shake : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={() => setShowLoginModal(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Icon */}
        <div className={styles.iconWrap}>
          <div className={styles.lockIcon}>
            <Lock size={28} color="var(--sage)" />
          </div>
        </div>

        <h2 className={`${styles.title} serif`}>Área Restrita</h2>
        <p className={styles.subtitle}>Digite a senha para acessar o painel de edição.</p>

        {/* Input */}
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type={show ? 'text' : 'password'}
            placeholder="Senha"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            onKeyDown={handleKey}
            autoFocus
          />
          <button className={styles.eyeBtn} onClick={() => setShow(s => !s)}>
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.btnEnter} onClick={handleSubmit}>
          ENTRAR
        </button>
      </div>
    </div>
  )
}
