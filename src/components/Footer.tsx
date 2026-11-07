import { NavigateFn, Page } from '../App'
import { useAppStore, formatWhatsAppLink } from '../context/AppContext'
import { PKJ_LOGO } from '../assets/logo'

interface Props {
  navigate: NavigateFn
}

export default function Footer({ navigate }: Props) {
  const { t, companyInfo } = useAppStore()

  const navLinks: { label: string; page: Page }[] = [
    { label: t.nav.about, page: 'about' },
    { label: t.nav.products, page: 'products' },
    { label: t.nav.company, page: 'company' },
    { label: t.nav.news, page: 'news' },
    { label: t.nav.gallery, page: 'gallery' },
    { label: t.nav.contact, page: 'contact' },
  ]

  const companyLinks: { label: string; page: Page }[] = [
    { label: t.nav.companyProfile, page: 'company' },
    { label: t.nav.exportExperience, page: 'export' },
    { label: t.nav.awards, page: 'awards' },
    { label: t.nav.exhibitions, page: 'exhibitions' },
    { label: t.nav.training, page: 'training' },
  ]

  return (
    <footer style={{ backgroundColor: '#302A26' }} className="text-white/70">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <button onClick={() => navigate('home')} className="mb-5 block text-left group">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-md border border-stone-200/50 group-hover:scale-105 transition-transform mb-3">
              <img
                src={PKJ_LOGO}
                alt="PARJONO KERAMIK JAYA"
                className="h-11 w-auto object-contain"
              />
            </div>
            <div className="font-display font-bold text-base text-white tracking-wide">
              PARJONO KERAMIK JAYA
            </div>
          </button>
          <p className="text-sm leading-relaxed text-white/55 mb-5">{companyInfo.tagline || t.footer.tagline}</p>
          <div className="flex gap-3">
            {companyInfo.instagram && (
              <a
                href={companyInfo.instagram.startsWith('http') ? companyInfo.instagram : `https://instagram.com/${companyInfo.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#A65F46] hover:text-[#A65F46] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
            {companyInfo.facebook && (
              <a
                href={companyInfo.facebook.startsWith('http') ? companyInfo.facebook : `https://facebook.com/${encodeURIComponent(companyInfo.facebook)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#A65F46] hover:text-[#A65F46] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">
            {t.footer.navigation}
          </h4>
          <ul className="space-y-3">
            {navLinks.map(link => (
              <li key={link.page}>
                <button
                  onClick={() => navigate(link.page)}
                  className="text-[13px] text-white/55 hover:text-[#A65F46] transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">
            {t.footer.contact}
          </h4>
          <ul className="space-y-3 text-[13px] text-white/55">
            <li className="leading-relaxed">
              {companyInfo.addressLine1}
              {companyInfo.addressLine2 && (
                <>
                  <br />
                  {companyInfo.addressLine2}
                </>
              )}
            </li>
            <li>
              {t.footer.phone}:{" "}
              <a href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                {companyInfo.phone}
              </a>
            </li>
            <li>
              {t.footer.whatsapp}:{" "}
              <a
                href={formatWhatsAppLink(companyInfo.whatsapp, "Halo Parjono Keramik Jaya, saya ingin bertanya seputar produk.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {companyInfo.whatsapp}
              </a>
            </li>
            <li>
              {t.footer.email}:{" "}
              <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                {companyInfo.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Company links */}
        <div>
          <h4 className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">
            {t.footer.company}
          </h4>
          <ul className="space-y-3">
            {companyLinks.map(link => (
              <li key={link.page}>
                <button
                  onClick={() => navigate(link.page)}
                  className="text-[13px] text-white/55 hover:text-[#A65F46] transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-[12px] text-white/35">{t.footer.rights}</p>
          <div className="flex items-center gap-3 text-[12px] text-white/30">
            <span>{t.footer.madeIn}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
