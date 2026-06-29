import { useState, useRef } from 'react'
import { useConfig } from '../../../context/ConfigContext'
import { Field, Input, SaveBtn, SectionTitle, Divider } from '../AdminFields'
import styles from './TabFotos.module.css'

export default function TabFotos() {
  const { config, updateConfig } = useConfig()
  const [form, setForm] = useState({ ...config })
  const [saved, setSaved] = useState(false)
  const coverRef = useRef()
  const coupleRef = useRef()

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = () => {
    updateConfig(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Converte imagem local para base64
  const handleFileUpload = (key, file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => setForm(f => ({ ...f, [key]: e.target.result }))
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <SectionTitle>🖼️ Foto do Hero (capa)</SectionTitle>
      <p className={styles.hint}>Aparece como background na tela inicial.</p>

      {/* Upload direto da galeria */}
      <div className={styles.uploadArea} onClick={() => coverRef.current.click()}>
        {form.cover_photo ? (
          <img src={form.cover_photo} alt="Capa" className={styles.uploadPreview} />
        ) : (
          <div className={styles.uploadPlaceholder}>
            <span>📷</span>
            <p>Toque para escolher da galeria</p>
          </div>
        )}
        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => handleFileUpload('cover_photo', e.target.files[0])}
        />
      </div>

      {form.cover_photo && (
        <button className={styles.removeBtn} onClick={() => setForm(f => ({ ...f, cover_photo: null }))}>
          🗑 Remover foto
        </button>
      )}

      <Field label="Ou cole a URL da foto" hint="Link direto de uma imagem online">
        <Input value={form.cover_photo?.startsWith('data:') ? '' : (form.cover_photo || '')} onChange={set('cover_photo')} placeholder="https://..." />
      </Field>

      <Divider />

      <SectionTitle>💑 Foto do casal (menu)</SectionTitle>
      <p className={styles.hint}>Aparece no menu lateral, dentro do círculo.</p>

      <div className={styles.uploadAreaCircle} onClick={() => coupleRef.current.click()}>
        {form.couple_photo ? (
          <img src={form.couple_photo} alt="Casal" className={styles.uploadPreviewCircle} />
        ) : (
          <div className={styles.uploadPlaceholderCircle}>
            <span>💑</span>
            <p>Toque para escolher</p>
          </div>
        )}
        <input
          ref={coupleRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => handleFileUpload('couple_photo', e.target.files[0])}
        />
      </div>

      {form.couple_photo && (
        <button className={styles.removeBtn} onClick={() => setForm(f => ({ ...f, couple_photo: null }))}>
          🗑 Remover foto
        </button>
      )}

      <Divider />

      <SaveBtn onClick={handleSave} saved={saved} />
    </div>
  )
}
