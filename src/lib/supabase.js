import { createClient } from '@supabase/supabase-js'

// Credenciais fixas — trocar por variáveis de ambiente em produção
const supabaseUrl = 'https://vwxdlboyyjmxzlamxncf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3eGRsYm95amxteHpsYW14bmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0Mjg3MDgsImV4cCI6MjA5ODAwNDcwOH0.j7lgVfYXL30nhTAlB6pmb558Ej4IiGTfAklMclRR-w8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getGifts() {
  const { data, error } = await supabase
    .from('gifts')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function claimGift(giftId) {
  const { data, error } = await supabase
    .from('gifts')
    .update({ status: 'chosen', chosen_at: new Date().toISOString() })
    .eq('id', giftId)
    .eq('status', 'available')
    .select()
    .single()
  if (error) throw error
  return data
}

export async function addGift(gift) {
  const { data, error } = await supabase
    .from('gifts')
    .insert(gift)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateGift(id, changes) {
  const { data, error } = await supabase
    .from('gifts')
    .update(changes)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteGift(id) {
  const { error } = await supabase
    .from('gifts')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export async function resetGift(id) {
  const { data, error } = await supabase
    .from('gifts')
    .update({ status: 'available', chosen_by: null, chosen_at: null })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getWeddingConfig() {
  const { data, error } = await supabase
    .from('wedding_config')
    .select('*')
    .single()
  if (error) throw error
  return data
}

export async function updateWeddingConfig(id, changes) {
  const { data, error } = await supabase
    .from('wedding_config')
    .update(changes)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}
