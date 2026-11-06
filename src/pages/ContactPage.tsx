import { useState } from 'react'
import { NavigateFn } from '../App'
import { useAppStore, formatWhatsAppLink } from '../context/AppContext'
import { MapPin, ExternalLink } from 'lucide-react'

interface Props {
  navigate: NavigateFn
}

export default function ContactPage({ navigate }: Props) {
  const { addInquiry, t, lang, companyInfo } = useAppStore()

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = lang === 'id' ? 'Nama wajib diisi' : 'Name is required'
    if (!form.email.trim()) e.email = lang === 'id' ? 'Email wajib diisi' : 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = lang === 'id' ? 'Format email tidak valid' : 'Enter a valid email'
    if (!form.message.trim()) e.message = lang === 'id' ? 'Pesan wajib diisi' : 'Message is required'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      addInquiry({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        subject: form.subject || (lang === 'id' ? 'Pesan dari Kontak Website' : 'Website Inquiry'),
        message: form.message,
      })
      setSubmitted(true)
    }
  }

  const contactInfo = [
    {
      label: lang === 'id' ? 'Alamat Workshop' : 'Address',
      value: `${companyInfo.addressLine1}\n${companyInfo.addressLine2}`,
      link: companyInfo.googleMapsUrl || undefined,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      label: t.footer.phone,
      value: companyInfo.phone,
      link: `tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      label: t.footer.whatsapp,
      value: companyInfo.whatsapp,
      link: formatWhatsAppLink(
        companyInfo.whatsapp,
        lang === 'id'
          ? 'Halo Parjono Keramik Jaya, saya ingin berkonsultasi seputar produk.'
          : 'Hello Parjono Keramik Jaya, I would like to inquire about your products.'
      ),
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      label: t.footer.email,
      value: companyInfo.email,
      link: `mailto:${companyInfo.email}`,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ]

  const addressQuery = `${companyInfo.addressLine1}, ${companyInfo.addressLine2}`
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(addressQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  const googleMapsRedirectUrl =
    companyInfo.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(addressQuery)}`

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
            {t.contact.tag}
          </p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">
            {t.contact.title}
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <div>
            <h2 className="font-display text-[36px] font-bold text-[#302A26] mb-3">
              {t.contact.infoTitle}
            </h2>
            <p className="text-[#302A26]/60 leading-relaxed mb-10">
              {lang === 'id'
                ? 'Baik Anda pembeli retail, grosir, desainer interior, atau mitra eksportir mancanegara, kami siap melayani kebutuhan gerabah dan terakota Anda.'
                : "Whether you're a buyer, distributor, retailer, or simply interested in our products, we'd love to hear from you. Our team is ready to respond to your inquiry."}
            </p>

            <div className="space-y-6 mb-10">
              {contactInfo.map(info => (
                <div key={info.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#A65F46]/10 flex items-center justify-center flex-shrink-0 text-[#A65F46]">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[#302A26]/50 text-[12px] font-medium uppercase tracking-widest mb-1">
                      {info.label}
                    </p>
                    {info.link ? (
                      <a
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-[#302A26] text-[14px] leading-relaxed whitespace-pre-line hover:text-[#A65F46] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-[#302A26] text-[14px] leading-relaxed whitespace-pre-line">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-[#302A26]/50 text-[12px] font-medium uppercase tracking-widest mb-3">
                {lang === 'id' ? 'Media Sosial' : 'Follow Us'}
              </p>
              <div className="flex gap-3">
                {companyInfo.instagram && (
                  <a
                    href={companyInfo.instagram.startsWith('http') ? companyInfo.instagram : `https://instagram.com/${companyInfo.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full border border-[#D8C3A5] flex items-center justify-center text-[#302A26]/50 hover:border-[#A65F46] hover:text-[#A65F46] transition-colors"
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
                    className="w-10 h-10 rounded-full border border-[#D8C3A5] flex items-center justify-center text-[#302A26]/50 hover:border-[#A65F46] hover:text-[#A65F46] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Mini Map Card */}
            <div className="mt-8 pt-8 border-t border-[#D8C3A5]/40">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#302A26]/60 text-[12px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A65F46]" />
                  {lang === 'id' ? 'Peta Lokasi Workshop' : 'Workshop Location Map'}
                </p>
                <a
                  href={googleMapsRedirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#A65F46] hover:text-[#8f5239] transition-colors"
                >
                  <span>{lang === 'id' ? 'Buka Google Maps' : 'Open Google Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Interactive Card */}
              <div className="relative group rounded-2xl overflow-hidden border border-[#D8C3A5]/60 shadow-sm hover:shadow-md transition-all duration-300 bg-stone-100">
                {/* Embed Map iframe */}
                <iframe
                  title="Peta Lokasi Parjono Keramik Jaya"
                  src={mapEmbedUrl}
                  className="w-full h-52 sm:h-60 border-0 pointer-events-none group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />

                {/* Clickable Overlay Link to Google Maps */}
                <a
                  href={googleMapsRedirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-transparent flex flex-col justify-between p-3.5 group-hover:bg-[#302A26]/10 transition-colors"
                  aria-label="Buka lokasi workshop di Google Maps"
                >
                  {/* Top Floating Badge */}
                  <div className="self-end bg-white/95 backdrop-blur-xs text-[#302A26] px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 border border-stone-200/60 group-hover:bg-[#A65F46] group-hover:text-white group-hover:border-[#A65F46] transition-all">
                    <span>{lang === 'id' ? 'Petunjuk Arah' : 'Get Directions'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Location Pill */}
                  <div className="bg-white/95 backdrop-blur-xs text-[#302A26] p-2.5 rounded-xl shadow-sm border border-stone-200/60 max-w-sm group-hover:border-[#A65F46]/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#A65F46] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-xs text-[#302A26] truncate">
                          {companyInfo.name || "PARJONO KERAMIK JAYA"}
                        </p>
                        <p className="text-[11px] text-stone-500 truncate">
                          {companyInfo.addressLine1}, {companyInfo.addressLine2}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <p className="text-[11px] text-[#302A26]/50 mt-2 flex items-center gap-1">
                <span>📍</span>
                <span>
                  {lang === 'id'
                    ? 'Klik area peta untuk membuka rute navigasi langsung di Google Maps.'
                    : 'Click anywhere on the map to get turn-by-turn directions on Google Maps.'}
                </span>
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#D8C3A5]/40">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#A65F46]/10 rounded-full flex items-center justify-center mx-auto mb-5 text-[#A65F46]">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-[24px] font-bold text-[#302A26] mb-3">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-[#302A26]/60 mb-6 leading-relaxed">
                    {t.contact.successDesc}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setForm({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                      })
                    }}
                    className="bg-[#A65F46] text-white px-6 py-2.5 rounded-xl text-[14px] font-medium hover:bg-[#8f5239] transition-colors"
                  >
                    {t.contact.sendAnotherBtn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-display text-[24px] font-bold text-[#302A26] mb-2">
                    {t.contact.formTitle}
                  </h2>
                  <p className="text-xs text-[#302A26]/50 mb-6">{t.contact.formSubtitle}</p>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                      {t.contact.nameLabel} *
                    </label>
                    <input
                      type="text"
                      placeholder={t.contact.namePlaceholder}
                      value={form.name}
                      onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-2.5 border rounded-xl text-xs text-[#302A26] focus:outline-none transition-colors ${
                        errors.name ? 'border-red-400' : 'border-[#D8C3A5] focus:border-[#A65F46]'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                      {t.contact.companyLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={t.contact.companyPlaceholder}
                      value={form.company}
                      onChange={e => setForm(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                        {t.contact.emailLabel} *
                      </label>
                      <input
                        type="email"
                        placeholder={t.contact.emailPlaceholder}
                        value={form.email}
                        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                        className={`w-full px-4 py-2.5 border rounded-xl text-xs text-[#302A26] focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-400'
                            : 'border-[#D8C3A5] focus:border-[#A65F46]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                        {t.contact.phoneLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={t.contact.phonePlaceholder}
                        value={form.phone}
                        onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                      {t.contact.subjectLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={t.contact.subjectPlaceholder}
                      value={form.subject}
                      onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                      {t.contact.messageLabel} *
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t.contact.messagePlaceholder}
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      className={`w-full px-4 py-2.5 border rounded-xl text-xs text-[#302A26] focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? 'border-red-400'
                          : 'border-[#D8C3A5] focus:border-[#A65F46]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-[11px] mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#A65F46] text-white font-semibold py-3.5 rounded-xl hover:bg-[#8f5239] transition-colors text-xs shadow-xs"
                  >
                    {t.contact.sendBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
