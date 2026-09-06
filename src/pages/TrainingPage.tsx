import { useState } from 'react'
import { NavigateFn } from '../App'
import { ACTIVITIES } from '../data'

interface Props { navigate: NavigateFn }

const types = ['All', 'Training', 'Workshop', 'Seminar', 'Government Program', 'Community Activity', 'Company Activity']

export default function TrainingPage({ navigate }: Props) {
  const [activeType, setActiveType] = useState('All')

  const filtered = activeType === 'All' ? ACTIVITIES : ACTIVITIES.filter(a => a.type === activeType)

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1595351298020-038700609878?w=1400&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#302A26]/80" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">Company</p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">Training & Activities</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Training programs, workshops, and activities reflecting our commitment to continuous growth.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section style={{ backgroundColor: '#F5F1E8' }} className="sticky top-[72px] z-30 border-b border-[#D8C3A5]/60">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap gap-2">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-all ${
                activeType === t
                  ? 'bg-[#A65F46] text-white'
                  : 'bg-white text-[#302A26]/70 border border-[#D8C3A5] hover:border-[#A65F46] hover:text-[#A65F46]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Activities grid */}
      <section className="py-[80px] max-w-[1280px] mx-auto px-6">
        <div className="mb-8">
          <p className="text-[#302A26]/50 text-[14px] leading-relaxed max-w-2xl">
            Note: Activity titles, dates, and locations below are placeholders. Actual details will be added when confirmed information is available.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(activity => (
            <div key={activity.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#F5F1E8] text-[#7A8065] text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                    {activity.type}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[18px] text-[#302A26] mb-2">{activity.title}</h3>
                <div className="flex flex-col gap-1 mb-3">
                  <p className="text-[#302A26]/45 text-[12px]">{activity.date}</p>
                  <p className="text-[#302A26]/45 text-[12px]">{activity.location}</p>
                </div>
                <p className="text-[#302A26]/60 text-[13px] leading-relaxed">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
