import { useState, useEffect } from 'react'
import { Page, NavState, NavigateFn } from '../App'

interface Props {
  nav: NavState
  navigate: NavigateFn
  setLang: (lang: 'en' | 'id') => void
}

export default function Navbar({ nav, navigate, setLang }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [nav.page])

  const isHome = nav.page === 'home'
  const solidBg = scrolled || !isHome
  const textBase = solidBg ? 'text-[#302A26]' : 'text-white'
  const navBg = solidBg
    ? 'bg-[#F5F1E8]/96 backdrop-blur-sm shadow-sm border-b border-[#D8C3A5]/50'
    : 'bg-transparent'

  const navLinks = [
    { label: 'Home', page: 'home' as Page },
    { label: 'About', page: 'about' as Page },
    { label: 'Products', page: 'products' as Page },
    { label: 'News', page: 'news' as Page },
    { label: 'Gallery', page: 'gallery' as Page },
    { label: 'Contact', page: 'contact' as Page },
  ]

  const companyLinks = [
    { label: 'Company Profile', page: 'company' as Page },
    { label: 'Export Experience', page: 'export' as Page },
    { label: 'Awards & Achievements', page: 'awards' as Page },
    { label: 'Exhibitions', page: 'exhibitions' as Page },
    { label: 'Training & Activities', page: 'training' as Page },
  ]

  const isCompanyActive = ['company', 'export', 'awards', 'exhibitions', 'training'].includes(nav.page)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <button onClick={() => navigate('home')} className="flex flex-col items-start leading-none">
          <span className={`font-display font-bold text-[17px] tracking-wide transition-colors ${textBase}`}>
            PARJONO
          </span>
          <span className={`font-display text-[11px] tracking-[0.2em] transition-colors ${textBase} opacity-70`}>
            KERAMIK JAYA
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-[#A65F46] ${
                nav.page === link.page ? 'text-[#A65F46]' : textBase
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
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-[#A65F46] flex items-center gap-1 ${
                isCompanyActive ? 'text-[#A65F46]' : textBase
              }`}
            >
              Company
              <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-[#D8C3A5]/30 py-2 transition-all duration-200 ${
              companyOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
                <div className="w-3 h-3 bg-white border-l border-t border-[#D8C3A5]/30 rotate-45 translate-y-1 mx-auto" />
              </div>
              {companyLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => { navigate(link.page); setCompanyOpen(false) }}
                  className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors hover:bg-[#F5F1E8] hover:text-[#A65F46] ${
                    nav.page === link.page ? 'text-[#A65F46] bg-[#F5F1E8]' : 'text-[#302A26]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-5">
          <div className={`flex items-center gap-1.5 text-[12px] font-medium ${textBase}`}>
            <button
              onClick={() => setLang('en')}
              className={`transition-colors ${nav.lang === 'en' ? 'text-[#A65F46]' : 'opacity-50 hover:opacity-80'}`}
            >EN</button>
            <span className="opacity-30">/</span>
            <button
              onClick={() => setLang('id')}
              className={`transition-colors ${nav.lang === 'id' ? 'text-[#A65F46]' : 'opacity-50 hover:opacity-80'}`}
            >ID</button>
          </div>
          <button
            onClick={() => navigate('admin-login')}
            className={`text-[12px] font-medium transition-colors hover:text-[#A65F46] flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-current/20 hover:border-[#A65F46] ${textBase}`}
            title="Akses Admin Dashboard"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Admin</span>
          </button>
          <button
            onClick={() => navigate('contact')}
            className="bg-[#A65F46] text-white text-[13px] font-medium px-5 py-2.5 rounded-lg hover:bg-[#8f5239] transition-colors duration-200"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-md transition-colors ${textBase}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div className="bg-[#F5F1E8] border-t border-[#D8C3A5]/40 px-6 py-4">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`block w-full text-left py-3.5 text-[14px] font-medium border-b border-[#D8C3A5]/30 transition-colors ${
                nav.page === link.page ? 'text-[#A65F46]' : 'text-[#302A26] hover:text-[#A65F46]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="py-2">
            <p className="text-[11px] text-[#7A8065] font-medium uppercase tracking-widest pt-2 pb-1">Company</p>
            {companyLinks.map(link => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`block w-full text-left py-2.5 text-[14px] font-medium pl-3 border-b border-[#D8C3A5]/20 transition-colors ${
                  nav.page === link.page ? 'text-[#A65F46]' : 'text-[#302A26] hover:text-[#A65F46]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-[13px] text-[#302A26]">
              <span className="text-[11px] text-[#7A8065] font-medium uppercase tracking-widest">Language:</span>
              <button onClick={() => setLang('en')} className={`font-medium transition-colors ${nav.lang === 'en' ? 'text-[#A65F46]' : 'opacity-50'}`}>EN</button>
              <span className="opacity-30">/</span>
              <button onClick={() => setLang('id')} className={`font-medium transition-colors ${nav.lang === 'id' ? 'text-[#A65F46]' : 'opacity-50'}`}>ID</button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('admin-login')}
                className="border border-[#A65F46] text-[#A65F46] text-[13px] font-medium px-4 py-2.5 rounded-lg hover:bg-[#A65F46] hover:text-white transition-colors"
              >
                Admin CMS
              </button>
              <button
                onClick={() => navigate('contact')}
                className="bg-[#A65F46] text-white text-[13px] font-medium px-4 py-2.5 rounded-lg hover:bg-[#8f5239] transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
