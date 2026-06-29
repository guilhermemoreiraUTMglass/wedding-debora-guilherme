import { useState, useEffect } from 'react'
import { GiftsProvider } from './context/GiftsContext'
import { ConfigProvider } from './context/ConfigContext'
import { AdminProvider } from './context/AdminContext'
import Navbar from './components/layout/Navbar'
import Hero from './components/layout/Hero'
import MessageSection from './components/layout/MessageSection'
import GiftsSection from './components/layout/GiftsSection'
import AboutSection from './components/layout/AboutSection'
import BottomNav from './components/layout/BottomNav'
import AdminLogin from './components/admin/AdminLogin'
import AdminPanel from './components/admin/AdminPanel'
import './index.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (['home', 'presentes', 'sobre'].includes(id)) setActiveTab(id)
          }
        })
      },
      { threshold: 0.3 }
    )
    setTimeout(() => {
      ;['home', 'presentes', 'sobre'].forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 500)
    return () => observer.disconnect()
  }, [])

  return (
    <ConfigProvider>
      <GiftsProvider>
        <AdminProvider>
          <div style={{
            maxWidth: 480,
            margin: '0 auto',
            position: 'relative',
            minHeight: '100svh',
            background: 'var(--warm-white)',
            boxShadow: '0 0 40px rgba(0,0,0,0.1)'
          }}>
            <Navbar />
            <main>
              <div id="home"><Hero /></div>
              <div id="presentes" style={{ scrollMarginTop: 60 }}>
                <MessageSection />
                <GiftsSection />
              </div>
              <div id="sobre" style={{ scrollMarginTop: 60 }}>
                <AboutSection />
              </div>
            </main>
            <BottomNav active={activeTab} onChange={setActiveTab} />
          </div>

          {/* Admin system — invisível para convidados */}
          <AdminLogin />
          <AdminPanel />
        </AdminProvider>
      </GiftsProvider>
    </ConfigProvider>
  )
}
