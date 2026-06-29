import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { useConfig } from '../../../context/ConfigContext'
import { Field, Input, Textarea, SectionTitle } from '../AdminFields'
import styles from './TabHistoria.module.css'

const EMPTY = { year: '', title: '', desc: '' }

export default function TabHistoria() {
  const { story, updateStory } = useConfig()
  const [mode, setMode] = useState('list')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const openAdd = () => { setForm(EMPTY); setMode('add') }
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setMode('edit') }

  const handleSave = () => {
    if (!form.title.trim()) return
    if (mode === 'add') {
      updateStory([...story, { ...form, id: Date.now() }])
    } else {
      updateStory(story.map(s => s.id === editing.id ? { ...s, ...form } : s))
    }
    setMode('list')
  }

  const handleDelete = (id) => {
    updateStory(story.filter(s => s.id !== id))
    setConfirmDelete(null)
  }

  if (mode === 'add' || mode === 'edit') {
    return (
      <div>
        <div className={styles.formHeader}>
          <button className={styles.backBtn} onClick={() => setMode('list')}><X size={16} /> Cancelar</button>
          <h3 className={styles.formTitle}>{mode === 'add' ? 'Novo evento' : 'Editar evento'}</h3>
        </div>
        <Field label="Ano"><Input value={form.year} onChange={set('year')} placeholder="Ex: 2022" /></Field>
        <Field label="Título"><Input value={form.title} onChange={set('title')} placeholder="Ex: O primeiro encontro" /></Field>
        <Field label="Descrição"><Textarea value={form.desc} onChange={set('desc')} placeholder="Conte o que aconteceu..." rows={3} /></Field>
        <button className={styles.saveBtn} onClick={handleSave}><Check size={16} /> Salvar</button>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.listHeader}>
        <SectionTitle>📖 Nossa História</SectionTitle>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={16} /> Adicionar</button>
      </div>
      <div className={styles.list}>
        {story.map(item => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemYear}>{item.year}</div>
            <div className={styles.itemInfo}>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemDesc}>{item.desc}</p>
            </div>
            <div className={styles.itemActions}>
              <button className={styles.editBtn} onClick={() => openEdit(item)}><Pencil size={14} /></button>
              {confirmDelete === item.id ? (
                <div className={styles.confirmRow}>
                  <button className={styles.confirmYes} onClick={() => handleDelete(item.id)}>Sim</button>
                  <button className={styles.confirmNo} onClick={() => setConfirmDelete(null)}>Não</button>
                </div>
              ) : (
                <button className={styles.deleteBtn} onClick={() => setConfirmDelete(item.id)}><Trash2 size={14} /></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
