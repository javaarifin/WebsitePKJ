import { useState } from 'react'
import { NavigateFn } from '../App'
import { useAppStore, formatWhatsAppLink } from '../context/AppContext'

interface Props {
  navigate: NavigateFn
  productId?: number
}

export default function ProductDetailPage({ navigate, productId }: Props) {
  const { products, addInquiry, t, lang, companyInfo } = useAppStore()
  const liveProducts = products.filter(p => p.status !== 'draft')

  const product =
    liveProducts.find(p => p.id === productId) || liveProducts[0] || products[0]

  const related = liveProducts
    .filter(p => product && p.id !== product.id && p.category === product.category)
    .slice(0, 3)
    .concat(
      liveProducts.filter(p => product && p.id !== product.id && p.category !== product.category),
    )
    .slice(0, 3)

  const [showInquiry, setShowInquiry] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    country: '',
    phone: '',
    quantity: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    addInquiry({
      name: form.name,
      company: form.company,
      email: form.email,
      country: form.country,
      phone: form.phone,
      quantity: form.quantity,
      subject: `Inquiry for ${product.name}`,
      productName: product.name,
      message: form.message || `Interested in ${product.name} (Qty: ${form.quantity || 'N/A'})`,
    })

    setSubmitted(true)
  }

  if (!product) {
    return (
      <div className="pt-36 pb-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold font-display mb-3 text-[#302A26]">
          {lang === 'id' ? 'Produk Tidak Ditemukan' : 'Product Not Found'}
        </h2>
        <p className="text-sm text-[#302A26]/60 mb-6">
          {lang === 'id'
            ? 'Produk yang Anda cari tidak tersedia atau belum dipublikasikan.'
            : 'The product you are looking for is currently unavailable.'}
        </p>
        <button
          onClick={() => navigate('products')}
          className="bg-[#A65F46] hover:bg-[#8f5239] text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          {t.products.backToCatalog}
        </button>
      </div>
    )
  }

  return (
    <div className="pt-[72px]">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-[12px] sm:text-[13px] text-[#302A26]/50">
        <button onClick={() => navigate('home')} className="hover:text-[#A65F46] transition-colors">
          {t.nav.home}
        </button>
        <span>/</span>
        <button onClick={() => navigate('products')} className="hover:text-[#A65F46] transition-colors">
          {t.nav.products}
        </button>
        <span>/</span>
        <span className="text-[#302A26] font-medium truncate max-w-[160px] sm:max-w-none">{product.name}</span>
      </div>

      {/* Product detail */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="rounded-2xl overflow-hidden aspect-square bg-[#D8C3A5]/40 shadow-xs border border-[#D8C3A5]/40">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {/* Thumbnail row */}
            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#D8C3A5]/30 cursor-pointer border-2 border-transparent hover:border-[#A65F46] transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[#7A8065] text-[11px] font-semibold tracking-widest uppercase mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#302A26] mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#A65F46]">
                {product.price || (lang === 'id' ? 'Hubungi untuk Harga' : 'Contact for Price')}
              </span>
              {product.moq && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F5F1E8] text-[#7A8065] border border-[#D8C3A5]/50">
                  MOQ: {product.moq}
                </span>
              )}
            </div>

            <p className="text-[#302A26]/65 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{product.description}</p>

            {/* Specs */}
            <div className="bg-[#F5F1E8] rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-[#D8C3A5]/50">
              <h3 className="font-semibold text-[#302A26] text-[14px] tracking-wide mb-3 sm:mb-4">
                {lang === 'id' ? 'Spesifikasi Produk' : 'Product Specifications'}
              </h3>
              <dl className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  [lang === 'id' ? 'Estimasi Harga' : 'Price', product.price || (lang === 'id' ? 'Hubungi Kami' : 'Contact Us')],
                  [t.products.material, product.material || 'Terracotta Clay'],
                  [t.products.size, product.size || 'Custom size available'],
                  [t.products.weight, product.weight || 'Varies by size'],
                  [t.products.finish, product.finish || 'Natural Unglazed'],
                  [t.products.moq, product.moq || 'Contact us'],
                ].map(([label, val]) => (
                  <div key={label}>
                    <dt className="text-[#302A26]/50 text-[11px] sm:text-[12px] font-medium mb-0.5">{label}</dt>
                    <dd className="text-[#302A26] text-xs sm:text-[13px] font-semibold">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowInquiry(true)}
                className="w-full sm:flex-1 bg-[#A65F46] text-white font-semibold py-3.5 rounded-xl hover:bg-[#8f5239] transition-colors shadow-xs text-sm"
              >
                {t.products.inquireBtn}
              </button>
              <a
                href={formatWhatsAppLink(
                  companyInfo.whatsapp,
                  lang === 'id'
                    ? `Halo, saya tertarik memesan produk ${product.name} dari PARJONO KERAMIK JAYA.`
                    : `Hello, I am interested in inquiring about ${product.name} from PARJONO KERAMIK JAYA.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1fb854] transition-colors shadow-xs text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>{t.home.chatWa}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full description */}
      <section className="max-w-[1280px] mx-auto px-6 py-10 border-t border-[#D8C3A5]/50">
        <h2 className="font-display text-[28px] font-bold text-[#302A26] mb-5">
          {lang === 'id' ? 'Deskripsi Lengkap Produk' : 'Product Description'}
        </h2>
        <div className="max-w-2xl">
          {product.fullDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-[#302A26]/70 leading-relaxed mb-4 text-[15px]">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ backgroundColor: '#F5F1E8' }} className="py-10 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl sm:text-[28px] font-bold text-[#302A26] mb-6 sm:mb-8">
              {t.products.relatedProducts}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {related.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate('product-detail', { productId: p.id })}
                  className="group bg-white rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all border border-[#D8C3A5]/40"
                >
                  <div className="aspect-square overflow-hidden bg-[#D8C3A5]/30">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-[#7A8065] text-[11px] font-semibold tracking-widest uppercase mb-1">
                      {p.category}
                    </p>
                    <h3 className="font-display font-semibold text-base sm:text-[18px] text-[#302A26] group-hover:text-[#A65F46] transition-colors line-clamp-1">
                      {p.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Modal */}
      {showInquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setShowInquiry(false)}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#D8C3A5]/40 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="font-display text-xl sm:text-[24px] font-bold text-[#302A26]">
                  {t.products.inquiryFormTitle}
                </h2>
                <p className="text-[#302A26]/50 text-xs sm:text-[13px] mt-1">{product.name}</p>
              </div>
              <button
                onClick={() => setShowInquiry(false)}
                className="text-[#302A26]/40 hover:text-[#302A26] transition-colors p-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#A65F46]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#A65F46]">
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
                <p className="font-display text-[20px] font-bold text-[#302A26] mb-2">
                  {t.contact.successTitle}
                </p>
                <p className="text-[#302A26]/60 text-[14px]">{t.contact.successDesc}</p>
                <button
                  onClick={() => {
                    setShowInquiry(false)
                    setSubmitted(false)
                  }}
                  className="mt-6 bg-[#A65F46] text-white px-6 py-2.5 rounded-xl text-[14px] font-medium hover:bg-[#8f5239] transition-colors"
                >
                  {lang === 'id' ? 'Tutup' : 'Close'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                    {t.contact.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                      {t.contact.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                      placeholder={t.contact.emailPlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                      {t.contact.phoneLabel}
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                      placeholder={t.contact.phonePlaceholder}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                      {t.contact.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                      placeholder={t.contact.companyPlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                      {lang === 'id' ? 'Perkiraan Jumlah' : 'Estimated Quantity'}
                    </label>
                    <input
                      type="text"
                      value={form.quantity}
                      onChange={e => setForm(prev => ({ ...prev, quantity: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                      placeholder="e.g. 100 pcs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#302A26] mb-1">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] resize-none"
                    placeholder={`Interested in ${product.name}...`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#A65F46] text-white font-semibold py-3.5 rounded-xl hover:bg-[#8f5239] transition-colors shadow-xs"
                >
                  {t.contact.sendBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
