import { useState } from 'react'
import { NavigateFn } from '../App'
import { useAppStore } from '../context/AppContext'

interface Props { navigate: NavigateFn }

export default function ContactPage({ navigate }: Props) {
  const { addInquiry } = useAppStore()
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
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
        subject: form.subject || 'Pesan dari Kontak Website',
        message: form.message,
      })
      setSubmitted(true)
    }
  }

  const contactInfo = [
    {
      label: 'Address',
      value: 'Klisat, Srihardono, Pundong,\nBantul, Yogyakarta, Indonesia',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: 'Phone',
      value: '[Phone Number]',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      value: '[WhatsApp Number]',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      value: '[Email Address]',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Get in Touch</p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Talk to us about our products, custom opportunities, or potential business partnerships.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <div>
            <h2 className="font-display text-[36px] font-bold text-[#302A26] mb-3">Let's Work Together</h2>
            <p className="text-[#302A26]/60 leading-relaxed mb-10">
              Whether you're a buyer, distributor, retailer, or simply interested in our products, we'd love to hear from you. Our team is ready to respond to your inquiry.
            </p>

            <div className="space-y-6 mb-10">
              {contactInfo.map(info => (
                <div key={info.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#A65F46]/10 flex items-center justify-center flex-shrink-0 text-[#A65F46]">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[#302A26]/50 text-[12px] font-medium uppercase tracking-widest mb-1">{info.label}</p>
                    <p className="text-[#302A26] text-[14px] leading-relaxed whitespace-pre-line">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-[#302A26]/50 text-[12px] font-medium uppercase tracking-widest mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full border border-[#D8C3A5] flex items-center justify-center text-[#302A26]/50 hover:border-[#A65F46] hover:text-[#A65F46] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#D8C3A5] flex items-center justify-center text-[#302A26]/50 hover:border-[#A65F46] hover:text-[#A65F46] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-10 rounded-2xl overflow-hidden aspect-video bg-[#D8C3A5] flex items-center justify-center">
              <div className="text-center">
                <svg className="w-10 h-10 text-[#302A26]/30 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-[#302A26]/40 text-[13px]">Klisat, Srihardono, Pundong, Bantul</p>
                <p className="text-[#302A26]/30 text-[12px]">Yogyakarta, Indonesia</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#A65F46]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-[#A65F46]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-[24px] font-bold text-[#302A26] mb-3">Message Sent!</h3>
                  <p className="text-[#302A26]/60 mb-6 leading-relaxed">
                    Thank you for reaching out. We will respond to your message as soon as possible.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' }) }}
                    className="bg-[#A65F46] text-white px-6 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#8f5239] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-display text-[24px] font-bold text-[#302A26] mb-6">Send a Message</h2>
                  {[
                    { key: 'name', label: 'Name *', type: 'text', required: true, placeholder: 'Your full name' },
                    { key: 'company', label: 'Company', type: 'text', required: false, placeholder: 'Company name (optional)' },
                    { key: 'email', label: 'Email *', type: 'email', required: true, placeholder: 'your@email.com' },
                    { key: 'phone', label: 'Phone / WhatsApp', type: 'text', required: false, placeholder: '+62 ...' },
                    { key: 'subject', label: 'Subject', type: 'text', required: false, placeholder: 'How can we help?' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-[13px] font-medium text-[#302A26] mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        required={f.required}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className={`w-full px-4 py-3 border rounded-lg text-[14px] text-[#302A26] placeholder-[#302A26]/30 focus:outline-none transition-colors ${
                          errors[f.key as keyof typeof errors] ? 'border-red-400' : 'border-[#D8C3A5] focus:border-[#A65F46]'
                        }`}
                      />
                      {errors[f.key as keyof typeof errors] && (
                        <p className="text-red-500 text-[12px] mt-1">{errors[f.key as keyof typeof errors]}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label className="block text-[13px] font-medium text-[#302A26] mb-1.5">Message *</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your inquiry..."
                      required
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg text-[14px] text-[#302A26] placeholder-[#302A26]/30 focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-red-400' : 'border-[#D8C3A5] focus:border-[#A65F46]'
                      }`}
                    />
                    {errors.message && <p className="text-red-500 text-[12px] mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#A65F46] text-white font-semibold py-4 rounded-lg hover:bg-[#8f5239] transition-colors text-[15px]"
                  >
                    Send Message
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
