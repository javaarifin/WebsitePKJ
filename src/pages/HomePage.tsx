import { useState } from 'react'
import { NavigateFn } from '../App'
import { IMAGES } from '../data'
import { useAppStore, formatWhatsAppLink } from '../context/AppContext'

interface Props {
  navigate: NavigateFn
}

export default function HomePage({ navigate }: Props) {
  const { products, news, gallery, awards, exhibitions, t, lang, companyInfo } = useAppStore()
  const liveProducts = products.filter(p => p.status !== 'draft')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const galleryPreview = gallery.slice(0, 6)

  const closeLightbox = () => setLightboxIdx(null)
  const prevImg = () => setLightboxIdx(i => (i !== null && i > 0 ? i - 1 : i))
  const nextImg = () =>
    setLightboxIdx(i => (i !== null && i < galleryPreview.length - 1 ? i + 1 : i))

  const stats = [
    { value: '2003', label: t.home.statEstablished },
    { value: '20+', label: t.home.statExperience },
    { value: 'International', label: t.home.statExport },
    { value: `${products.length}+`, label: t.home.statProducts },
  ]

  const processSteps = [
    { num: '01', title: t.home.step1Title, desc: t.home.step1Desc },
    { num: '02', title: t.home.step2Title, desc: t.home.step2Desc },
    { num: '03', title: t.home.step3Title, desc: t.home.step3Desc },
    { num: '04', title: t.home.step4Title, desc: t.home.step4Desc },
    { num: '05', title: t.home.step5Title, desc: t.home.step5Desc },
  ]

  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: '#302A26' }}
      >
        {/* bg image overlay */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Craftsman shaping clay on a pottery wheel"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#302A26]/85 via-[#302A26]/60 to-[#302A26]/30" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-[72px] w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-72px)] py-20">
            {/* Left */}
            <div>
              <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-5">
                {t.home.heroTag}
              </p>
              <h1 className="font-display text-[48px] md:text-[64px] leading-[1.1] font-bold text-white mb-6">
                {t.home.heroTitle1}
                <br />
                <span className="text-[#D8C3A5]">{t.home.heroTitle2}</span>
              </h1>
              <p className="text-[#D8C3A5]/90 text-lg leading-relaxed mb-10 max-w-lg">
                {t.home.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('products')}
                  className="bg-[#A65F46] text-white font-medium px-7 py-3.5 rounded-lg hover:bg-[#8f5239] transition-colors duration-200 shadow-sm"
                >
                  {t.home.exploreBtn}
                </button>
                <button
                  onClick={() => navigate('contact')}
                  className="border border-white/40 text-white font-medium px-7 py-3.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  {t.home.contactBtn}
                </button>
              </div>
            </div>
            {/* Right - decorative image on desktop */}
            <div className="hidden lg:flex justify-end">
              <div className="relative w-[440px] h-[560px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={IMAGES.craftsmanWoman}
                  alt="Artisan shaping clay"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#302A26]/80 to-transparent p-6">
                  <p className="text-white/90 text-sm font-medium">
                    Bantul, Yogyakarta — Established 2003
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[11px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ── COMPANY INTRODUCTION ── */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-[#D8C3A5]">
              <img
                src={IMAGES.intro}
                alt="Artisan at work in the workshop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#A65F46] text-white rounded-2xl p-6 shadow-lg hidden md:block">
              <p className="font-display text-3xl font-bold">2003</p>
              <p className="text-sm text-white/80 mt-1">{t.home.statEstablished}</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
              {t.home.aboutTag}
            </p>
            <h2 className="font-display text-[38px] md:text-[46px] leading-[1.15] font-bold text-[#302A26] mb-6">
              {t.home.aboutTitle}
            </h2>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">{t.home.aboutDesc1}</p>
            <p className="text-[#302A26]/70 leading-relaxed mb-8">{t.home.aboutDesc2}</p>
            <button
              onClick={() => navigate('about')}
              className="inline-flex items-center gap-2 text-[#A65F46] font-semibold hover:gap-3 transition-all duration-200"
            >
              <span>{t.home.readStory}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── STATISTICS ── */}
      <section style={{ backgroundColor: '#D8C3A5' }} className="py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-[40px] md:text-[52px] font-bold text-[#302A26] leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-[#302A26]/70 text-sm font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
            {t.home.featuredTag}
          </p>
          <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-4">
            {t.home.featuredTitle}
          </h2>
          <p className="text-[#302A26]/60 max-w-xl mx-auto leading-relaxed">
            {t.products.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {liveProducts.slice(0, 8).map(product => (
            <div
              key={product.id}
              onClick={() => navigate('product-detail', { productId: product.id })}
              className="group bg-white rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 border border-[#D8C3A5]/40"
            >
              <div className="aspect-square overflow-hidden bg-[#D8C3A5]/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <p className="text-[#7A8065] text-[11px] font-semibold tracking-widest uppercase mb-1">
                  {product.category}
                </p>
                <h3 className="font-display font-semibold text-[18px] text-[#302A26] mb-2 group-hover:text-[#A65F46] transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[#302A26]/55 text-[13px] leading-relaxed mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-2.5 border-t border-[#D8C3A5]/30">
                  <span className="font-display font-bold text-[15px] text-[#A65F46]">
                    {product.price || (lang === 'id' ? 'Hubungi Kami' : 'Contact Us')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#302A26]/60 text-[12px] font-semibold group-hover:text-[#A65F46] group-hover:gap-1.5 transition-all">
                    {t.products.viewDetails}
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('products')}
            className="border-2 border-[#A65F46] text-[#A65F46] font-semibold px-8 py-3.5 rounded-xl hover:bg-[#A65F46] hover:text-white transition-all duration-200"
          >
            {t.home.viewAllProducts}
          </button>
        </div>
      </section>

      {/* ── CRAFTSMANSHIP / PROCESS ── */}
      <section style={{ backgroundColor: '#F5F1E8' }} className="py-[100px] border-y border-[#D8C3A5]/40">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
              {t.home.processTag}
            </p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-4">
              {t.home.processTitle}
            </h2>
            <p className="text-[#302A26]/60 max-w-xl mx-auto leading-relaxed">
              {t.home.processSubtitle}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5] shadow-sm">
              <img
                src={IMAGES.craftsman2}
                alt="Craftsman working with clay"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Process steps */}
            <div className="space-y-6">
              {processSteps.map(step => (
                <div key={step.num} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#A65F46] flex items-center justify-center bg-white shadow-xs">
                    <span className="text-[#A65F46] text-[11px] font-bold">{step.num}</span>
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-display font-semibold text-[18px] text-[#302A26] mb-1">
                      {step.num} — {step.title}
                    </h3>
                    <p className="text-[#302A26]/60 text-[14px] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS & ACHIEVEMENTS ── */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
            {t.home.awardsTag}
          </p>
          <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-3">
            {t.home.awardsTitle}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {awards.slice(0, 3).map(award => (
            <div
              key={award.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-[#D8C3A5]/40"
            >
              <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                <img src={award.image} alt={award.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-[#A65F46] text-[11px] font-semibold tracking-widest uppercase mb-2">
                  {award.year}
                </p>
                <h3 className="font-display font-semibold text-[18px] text-[#302A26] mb-1">
                  {award.title}
                </h3>
                <p className="text-[#7A8065] text-[13px] mb-3">{award.organization}</p>
                <p className="text-[#302A26]/60 text-[13px] leading-relaxed line-clamp-2">
                  {award.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('awards')}
            className="inline-flex items-center gap-2 text-[#A65F46] font-semibold hover:gap-3 transition-all duration-200"
          >
            <span>{t.home.viewAllAwards}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── EXHIBITIONS & ACTIVITIES ── */}
      <section style={{ backgroundColor: '#D8C3A5' }} className="py-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-3">
              {t.home.exhibitionsTitle}
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Featured exhibition */}
            {exhibitions[0] && (
              <div
                onClick={() => navigate('exhibitions')}
                className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3] bg-[#302A26]"
              >
                <img
                  src={exhibitions[0].image}
                  alt={exhibitions[0].name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#302A26]/80 to-transparent">
                  <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-widest uppercase mb-2">
                    {t.nav.exhibitions}
                  </p>
                  <h3 className="font-display text-[24px] font-bold text-white mb-2">
                    {exhibitions[0].name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {exhibitions[0].location} · {exhibitions[0].year}
                  </p>
                </div>
              </div>
            )}
            {/* Smaller exhibitions */}
            <div className="flex flex-col gap-6">
              {exhibitions.slice(1, 3).map(ex => (
                <div
                  key={ex.id}
                  onClick={() => navigate('exhibitions')}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group flex-1 bg-[#302A26]"
                >
                  <img
                    src={ex.image}
                    alt={ex.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                    style={{ minHeight: '160px' }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-[#302A26]/80 to-transparent">
                    <h3 className="font-display text-[20px] font-bold text-white mb-1">{ex.name}</h3>
                    <p className="text-white/80 text-sm">
                      {ex.location} · {ex.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => navigate('exhibitions')}
              className="inline-flex items-center gap-2 text-[#302A26] font-semibold border-b border-[#302A26]/40 pb-0.5 hover:text-[#A65F46] hover:border-[#A65F46] transition-colors"
            >
              <span>{t.home.viewAllExhibitions}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
            {t.home.newsTag}
          </p>
          <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-3">
            {t.home.newsTitle}
          </h2>
          <p className="text-[#302A26]/60 max-w-lg mx-auto leading-relaxed">
            {t.home.newsSubtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {news.slice(0, 3).map(item => (
            <div
              key={item.id}
              onClick={() => navigate('news-detail', { newsId: item.id })}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer group transition-shadow border border-[#D8C3A5]/40"
            >
              <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#F5F1E8] text-[#A65F46] text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                    {item.category}
                  </span>
                  <span className="text-[#302A26]/40 text-[12px]">{item.date}</span>
                </div>
                <h3 className="font-display font-semibold text-[18px] text-[#302A26] mb-2 group-hover:text-[#A65F46] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[#302A26]/55 text-[13px] leading-relaxed mb-4 line-clamp-3">
                  {item.excerpt || item.body}
                </p>
                <span className="inline-flex items-center gap-1 text-[#A65F46] text-[13px] font-semibold group-hover:gap-2 transition-all">
                  {t.home.readMore}
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('news')}
            className="inline-flex items-center gap-2 text-[#A65F46] font-semibold hover:gap-3 transition-all duration-200"
          >
            <span>{t.home.viewAllNews}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section style={{ backgroundColor: '#F5F1E8' }} className="py-[100px] border-t border-[#D8C3A5]/40">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
              {t.home.galleryTag}
            </p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-3">
              {t.home.galleryTitle}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {galleryPreview.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIdx(idx)}
                className="aspect-square rounded-2xl overflow-hidden bg-[#D8C3A5] cursor-pointer group relative shadow-xs"
              >
                <img
                  src={img.src}
                  alt={img.alt || img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#302A26]/0 group-hover:bg-[#302A26]/30 transition-colors duration-300 flex items-end p-4">
                  <p className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate('gallery')}
              className="border-2 border-[#A65F46] text-[#A65F46] font-semibold px-8 py-3.5 rounded-xl hover:bg-[#A65F46] hover:text-white transition-all duration-200"
            >
              {t.home.viewAllGallery}
            </button>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ backgroundColor: '#D8C3A5' }} className="py-[100px]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="font-display text-[40px] md:text-[52px] font-bold text-[#302A26] mb-5 leading-[1.15]">
            {t.home.ctaTitle1}
            <br />
            {t.home.ctaTitle2}
          </h2>
          <p className="text-[#302A26]/75 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {t.home.ctaDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('contact')}
              className="bg-[#A65F46] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#8f5239] transition-colors text-[15px] shadow-sm"
            >
              {t.nav.contactUs}
            </button>
            <a
              href={formatWhatsAppLink(
                companyInfo.whatsapp,
                lang === 'id'
                  ? 'Halo Parjono Keramik Jaya, saya tertarik untuk memesan produk gerabah.'
                  : 'Hello Parjono Keramik Jaya, I am interested in placing an order for pottery products.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1fb854] transition-colors text-[15px] shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.home.chatWa}
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && galleryPreview[lightboxIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/60 hover:text-white w-10 h-10 flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={e => {
              e.stopPropagation()
              prevImg()
            }}
            className="absolute left-4 text-white/60 hover:text-white w-10 h-10 flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl max-h-[80vh] relative">
            <img
              src={galleryPreview[lightboxIdx].src}
              alt={galleryPreview[lightboxIdx].alt}
              className="max-h-[75vh] max-w-full object-contain rounded-xl"
            />
            <p className="text-white/80 text-sm text-center mt-3">
              {galleryPreview[lightboxIdx].caption}
            </p>
          </div>
          <button
            onClick={e => {
              e.stopPropagation()
              nextImg()
            }}
            className="absolute right-4 text-white/60 hover:text-white w-10 h-10 flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
