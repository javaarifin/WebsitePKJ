import { NavigateFn, Page } from '../App'
import { IMAGES } from '../data'

interface Props { navigate: NavigateFn }

const companyCards: { title: string; desc: string; page: Page; image: string }[] = [
  {
    title: 'Company Profile',
    desc: 'Learn about our history, location, and the values that guide our work.',
    page: 'about',
    image: IMAGES.intro,
  },
  {
    title: 'Export Experience',
    desc: 'Discover our experience serving international markets with quality products.',
    page: 'export',
    image: IMAGES.export1,
  },
  {
    title: 'Awards & Achievements',
    desc: 'Recognition and achievements earned through years of dedicated craftsmanship.',
    page: 'awards',
    image: 'https://images.unsplash.com/photo-1557128712-4ab4dc147a71?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'Exhibitions',
    desc: 'Our presence at exhibitions and trade events in Indonesia and beyond.',
    page: 'exhibitions',
    image: 'https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=600&h=400&fit=crop&auto=format',
  },
  {
    title: 'Training & Activities',
    desc: 'Training programs, workshops, and activities we have participated in.',
    page: 'training',
    image: IMAGES.craftsman2,
  },
]

export default function CompanyPage({ navigate }: Props) {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={IMAGES.craftsmanWoman} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#302A26]/80" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">The Company</p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">PARJONO KERAMIK JAYA</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Handcrafted in Yogyakarta. Experienced since 2003. Ready for the world.
          </p>
        </div>
      </section>

      {/* Navigation cards */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-[36px] font-bold text-[#302A26] mb-3">Explore the Company</h2>
          <p className="text-[#302A26]/60 max-w-lg mx-auto">Learn about who we are, what we do, and where we have been.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companyCards.map(card => (
            <div
              key={card.title}
              onClick={() => navigate(card.page)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-[20px] text-[#302A26] mb-2 group-hover:text-[#A65F46] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[#302A26]/55 text-[14px] leading-relaxed mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#A65F46] text-[13px] font-semibold group-hover:gap-2 transition-all">
                  Explore
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brief overview */}
      <section style={{ backgroundColor: '#D8C3A5' }} className="py-[80px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-display text-[48px] font-bold text-[#302A26] mb-2">2003</p>
              <p className="text-[#302A26]/60 text-[14px]">Established</p>
            </div>
            <div>
              <p className="font-display text-[48px] font-bold text-[#302A26] mb-2">20+</p>
              <p className="text-[#302A26]/60 text-[14px]">Years of Experience</p>
            </div>
            <div>
              <p className="font-display text-[48px] font-bold text-[#302A26] mb-2">International</p>
              <p className="text-[#302A26]/60 text-[14px]">Export Experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
