import { useState } from 'react'
import { NavigateFn } from '../App'
import { useAppStore } from '../context/AppContext'

interface Props {
  navigate: NavigateFn
}

const CATEGORIES = [
  'All',
  'Terracotta',
  'Clay Pottery',
  'Garden',
  'Home Decoration',
  'Custom',
  'Other',
]

export default function ProductsPage({ navigate }: Props) {
  const { products, t, lang } = useAppStore()
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const liveProducts = products.filter(p => p.status !== 'draft')

  const filtered = liveProducts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const getCategoryLabel = (cat: string) => {
    if (cat === 'All') return t.products.allCategories
    if (cat === 'Terracotta') return t.products.catTerracotta
    if (cat === 'Clay Pottery') return t.products.catClayPottery
    if (cat === 'Garden') return t.products.catGarden
    if (cat === 'Home Decoration') return t.products.catHomeDecoration
    if (cat === 'Custom') return t.products.catCustom
    return cat
  }

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=1400&h=600&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#302A26]/80" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
            {t.nav.products}
          </p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">
            {t.products.title}
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {t.products.subtitle}
          </p>
        </div>
      </section>

      {/* Filter and search bar */}
      <section
        style={{ backgroundColor: '#F5F1E8' }}
        className="sticky top-[72px] z-30 border-b border-[#D8C3A5]/60 shadow-xs"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-[12px] font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#A65F46] text-white shadow-xs'
                    : 'bg-white text-[#302A26]/70 border border-[#D8C3A5] hover:border-[#A65F46] hover:text-[#A65F46]'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder={t.products.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-[#D8C3A5] rounded-xl px-4 py-2 text-xs text-[#302A26] placeholder-[#302A26]/40 focus:outline-none focus:border-[#A65F46]"
            />
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-[80px] max-w-[1280px] mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-[#D8C3A5]/40">
            <p className="font-display text-[22px] text-[#302A26]/60 mb-3">
              {t.products.noProducts}
            </p>
            <button
              onClick={() => {
                setSearch('')
                setActiveCategory('All')
              }}
              className="text-[#A65F46] font-semibold text-xs hover:underline"
            >
              {lang === 'id' ? 'Reset Pencarian & Filter' : 'Clear Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div
                key={product.id}
                onClick={() => navigate('product-detail', { productId: product.id })}
                className="group bg-white rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-[#D8C3A5]/40"
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
        )}
      </section>
    </div>
  )
}
