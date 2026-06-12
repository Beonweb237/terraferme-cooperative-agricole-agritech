import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Produits', to: '/products' },
  { label: 'Fermes', to: '/farms' },
  { label: 'AgriTech', to: '/agritech' },
  { label: 'Durabilite', to: '/sustainability' },
  { label: 'Cooperative', to: '/cooperative' },
  { label: 'Recettes', to: '/recipes' },
  { label: 'Actualites', to: '/news' },
  { label: 'A Propos', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          height: scrolled ? '64px' : '72px',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #E7E5E4' : '1px solid transparent',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm-6 6c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm12 0c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm-6 4c2.21 0 4 1.79 4 4h-8c0-2.21 1.79-4 4-4z"
                fill={scrolled ? '#166534' : '#FFFFFF'}
              />
            </svg>
            <span
              className="font-display text-xl font-bold transition-colors duration-300"
              style={{ color: scrolled ? '#166534' : '#FFFFFF' }}
            >
              TerraFerme
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-sm font-medium transition-colors duration-200 hover:text-[#166534]"
                style={{
                  color: location.pathname === link.to ? '#D97706' : scrolled ? '#1C1917' : '#FFFFFF',
                }}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D97706] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={24} style={{ color: '#1C1917' }} />
            ) : (
              <Menu size={24} style={{ color: scrolled ? '#1C1917' : '#FFFFFF' }} />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
            <button
              className="absolute top-5 right-5 p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} className="text-neutral-900" />
            </button>
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="py-3 px-4 text-lg font-medium rounded-lg transition-all duration-200"
                  style={{
                    color: location.pathname === link.to ? '#166534' : '#1C1917',
                    background: location.pathname === link.to ? 'rgba(22,101,52,0.08)' : 'transparent',
                    animationDelay: `${i * 0.03}s`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
