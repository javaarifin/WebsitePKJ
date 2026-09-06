import { NavigateFn } from '../App'
import { AWARDS } from '../data'

interface Props { navigate: NavigateFn }

export default function AwardsPage({ navigate }: Props) {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Recognition</p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">Awards & Achievements</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Recognition earned through years of dedication to handcraft quality and Indonesian craft tradition.
          </p>
        </div>
      </section>

      {/* Awards grid */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="mb-10">
          <p className="text-[#302A26]/50 text-[14px] leading-relaxed max-w-2xl">
            Note: Award names, years, and organizations below are placeholders. Actual award details will be added when confirmed information is available.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AWARDS.map(award => (
            <div key={award.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                <img src={award.image} alt={award.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#A65F46]/10 text-[#A65F46] text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                    {award.year}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[20px] text-[#302A26] mb-1">{award.title}</h3>
                <p className="text-[#7A8065] text-[13px] font-medium mb-3">{award.organization}</p>
                <p className="text-[#302A26]/60 text-[13px] leading-relaxed">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commitment section */}
      <section style={{ backgroundColor: '#D8C3A5' }} className="py-[80px]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="font-display text-[36px] font-bold text-[#302A26] mb-5">
            Committed to Quality
          </h2>
          <p className="text-[#302A26]/65 max-w-xl mx-auto mb-8 leading-relaxed">
            Our recognition reflects our ongoing commitment to quality craftsmanship and the promotion of Indonesian clay and terracotta traditions.
          </p>
          <button
            onClick={() => navigate('contact')}
            className="bg-[#A65F46] text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-[#8f5239] transition-colors"
          >
            Work With Us
          </button>
        </div>
      </section>
    </div>
  )
}
