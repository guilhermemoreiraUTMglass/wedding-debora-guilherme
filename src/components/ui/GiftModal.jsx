import { useState } from 'react'
import { X, ChevronLeft, Shield } from 'lucide-react'
import { useGifts } from '../../context/GiftsContext'
import { useConfig } from '../../context/ConfigContext'
import styles from './GiftModal.module.css'

export default function GiftModal({ gift, onClose }) {
  const [step, setStep] = useState(1)
  const [guestName, setGuestName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { claim } = useGifts()
  const { config } = useConfig()

  const handleClaim = async () => {
    if (!guestName.trim()) return
    setLoading(true)
    setError(null)
    try {
      await claim(gift.id, guestName.trim())
      const msg = encodeURIComponent(
        `Olá ${config.bride} e ${config.groom}! 🎉\n\nMeu nome é *${guestName}* e escolhi o presente: *${gift.name}*\n\nEstou muito feliz em fazer parte deste momento especial! 💚`
      )
      window.open(`https://wa.me/${config.whatsapp_number}?text=${msg}`, '_blank')
      onClose()
    } catch(e) {
      setError('Este presente já foi escolhido. Tente outro!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          {step > 1
            ? <button className={styles.backBtn} onClick={() => setStep(s => s - 1)}><ChevronLeft size={20} /></button>
            : <div style={{ width: 36 }} />
          }
          <span className={styles.headerTitle}>Escolher Presente</span>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <div className={styles.steps}>
          {[1, 2, 3].map(n => (
            <div key={n} className={styles.stepWrap}>
              <div className={`${styles.stepDot} ${step === n ? styles.stepActive : ''} ${step > n ? styles.stepDone : ''}`}>
                {step > n ? '✓' : n}
              </div>
              {n < 3 && <div className={`${styles.stepLine} ${step > n ? styles.stepLineDone : ''}`} />}
            </div>
          ))}
        </div>

        <div className={styles.body}>
          {step === 1 && (
            <div className={styles.stepContent}>
              <h2 className={`${styles.stepTitle} serif`}>Confirmação 1</h2>
              <p className={styles.stepSub}>Você escolheu este presente:</p>
              <div className={styles.giftPreviewImg}>
                {gift.image_url
                  ? <img src={gift.image_url} alt={gift.name} />
                  : <span className={styles.giftEmoji}>{gift.emoji}</span>
                }
              </div>
              <h3 className={`${styles.giftPreviewName} serif`}>{gift.name}</h3>
              <p className={styles.stepSub}>{gift.description}</p>
              <div className={styles.notice}>
                <Shield size={18} color="var(--sage)" />
                <span>Este presente ficará reservado para você durante 5 minutos.</span>
              </div>
              <button className={styles.btnPrimary} onClick={() => setStep(2)}>CONTINUAR</button>
              <button className={styles.btnSecondary} onClick={onClose}>VOLTAR</button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepContent}>
              <h2 className={`${styles.stepTitle} serif`}>Confirmação 2</h2>
              <div className={styles.bigIcon}>🎁</div>
              <h3 className={`${styles.stepQuestion} serif`}>Tem certeza que deseja escolher este presente?</h3>
              <p className={styles.stepWarning}>Após a confirmação, este presente não ficará mais disponível para outros convidados.</p>
              <div className={styles.heartDivider}>♡</div>
              <button className={styles.btnPrimary} onClick={() => setStep(3)}>SIM, QUERO ESCOLHER</button>
              <button className={styles.btnSecondary} onClick={() => setStep(1)}>VOLTAR</button>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepContent}>
              <h2 className={`${styles.stepTitle} serif`}>Última confirmação!</h2>
              <div className={styles.bigIcon}>✅</div>
              <p className={styles.stepWarning}>Digite seu nome para confirmar a escolha e finalizar pelo WhatsApp.</p>
              <div className={styles.nameInput}>
                <input
                  className={styles.nameField}
                  type="text"
                  placeholder="Seu nome completo"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className={styles.heartDivider}>♡</div>
              {error && <p className={styles.error}>{error}</p>}
              <button
                className={styles.btnWhatsapp}
                onClick={handleClaim}
                disabled={loading || !guestName.trim()}
              >
                💬 {loading ? 'CONFIRMANDO...' : 'CONFIRMAR NO WHATSAPP'}
              </button>
              <button className={styles.btnSecondary} onClick={() => setStep(2)} disabled={loading}>VOLTAR</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
