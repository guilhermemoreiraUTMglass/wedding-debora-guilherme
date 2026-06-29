import { useState } from 'react'
import { X, LogOut } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import TabGeral from './tabs/TabGeral'
import TabCerimonia from './tabs/TabCerimonia'
import TabPresentes from './tabs/TabPresentes'
import TabFotos from './tabs/TabFotos'
import TabHistoria from './tabs/TabHistoria'
import TabFaq from './tabs/TabFaq'
import TabEscolhidos from './tabs/TabEscolhidos'
import styles from './AdminPanel.module.css'

const TABS = [
  { id: 'geral',      label: 'Geral',      icon: '✏️' },
  { id: 'fotos',      label: 'Fotos',      icon: '📷' },
  { id: 'presentes',  label: 'Presentes',  icon: '🎁' },
  { id: 'escolhidos', label: 'Escolhidos', icon: '✅' },
  { id: 'cerimonia',  label: 'Cerimônia',  icon: '📍' },
  { id: 'historia',   label: 'História',   icon: '📖' },
  { id: 'faq',        label: 'FAQ',        icon: '❓' },
]

export default function AdminPanel() {
  const { showAdminModal, setShowAdminModal, logout } = useAdmin()
  const [activeTab, setActiveTab] = useState('geral')

  if (!showAdminModal) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerIcon}>⚙️</span>
            <div>
              <h2 className={styles.headerTitle}>Painel Admin</h2>
              <p className={styles.headerSub}>Edite qualquer coisa do site</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.logoutBtn} onClick={logout}><LogOut size={16} /></button>
            <button className={styles.closeBtn} onClick={() => setShowAdminModal(false)}><X size={20} /></button>
          </div>
        </div>

        <div className={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.body}>
          {activeTab === 'geral'      && <TabGeral />}
          {activeTab === 'fotos'      && <TabFotos />}
          {activeTab === 'presentes'  && <TabPresentes />}
          {activeTab === 'escolhidos' && <TabEscolhidos />}
          {activeTab === 'cerimonia'  && <TabCerimonia />}
          {activeTab === 'historia'   && <TabHistoria />}
          {activeTab === 'faq'        && <TabFaq />}
        </div>
      </div>
    </div>
  )
}
