import { useState, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { useGifts } from '../../../context/GiftsContext'
import { Field, Input, Textarea, Select, SectionTitle } from '../AdminFields'
import styles from './TabPresentes.module.css'

const CATEGORY_OPTIONS = [
  { value: 'cozinha',     label: '🍳 Cozinha' },
  { value: 'quarto',      label: '🛏️ Quarto' },
  { value: 'sala',        label: '🛋️ Sala' },
  { value: 'decoracao',   label: '🖼️ Decoração' },
  { value: 'eletronicos', label: '📺 Eletrônicos' },
  { value: 'outros',      label: '🎁 Outros' },
]

const EMPTY = { name: '', description: '', category: 'cozinha', emoji: '🎁', image_url: '' }

export default function TabPresentes() {
  const { gifts, addGift, editGift, removeGift, resetGift } = useGifts()
  const [mode, setMode] = useState('list')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileRef = useRef()

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const openAdd = () => { setForm(EMPTY); setImagePreview(null); setMode('add') }
  const openEdit = (gift) => {
    setEditing(gift)
    setForm({ ...gift })
    setImagePreview(gift.image_url || null)
    setMode('edit')
  }

  const handleImageUpload = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
      setForm(f => ({ ...f, image_url: e.target.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!form.name.trim()) return
    if (mode === 'add') {
      addGift({ ...form, status: 'available', id: crypto.randomUUID() })
    } else {
      editGift(editing.id, form)
    }
    setMode('list')
  }

  const handleDelete = (id) => {
    removeGift(id)
    setConfirmDelete(null)
  }

  if (mode === 'add' || mode === 'edit') {
    return (
      <div>
        <div className={styles.formHeader}>
          <button className={styles.backBtn} onClick={() => setMode('list')}><X size={16} /> Cancelar</button>
          <h3 className={styles.formTitle}>{mode === 'add' ? 'Novo Presente' : 'Editar Presente'}</h3>
        </div>

        <Field label="Nome do presente">
          <Input value={form.name} onChange={set('name')} placeholder="Ex: Air Fryer" />
        </Field>

        <Field label="Descrição">
          <Textarea value={form.description} onChange={set('description')} placeholder="Breve descrição..." rows={2} />
        </Field>

        <Field label="Categoria">
          <Select value={form.category} onChange={set('category')} options={CATEGORY_OPTIONS} />
        </Field>

        {/* Upload da galeria */}
        <Field label="Foto do presente">
          <div
            className={styles.uploadArea}
            onClick={() => fileRef.current.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className={styles.uploadPreview} />
            ) : (
              <div className={styles.uploadPlaceholder}>
                <span>📷</span>
                <p>Toque para escolher da galeria</p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => handleImageUpload(e.target.files[0])}
            />
          </div>
          {imagePreview && (
            <button
              className={styles.removeImgBtn}
              onClick={() => { setImagePreview(null); setForm(f => ({ ...f, image_url: '' })) }}
            >
              🗑 Remover foto
            </button>
          )}
        </Field>

        <Field label="Emoji (aparece se não tiver foto)">
          <Input value={form.emoji} onChange={set('emoji')} placeholder="🎁" />
        </Field>

        <button className={styles.saveBtn} onClick={handleSave}>
          <Check size={16} />
          {mode === 'add' ? 'Adicionar Presente' : 'Salvar Alterações'}
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.listHeader}>
        <SectionTitle>🎁 {gifts.length} presentes</SectionTitle>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={16} /> Adicionar</button>
      </div>

      <div className={styles.giftList}>
        {gifts.map(gift => (
          <div key={gift.id} className={`${styles.giftItem} ${gift.status === 'chosen' ? styles.giftChosen : ''}`}>
            <div className={styles.giftEmoji}>
              {gift.image_url
                ? <img src={gift.image_url} alt={gift.name} className={styles.giftThumb} />
                : gift.emoji
              }
            </div>
            <div className={styles.giftInfo}>
              <p className={styles.giftName}>{gift.name}</p>
              <div className={styles.giftMeta}>
                <span className={`${styles.statusBadge} ${gift.status === 'chosen' ? styles.badgeChosen : styles.badgeAvail}`}>
                  {gift.status === 'chosen' ? '✓ Escolhido' : 'Disponível'}
                </span>
              </div>
            </div>
            <div className={styles.giftActions}>
              {gift.status === 'chosen' && (
                <button className={styles.resetBtn} onClick={() => resetGift(gift.id)} title="Marcar como disponível">↩</button>
              )}
              <button className={styles.editBtn} onClick={() => openEdit(gift)}><Pencil size={14} /></button>
              {confirmDelete === gift.id ? (
                <div className={styles.confirmRow}>
                  <button className={styles.confirmYes} onClick={() => handleDelete(gift.id)}>Sim</button>
                  <button className={styles.confirmNo} onClick={() => setConfirmDelete(null)}>Não</button>
                </div>
              ) : (
                <button className={styles.deleteBtn} onClick={() => setConfirmDelete(gift.id)}><Trash2 size={14} /></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
