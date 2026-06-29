import { useState } from 'react'
import { useConfig } from '../../../context/ConfigContext'
import { Field, Input, Textarea, SectionTitle } from '../AdminFields'
import styles from '../AdminFields.module.css'

export default function TabGeral() {
  const { config, updateConfig } = useConfig()
  const [form, setForm] = useState({ ...config })
  const [status, setStatus] = useState(null) // null | 'saving' | 'ok' | 'error'

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = async () => {
    setStatus('saving')
    const ok = await updateConfig(form)
    setStatus(ok ? 'ok' : 'error')
    setTimeout(() => setStatus(null), 3000)
  }

  return (
    <div>
      <SectionTitle>💍 Os Noivos</SectionTitle>

      <Field label="Nome da Noiva" hint="Aparece primeiro no site">
        <Input value={form.bride} onChange={set('bride')} placeholder="Nome da noiva" />
      </Field>
      <Field label="Nome do Noivo">
        <Input value={form.groom} onChange={set('groom')} placeholder="Nome do noivo" />
      </Field>
      <Field label="Data do Casamento">
        <Input value={form.date} onChange={set('date')} type="datetime-local" />
      </Field>
      <Field label="Data por extenso" hint="Ex: 29 de Agosto de 2025">
        <Input value={form.date_display} onChange={set('date_display')} placeholder="29 de Agosto de 2025" />
      </Field>
      <Field label="WhatsApp" hint="Somente números com DDI. Ex: 5511999999999">
        <Input value={form.whatsapp_number} onChange={set('whatsapp_number')} placeholder="5511999999999" />
      </Field>
      <Field label="Mensagem para os convidados">
        <Textarea value={form.message} onChange={set('message')} placeholder="Sua mensagem especial..." rows={4} />
      </Field>
      <Field label="Versículo bíblico">
        <Input value={form.bible_verse} onChange={set('bible_verse')} placeholder="Versículo..." />
      </Field>
      <Field label="Referência do versículo">
        <Input value={form.bible_ref} onChange={set('bible_ref')} placeholder="Ex: Mateus 19:6" />
      </Field>

      <button
        className={`${styles.saveBtn} ${status === 'ok' ? styles.saveBtnSaved : ''} ${status === 'error' ? styles.saveBtnError : ''}`}
        onClick={handleSave}
        disabled={status === 'saving'}
      >
        {status === 'saving' ? 'Salvando...' : status === 'ok' ? '✓ Salvo com sucesso!' : status === 'error' ? '✗ Erro ao salvar' : 'Salvar alterações'}
      </button>
    </div>
  )
}
