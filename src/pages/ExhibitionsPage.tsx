import { NavigateFn } from '../App'
import { EXHIBITIONS } from '../data'

interface Props { navigate: NavigateFn }

export default function ExhibitionsPage({ navigate }: Props) {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=1400&h=600&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#302A26]/80" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Company</p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">Exhibitions</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Our participation in exhibitions across Indonesia and beyond.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 max-w-[1280px] mx-auto px-6">
        <p className="text-[#302A26]/50 text-[14px] leading-relaxed max-w-2xl">
          Note: Exhibition names, locations, and years below are placeholders. Actual exhibition details will be added when confirmed information is available.
        </p>
      </section>

      {/* Exhibition timeline */}
      <section className="pb-[100px] max-w-[1280px] mx-auto px-6">
        <div className="space-y-8">
          {EXHIBITIONS.map((ex, idx) => (
            <div
              key={ex.id}
              className={`grid lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {idx % 2 === 0 ? (
                <>
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5]">
                    <img src={ex.image} alt={ex.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">{ex.year}</p>
                    <h2 className="font-display text-[32px] font-bold text-[#302A26] mb-2">{ex.name}</h2>
                    <p className="text-[#7A8065] text-[14px] font-medium mb-4">{ex.location}</p>
                    <p className="text-[#302A26]/65 leading-relaxed">{ex.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-2 lg:order-1">
                    <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">{ex.year}</p>
                    <h2 className="font-display text-[32px] font-bold text-[#302A26] mb-2">{ex.name}</h2>
                    <p className="text-[#7A8065] text-[14px] font-medium mb-4">{ex.location}</p>
                    <p className="text-[#302A26]/65 leading-relaxed">{ex.description}</p>
                  </div>
                  <div className="order-1 lg:order-2 rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5]">
                    <img src={ex.image} alt={ex.name} className="w-full h-full object-cover" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
