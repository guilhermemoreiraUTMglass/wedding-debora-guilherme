import { createContext, useContext, useState, useCallback } from 'react'

const AdminContext = createContext(null)

// Senha do admin — ao integrar Supabase, mover para variável de ambiente
const ADMIN_PASSWORD = 'debora2908'

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)

  const login = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      setShowLoginModal(false)
      setShowAdminModal(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    setShowAdminModal(false)
  }, [])

  const openAdmin = useCallback(() => {
    if (isAdmin) {
      setShowAdminModal(true)
    } else {
      setShowLoginModal(true)
    }
  }, [isAdmin])

  return (
    <AdminContext.Provider value={{
      isAdmin,
      showLoginModal, setShowLoginModal,
      showAdminModal, setShowAdminModal,
      login,
      logout,
      openAdmin,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be inside AdminProvider')
  return ctx
}
