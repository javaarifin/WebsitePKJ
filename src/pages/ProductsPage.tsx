import { useState } from 'react'
import { NavigateFn } from '../App'
import { useAppStore } from '../context/AppContext'

interface Props { navigate: NavigateFn }

const categories = ['All', 'Terracotta', 'Clay Pottery', 'Garden', 'Home Decoration', 'Custom', 'Other']

export default function ProductsPage({ navigate }: Props) {
  const { products } = useAppStore()
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const liveProducts = products.filter(p => p.status !== 'draft')

  const filtered = liveProducts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

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
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">OUR PRODUCTS</p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">Our Products</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Explore our collection of handcrafted clay and terracotta products.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ backgroundColor: '#F5F1E8' }} className="sticky top-[72px] z-30 border-b border-[#D8C3A5]/60 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Search */}
          <div className="relative flex-shrink-0 w-full md:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#302A26]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D8C3A5] rounded-lg text-[13px] text-[#302A26] placeholder-[#302A26]/40 focus:outline-none focus:border-[#A65F46] transition-colors"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#A65F46] text-white'
                    : 'bg-white text-[#302A26]/70 border border-[#D8C3A5] hover:border-[#A65F46] hover:text-[#A65F46]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 max-w-[1280px] mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-[24px] text-[#302A26]/40 mb-3">No products found</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All') }} className="text-[#A65F46] font-medium text-sm hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div
                key={product.id}
                onClick={() => navigate('product-detail', { productId: product.id })}
                className="group bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
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
        )}
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: '#D8C3A5' }} className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="font-display text-[32px] font-bold text-[#302A26] mb-4">
            Looking for something specific?
          </h2>
          <p className="text-[#302A26]/65 mb-8 max-w-md mx-auto">
            We also accept custom orders. Contact us to discuss your requirements.
          </p>
          <button
            onClick={() => navigate('contact')}
            className="bg-[#A65F46] text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-[#8f5239] transition-colors"
          >
            Inquire About Custom Orders
          </button>
        </div>
      </section>
    </div>
  )
}
