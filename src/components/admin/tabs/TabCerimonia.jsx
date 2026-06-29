import { useState } from 'react'
import { useConfig } from '../../../context/ConfigContext'
import { Field, Input, SaveBtn, SectionTitle } from '../AdminFields'

export default function TabCerimonia() {
  const { config, updateConfig } = useConfig()
  const [form, setForm] = useState({ ...config })
  const [saved, setSaved] = useState(false)

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = () => {
    updateConfig(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <SectionTitle>📍 Local e horário</SectionTitle>

      <Field label="Nome do local">
        <Input value={form.venue_name} onChange={set('venue_name')} placeholder="Ex: Espaço Villa Verde" />
      </Field>

      <Field label="Endereço completo">
        <Input value={form.venue_address} onChange={set('venue_address')} placeholder="Rua, número, cidade..." />
      </Field>

      <Field label="Horário da cerimônia">
        <Input value={form.ceremony_time} onChange={set('ceremony_time')} placeholder="Ex: 18h00" />
      </Field>

      <Field label="Horário da recepção (entrada dos convidados)">
        <Input value={form.reception_time} onChange={set('reception_time')} placeholder="Ex: 17h30" />
      </Field>

      <SaveBtn onClick={handleSave} saved={saved} />
    </div>
  )
}
