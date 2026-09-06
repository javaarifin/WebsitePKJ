import { useState } from 'react'
import { NavigateFn } from '../App'
import { NEWS, AWARDS, EXHIBITIONS, GALLERY_IMAGES, IMAGES } from '../data'
import { useAppStore } from '../context/AppContext'

interface Props {
  navigate: NavigateFn
}

const stats = [
  { value: '2003', label: 'Established' },
  { value: '20+', label: 'Years of Experience' },
  { value: 'International', label: 'Export Experience' },
  { value: '[Product Count]', label: 'Product Variations' },
]

const processSteps = [
  { num: '01', title: 'Material', desc: 'Selection and preparation of clay.' },
  { num: '02', title: 'Shaping', desc: 'Handcrafted and formed with care.' },
  { num: '03', title: 'Drying', desc: 'Carefully prepared before firing.' },
  { num: '04', title: 'Firing', desc: 'Processed to develop strength and character.' },
  { num: '05', title: 'Finishing', desc: 'Final inspection and finishing.' },
]

export default function HomePage({ navigate }: Props) {
  const { products } = useAppStore()
  const liveProducts = products.filter(p => p.status !== 'draft')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const galleryPreview = GALLERY_IMAGES.slice(0, 6)

  const closeLightbox = () => setLightboxIdx(null)
  const prevImg = () => setLightboxIdx(i => (i !== null && i > 0 ? i - 1 : i))
  const nextImg = () => setLightboxIdx(i => (i !== null && i < galleryPreview.length - 1 ? i + 1 : i))

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#302A26' }}>
        {/* bg image overlay */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Craftsman shaping clay on a pottery wheel"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#302A26]/80 via-[#302A26]/50 to-[#302A26]/20" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-[72px] w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-72px)] py-20">
            {/* Left */}
            <div>
              <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-5">
                PARJONO KERAMIK JAYA
              </p>
              <h1 className="font-display text-[52px] md:text-[64px] leading-[1.1] font-bold text-white mb-6">
                Handcrafted<br />Terracotta<br />
                <em className="font-normal italic text-[#D8C3A5]">from Yogyakarta</em>
              </h1>
              <p className="text-[#D8C3A5] text-lg leading-relaxed mb-10 max-w-md">
                Crafted with experience since 2003, combining traditional craftsmanship with quality and care.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('products')}
                  className="bg-[#A65F46] text-white font-medium px-7 py-3.5 rounded-lg hover:bg-[#8f5239] transition-colors duration-200"
                >
                  Explore Products
                </button>
                <button
                  onClick={() => navigate('about')}
                  className="border border-white/40 text-white font-medium px-7 py-3.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  Discover Our Story
                </button>
              </div>
            </div>
            {/* Right - decorative image on desktop */}
            <div className="hidden lg:flex justify-end">
              <div className="relative w-[440px] h-[560px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.craftsmanWoman}
                  alt="Artisan shaping clay"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#302A26]/60 to-transparent p-6">
                  <p className="text-white/80 text-sm">Bantul, Yogyakarta — Since 2003</p>
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
              <p className="text-sm text-white/80 mt-1">Established</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
              ABOUT PARJONO KERAMIK JAYA
            </p>
            <h2 className="font-display text-[40px] md:text-[48px] leading-[1.15] font-bold text-[#302A26] mb-6">
              Crafting from Earth<br />Since 2003
            </h2>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              PARJONO KERAMIK JAYA is a terracotta and clay craft company based in Bantul, Yogyakarta, Indonesia. Established in 2003, the company has grown through craftsmanship, experience, and dedication to creating quality clay-based products.
            </p>
            <p className="text-[#302A26]/70 leading-relaxed mb-8">
              We serve both domestic and international markets, bringing the rich clay craft tradition of Yogyakarta to customers and partners around the world. Our products are designed for those who appreciate authentic, handcrafted quality.
            </p>
            <button
              onClick={() => navigate('about')}
              className="inline-flex items-center gap-2 text-[#A65F46] font-semibold hover:gap-3 transition-all duration-200"
            >
              Learn More About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-[40px] md:text-[52px] font-bold text-[#302A26] leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-[#302A26]/60 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">OUR PRODUCTS</p>
          <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-4">
            Made from Earth. Crafted by Hand.
          </h2>
          <p className="text-[#302A26]/60 max-w-xl mx-auto leading-relaxed">
            Explore a selection of handcrafted terracotta and clay products made with care in Yogyakarta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {liveProducts.slice(0, 8).map(product => (
            <div
              key={product.id}
              onClick={() => navigate('product-detail', { productId: product.id })}
              className="group bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-[#D8C3A5]">
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
                <h3 className="font-display font-semibold text-[18px] text-[#302A26] mb-2 group-hover:text-[#A65F46] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#302A26]/55 text-[13px] leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[#A65F46] text-[13px] font-semibold group-hover:gap-2 transition-all">
                  View Product
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('products')}
            className="border-2 border-[#A65F46] text-[#A65F46] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#A65F46] hover:text-white transition-all duration-200"
          >
            View All Products
          </button>
        </div>
      </section>

      {/* ── CRAFTSMANSHIP ── */}
      <section style={{ backgroundColor: '#F5F1E8' }} className="py-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-4">
              Crafted by Hand, Inspired by Earth
            </h2>
            <p className="text-[#302A26]/60 max-w-xl mx-auto leading-relaxed">
              Every piece begins with earth and is shaped through experience, patience, and craftsmanship.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5]">
              <img
                src={IMAGES.craftsman2}
                alt="Craftsman working with clay"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Process steps */}
            <div className="space-y-6">
              {processSteps.map((step) => (
                <div key={step.num} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#A65F46] flex items-center justify-center">
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

      {/* ── EXPORT EXPERIENCE ── */}
      <section style={{ backgroundColor: '#302A26' }} className="py-[100px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#A65F46_0%,_transparent_70%)]" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">EXPORT</p>
              <h2 className="font-display text-[40px] md:text-[48px] font-bold text-white leading-[1.15] mb-6">
                From Yogyakarta<br />to the World
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 max-w-md">
                With experience serving international markets, PARJONO KERAMIK JAYA brings Indonesian craftsmanship beyond Yogyakarta.
              </p>
              <button
                onClick={() => navigate('export')}
                className="inline-flex items-center gap-2 text-[#D8C3A5] font-semibold border-b border-[#D8C3A5]/40 pb-0.5 hover:text-white hover:border-white transition-colors"
              >
                Discover Our Export Experience
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#302A26]/50">
              <img
                src={IMAGES.export1}
                alt="Clay pots prepared for export"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS & ACHIEVEMENTS ── */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">RECOGNITION</p>
          <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-3">Experience Worth Sharing</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {AWARDS.slice(0, 3).map(award => (
            <div key={award.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                <img src={award.image} alt={award.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-[#A65F46] text-[11px] font-semibold tracking-widest uppercase mb-2">{award.year}</p>
                <h3 className="font-display font-semibold text-[18px] text-[#302A26] mb-1">{award.title}</h3>
                <p className="text-[#7A8065] text-[13px] mb-3">{award.organization}</p>
                <p className="text-[#302A26]/60 text-[13px] leading-relaxed">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('awards')}
            className="inline-flex items-center gap-2 text-[#A65F46] font-semibold hover:gap-3 transition-all duration-200"
          >
            View All Achievements
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
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-3">Growing Through Experience</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Featured exhibition */}
            <div
              onClick={() => navigate('exhibitions')}
              className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3] bg-[#302A26]"
            >
              <img
                src={EXHIBITIONS[0].image}
                alt={EXHIBITIONS[0].name}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#302A26]/70 to-transparent">
                <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-widest uppercase mb-2">Exhibition</p>
                <h3 className="font-display text-[24px] font-bold text-white mb-2">{EXHIBITIONS[0].name}</h3>
                <p className="text-white/70 text-sm">{EXHIBITIONS[0].location} · {EXHIBITIONS[0].year}</p>
              </div>
            </div>
            {/* Smaller exhibitions */}
            <div className="flex flex-col gap-6">
              {EXHIBITIONS.slice(1, 3).map(ex => (
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
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-[#302A26]/70 to-transparent">
                    <h3 className="font-display text-[20px] font-bold text-white mb-1">{ex.name}</h3>
                    <p className="text-white/70 text-sm">{ex.location} · {ex.year}</p>
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
              View Exhibition History
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
          <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-3">Stories & Activities</h2>
          <p className="text-[#302A26]/60 max-w-lg mx-auto leading-relaxed">
            Discover the latest activities, exhibitions, training, and stories from PARJONO KERAMIK JAYA.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {NEWS.slice(0, 3).map(item => (
            <div
              key={item.id}
              onClick={() => navigate('news-detail', { newsId: item.id })}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group transition-shadow"
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
                <h3 className="font-display font-semibold text-[18px] text-[#302A26] mb-2 group-hover:text-[#A65F46] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#302A26]/55 text-[13px] leading-relaxed mb-4 line-clamp-3">{item.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-[#A65F46] text-[13px] font-semibold group-hover:gap-2 transition-all">
                  Read More
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            View All News
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section style={{ backgroundColor: '#F5F1E8' }} className="py-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-3">A Glimpse Into Our Craft</h2>
            <p className="text-[#302A26]/60 max-w-lg mx-auto leading-relaxed">
              From raw clay to finished pieces, explore the people, places, and processes behind our work.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {galleryPreview.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIdx(idx)}
                className="aspect-square rounded-xl overflow-hidden bg-[#D8C3A5] cursor-pointer group relative"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#302A26]/0 group-hover:bg-[#302A26]/20 transition-colors duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate('gallery')}
              className="border-2 border-[#A65F46] text-[#A65F46] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#A65F46] hover:text-white transition-all duration-200"
            >
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ backgroundColor: '#D8C3A5' }} className="py-[100px]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="font-display text-[40px] md:text-[52px] font-bold text-[#302A26] mb-5 leading-[1.15]">
            Looking for Terracotta<br />from Indonesia?
          </h2>
          <p className="text-[#302A26]/65 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Talk to us about our products, custom opportunities, or potential business partnerships.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('contact')}
              className="bg-[#A65F46] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#8f5239] transition-colors text-[15px]"
            >
              Contact Us
            </button>
            <a
              href="https://wa.me/6200000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#1fb854] transition-colors text-[15px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
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
            onClick={(e) => { e.stopPropagation(); prevImg() }}
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
            <p className="text-white/60 text-sm text-center mt-3">{galleryPreview[lightboxIdx].caption}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); nextImg() }}
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
