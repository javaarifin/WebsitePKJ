import { useState, useEffect } from 'react'
import { Page, NavState, NavigateFn } from '../App'
import { useAppStore } from '../context/AppContext'
import { PKJ_LOGO } from '../assets/logo'

interface Props {
  nav: NavState
  navigate: NavigateFn
  setLang?: (lang: 'en' | 'id') => void
}

export default function Navbar({ nav, navigate }: Props) {
  const { lang, setLang, t, isAuthenticated } = useAppStore()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [nav.page])

  const isHome = nav.page === 'home'
  const solidBg = scrolled || !isHome
  const textBase = solidBg ? 'text-[#302A26]' : 'text-white'
  const navBg = solidBg
    ? 'bg-[#F5F1E8]/96 backdrop-blur-sm shadow-sm border-b border-[#D8C3A5]/50'
    : 'bg-transparent'

  const navLinks = [
    { label: t.nav.home, page: 'home' as Page },
    { label: t.nav.about, page: 'about' as Page },
    { label: t.nav.products, page: 'products' as Page },
    { label: t.nav.news, page: 'news' as Page },
    { label: t.nav.gallery, page: 'gallery' as Page },
    { label: t.nav.contact, page: 'contact' as Page },
  ]

  const companyLinks = [
    { label: t.nav.companyProfile, page: 'company' as Page },
    { label: t.nav.exportExperience, page: 'export' as Page },
    { label: t.nav.awards, page: 'awards' as Page },
    { label: t.nav.exhibitions, page: 'exhibitions' as Page },
    { label: t.nav.training, page: 'training' as Page },
  ]

  const isCompanyActive = ['company', 'export', 'awards', 'exhibitions', 'training'].includes(
    nav.page,
  )

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="bg-white p-1.5 md:p-2 rounded-xl shadow-xs border border-stone-200/80 group-hover:scale-105 transition-transform flex items-center justify-center">
            <img
              src={PKJ_LOGO}
              alt="PARJONO KERAMIK JAYA"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </div>
          <div className="hidden sm:flex flex-col items-start leading-none">
            <span
              className={`font-display font-bold text-[16px] tracking-wide transition-colors ${textBase}`}
            >
              PARJONO
            </span>
            <span
              className={`font-display text-[10px] tracking-[0.2em] transition-colors ${textBase} opacity-70 mt-0.5`}
            >
              KERAMIK JAYA
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-[#A65F46] ${
                nav.page === link.page ? 'text-[#A65F46] font-semibold' : textBase
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Company dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              onClick={() => setCompanyOpen(prev => !prev)}
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-[#A65F46] flex items-center gap-1 py-2 ${
                isCompanyActive ? 'text-[#A65F46] font-semibold' : textBase
              }`}
            >
              <span>{t.nav.company}</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Bridge container to prevent accidental hover disappearance */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2.5 transition-all duration-200 z-50 ${
                companyOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="w-56 bg-white rounded-2xl shadow-xl border border-[#D8C3A5]/40 py-2 relative">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-[#D8C3A5]/40 rotate-45" />
                {companyLinks.map(link => (
                  <button
                    key={link.page}
                    onClick={() => {
                      navigate(link.page)
                      setCompanyOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors hover:bg-[#F5F1E8] hover:text-[#A65F46] ${
                      nav.page === link.page ? 'text-[#A65F46] bg-[#F5F1E8] font-semibold' : 'text-[#302A26]'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Right side: Language Toggle & Actions */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Language Switcher EN / ID */}
          <div
            className={`flex items-center gap-1.5 text-[12px] font-medium bg-black/5 dark:bg-white/10 px-2.5 py-1.5 rounded-full border border-current/15 ${textBase}`}
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`transition-all px-1.5 py-0.5 rounded ${
                lang === 'en'
                  ? 'text-[#A65F46] font-bold bg-white/70 shadow-xs'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              EN
            </button>
            <span className="opacity-30">/</span>
            <button
              type="button"
              onClick={() => setLang('id')}
              className={`transition-all px-1.5 py-0.5 rounded ${
                lang === 'id'
                  ? 'text-[#A65F46] font-bold bg-white/70 shadow-xs'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              ID
            </button>
          </div>

          {isAuthenticated && (
            <button
              onClick={() => navigate('admin-dashboard')}
              className={`text-[12px] font-medium transition-colors hover:text-[#A65F46] flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-current/20 hover:border-[#A65F46] ${textBase}`}
              title="Kembali ke Admin Dashboard"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Dashboard</span>
            </button>
          )}

          <button
            onClick={() => navigate('contact')}
            className="bg-[#A65F46] text-white text-[13px] font-medium px-5 py-2.5 rounded-lg hover:bg-[#8f5239] transition-colors duration-200 shadow-xs"
          >
            {t.nav.contactUs}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-md transition-colors ${textBase}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        <div className="bg-[#F5F1E8] border-t border-[#D8C3A5]/40 px-6 py-4 shadow-xl">
          <div className="flex items-center gap-3 pb-3 mb-2 border-b border-[#D8C3A5]/40">
            <div className="bg-white p-1.5 rounded-xl shadow-xs border border-stone-200">
              <img
                src={PKJ_LOGO}
                alt="PARJONO KERAMIK JAYA"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm text-[#302A26]">PARJONO</span>
              <span className="text-[10px] text-[#A65F46] font-semibold tracking-wider">
                KERAMIK JAYA
              </span>
            </div>
          </div>
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`block w-full text-left py-3.5 text-[14px] font-medium border-b border-[#D8C3A5]/30 transition-colors ${
                nav.page === link.page ? 'text-[#A65F46] font-semibold' : 'text-[#302A26] hover:text-[#A65F46]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="py-2">
            <p className="text-[11px] text-[#7A8065] font-semibold uppercase tracking-widest pt-2 pb-1">
              {t.nav.company}
            </p>
            {companyLinks.map(link => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`block w-full text-left py-2.5 text-[14px] font-medium pl-3 border-b border-[#D8C3A5]/20 transition-colors ${
                  nav.page === link.page ? 'text-[#A65F46] font-semibold' : 'text-[#302A26] hover:text-[#A65F46]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            {/* Mobile Language Toggle */}
            <div className="flex items-center gap-2 text-[13px] text-[#302A26]">
              <span className="text-[11px] text-[#7A8065] font-semibold uppercase tracking-widest">
                {t.nav.language}:
              </span>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  lang === 'en'
                    ? 'text-[#A65F46] font-bold bg-white border border-[#A65F46]/30'
                    : 'opacity-60'
                }`}
              >
                EN
              </button>
              <span className="opacity-30">/</span>
              <button
                onClick={() => setLang('id')}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  lang === 'id'
                    ? 'text-[#A65F46] font-bold bg-white border border-[#A65F46]/30'
                    : 'opacity-60'
                }`}
              >
                ID
              </button>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={() => navigate('admin-dashboard')}
                  className="border border-[#A65F46] text-[#A65F46] text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-[#A65F46] hover:text-white transition-colors"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={() => navigate('contact')}
                className="bg-[#A65F46] text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-[#8f5239] transition-colors"
              >
                {t.nav.contactUs}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
