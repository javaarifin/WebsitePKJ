import { NavigateFn } from '../App'
import { IMAGES } from '../data'

interface Props { navigate: NavigateFn }

export default function ExportPage({ navigate }: Props) {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.export1} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#302A26]/90 to-[#302A26]/60" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">International</p>
          <h1 className="font-display text-[52px] md:text-[64px] font-bold text-white mb-4 leading-[1.1]">
            From Yogyakarta<br />to the World
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            With experience serving international markets, PARJONO KERAMIK JAYA brings Indonesian craftsmanship beyond Yogyakarta.
          </p>
        </div>
      </section>

      {/* Export Story */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Our Export Story</p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-6">Bringing Indonesian Craft to International Markets</h2>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              PARJONO KERAMIK JAYA has developed experience in serving international buyers and markets. Our export journey reflects years of preparation — building product quality, refining packaging processes, and developing relationships with international partners.
            </p>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              We have worked to ensure our products meet the requirements of international buyers, from quality standards and consistent production to secure packaging for long-distance shipping.
            </p>
            <p className="text-[#302A26]/70 leading-relaxed">
              Our international experience demonstrates our readiness to serve buyers outside Indonesia who value authentic, handcrafted terracotta and clay products from Yogyakarta.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5]">
            <img src={IMAGES.export1} alt="Products prepared for export" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* What we export */}
      <section style={{ backgroundColor: '#F5F1E8' }} className="py-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">Our Offering</p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-3">What We Export</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Terracotta Products',
                desc: 'Handcrafted terracotta planters, pots, bowls, and decorative items made from natural clay.',
                image: IMAGES.potsDisplay,
              },
              {
                title: 'Clay Pottery',
                desc: 'Traditional and contemporary clay pottery including jars, vases, and functional vessels.',
                image: 'https://images.unsplash.com/photo-1510828561531-05a3388f6d3d?w=600&h=400&fit=crop&auto=format',
              },
              {
                title: 'Garden & Outdoor',
                desc: 'Durable clay and terracotta pieces designed for outdoor use in gardens and outdoor spaces.',
                image: IMAGES.potsStack,
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-[20px] text-[#302A26] mb-2">{item.title}</h3>
                  <p className="text-[#302A26]/60 text-[14px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export capabilities */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5]">
            <img src={IMAGES.export2} alt="Export preparation" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Our Capabilities</p>
            <h2 className="font-display text-[36px] font-bold text-[#302A26] mb-6">Ready for International Orders</h2>
            <div className="space-y-4">
              {[
                { title: 'Product Quality', desc: 'Consistent quality standards maintained across all production.' },
                { title: 'Packaging', desc: 'Careful packaging designed to protect products during long-distance shipping.' },
                { title: 'Product Preparation', desc: 'Products are inspected and prepared to meet buyer specifications.' },
                { title: 'Communication', desc: 'Clear and responsive communication with international buyers and partners.' },
                { title: 'Flexibility', desc: 'Ability to accommodate custom orders and specific buyer requirements.' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A65F46]/15 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#A65F46]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#302A26] text-[14px] mb-0.5">{item.title}</h4>
                    <p className="text-[#302A26]/60 text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market note */}
      <section style={{ backgroundColor: '#302A26' }} className="py-[80px]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">International Reach</p>
          <h2 className="font-display text-[36px] font-bold text-white mb-5">
            PARJONO KERAMIK JAYA has experience<br />serving international markets.
          </h2>
          <p className="text-white/55 max-w-lg mx-auto mb-8 leading-relaxed">
            We welcome inquiries from international buyers, distributors, and retail partners. Please contact us to discuss your requirements.
          </p>
          <button
            onClick={() => navigate('contact')}
            className="bg-[#A65F46] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#8f5239] transition-colors"
          >
            Contact for Export Inquiries
          </button>
        </div>
      </section>
    </div>
  )
}
