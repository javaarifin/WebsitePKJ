import { NavigateFn } from '../App'
import { IMAGES } from '../data'

interface Props { navigate: NavigateFn }

const values = [
  { title: 'Craftsmanship', desc: 'Respect for handmade processes and traditional skills.' },
  { title: 'Quality', desc: 'Commitment to consistent product quality.' },
  { title: 'Reliability', desc: 'Building long-term relationships with customers and partners.' },
  { title: 'Growth', desc: 'Continuously learning through experience, exhibitions, and collaboration.' },
]

const timeline = [
  { year: '2003', title: 'Company Established', desc: 'PARJONO KERAMIK JAYA was founded in Klisat, Srihardono, Pundong, Bantul, Yogyakarta.' },
  { year: '[Year]', title: '[Milestone]', desc: 'Placeholder for an important company milestone to be added.' },
  { year: '[Year]', title: '[Milestone]', desc: 'Placeholder for an important company milestone to be added.' },
  { year: '[Year]', title: '[International Market Experience]', desc: 'Placeholder for international export experience milestone.' },
  { year: '[Year]', title: '[Recent Achievement]', desc: 'Placeholder for a recent company achievement or milestone.' },
]

export default function AboutPage({ navigate }: Props) {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.intro} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#302A26]/80" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">About Us</p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">Our Story</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">A journey of craftsmanship since 2003.</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Company Story</p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-6">Rooted in Yogyakarta</h2>
            <p className="text-[#302A26]/65 text-[#7A8065] text-[13px] font-semibold tracking-wide mb-4">
              Klisat, Srihardono, Pundong, Bantul, Yogyakarta, Indonesia
            </p>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              PARJONO KERAMIK JAYA is a terracotta and clay craft company rooted in the rich pottery tradition of Bantul, Yogyakarta. Established in 2003, the company has developed through years of hands-on craftsmanship, dedication, and an ongoing commitment to quality.
            </p>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              Located in Klisat, Srihardono, Pundong — an area with a long heritage in clay craft — we work with natural materials sourced locally, applying traditional forming techniques to create products that are both functional and culturally significant.
            </p>
            <p className="text-[#302A26]/70 leading-relaxed">
              Our work serves both domestic customers and international buyers, reflecting our belief that quality handcraft from Yogyakarta deserves a place in homes and spaces around the world.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-[#D8C3A5]">
              <img src={IMAGES.craftsmanWoman} alt="Artisan at work" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Company Journey Timeline */}
      <section style={{ backgroundColor: '#F5F1E8' }} className="py-[100px]">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">Our History</p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26]">Company Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#D8C3A5]" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-8 items-start pl-0">
                  <div className="relative flex-shrink-0 w-16 text-right">
                    <span className="font-display font-bold text-[#A65F46] text-[15px]">{item.year}</span>
                    <div className="absolute right-[-33px] top-1.5 w-4 h-4 rounded-full bg-[#A65F46] border-4 border-[#F5F1E8]" />
                  </div>
                  <div className="pb-4">
                    <h3 className="font-display font-semibold text-[20px] text-[#302A26] mb-2">{item.title}</h3>
                    <p className="text-[#302A26]/60 leading-relaxed text-[14px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5]">
            <img src={IMAGES.craftsman2} alt="Workshop craftsmanship" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Craftsmanship</p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-6">Made by Hand, Every Time</h2>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              Every product that leaves our workshop is shaped by hand. We do not rely on mass-production methods — instead, we apply traditional clay-forming techniques that have been practised in Yogyakarta for generations.
            </p>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              This means each piece carries the natural variation and character that only genuine handcraft can provide. Minor differences between pieces are not imperfections — they are the mark of authenticity.
            </p>
            <p className="text-[#302A26]/70 leading-relaxed">
              From raw clay selection to final inspection, every step is managed with care and attention to maintain the standards our customers expect.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section style={{ backgroundColor: '#D8C3A5' }} className="py-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">What We Believe</p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26]">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-8">
                <div className="w-10 h-10 rounded-full bg-[#A65F46]/10 flex items-center justify-center mb-5">
                  <div className="w-3 h-3 rounded-full bg-[#A65F46]" />
                </div>
                <h3 className="font-display font-semibold text-[20px] text-[#302A26] mb-3">{v.title}</h3>
                <p className="text-[#302A26]/60 text-[14px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Experience */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">International Reach</p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-6">Export Experience</h2>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              PARJONO KERAMIK JAYA has experience serving international markets. Our products have been prepared and shipped to buyers outside Indonesia, reflecting our capability to meet international quality and packaging requirements.
            </p>
            <p className="text-[#302A26]/70 leading-relaxed mb-8">
              We welcome inquiries from international buyers, distributors, and retail partners interested in authentic Indonesian terracotta craft.
            </p>
            <button
              onClick={() => navigate('export')}
              className="inline-flex items-center gap-2 bg-[#A65F46] text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-[#8f5239] transition-colors"
            >
              Learn About Our Export Experience
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5]">
            <img src={IMAGES.export1} alt="Products prepared for export" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#302A26' }} className="py-[80px]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="font-display text-[36px] font-bold text-white mb-4">Ready to work with us?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">Get in touch to discuss your requirements, products, or business partnership opportunities.</p>
          <button
            onClick={() => navigate('contact')}
            className="bg-[#A65F46] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#8f5239] transition-colors"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  )
}
