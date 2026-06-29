import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { useConfig } from '../../../context/ConfigContext'
import { Field, Input, Textarea, SectionTitle } from '../AdminFields'
import styles from './TabHistoria.module.css'

const EMPTY = { q: '', a: '' }

export default function TabFaq() {
  const { faqs, updateFaqs } = useConfig()
  const [mode, setMode] = useState('list')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const openAdd = () => { setForm(EMPTY); setMode('add') }
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setMode('edit') }

  const handleSave = () => {
    if (!form.q.trim()) return
    if (mode === 'add') {
      updateFaqs([...faqs, { ...form, id: Date.now() }])
    } else {
      updateFaqs(faqs.map(f => f.id === editing.id ? { ...f, ...form } : f))
    }
    setMode('list')
  }

  const handleDelete = (id) => {
    updateFaqs(faqs.filter(f => f.id !== id))
    setConfirmDelete(null)
  }

  if (mode === 'add' || mode === 'edit') {
    return (
      <div>
        <div className={styles.formHeader}>
          <button className={styles.backBtn} onClick={() => setMode('list')}><X size={16} /> Cancelar</button>
          <h3 className={styles.formTitle}>{mode === 'add' ? 'Nova pergunta' : 'Editar pergunta'}</h3>
        </div>
        <Field label="Pergunta"><Input value={form.q} onChange={set('q')} placeholder="Ex: Como funciona a lista?" /></Field>
        <Field label="Resposta"><Textarea value={form.a} onChange={set('a')} placeholder="Resposta..." rows={3} /></Field>
        <button className={styles.saveBtn} onClick={handleSave}><Check size={16} /> Salvar</button>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.listHeader}>
        <SectionTitle>❓ Perguntas Frequentes</SectionTitle>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={16} /> Adicionar</button>
      </div>
      <div className={styles.list}>
        {faqs.map(item => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <p className={styles.itemTitle}>{item.q}</p>
              <p className={styles.itemDesc}>{item.a}</p>
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
