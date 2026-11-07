import { useState } from "react"
import { NavigateFn } from "../App"
import { useAppStore } from "../context/AppContext"
import { ACTIVITIES } from "../data"

interface Props {
  navigate: NavigateFn
}

const typeMap: Record<string, { en: string; id: string }> = {
  All: { en: "All", id: "Semua" },
  Training: { en: "Training", id: "Pelatihan" },
  Workshop: { en: "Workshop", id: "Workshop" },
  Seminar: { en: "Seminar", id: "Seminar" },
  "Government Program": { en: "Government Program", id: "Program Pemerintah" },
  "Community Activity": { en: "Community Activity", id: "Kegiatan Komunitas" },
  "Company Activity": { en: "Company Activity", id: "Kegiatan Perusahaan" },
}

const typeKeys = [
  "All",
  "Training",
  "Workshop",
  "Seminar",
  "Government Program",
  "Community Activity",
  "Company Activity",
]

export default function TrainingPage({ navigate }: Props) {
  const { lang } = useAppStore()
  const isId = lang === "id"
  const [activeKey, setActiveKey] = useState("All")

  const filtered =
    activeKey === "All"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.type === activeKey)

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        style={{ backgroundColor: "#302A26" }}
        className="py-16 sm:py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1595351298020-038700609878?w=1400&h=600&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#302A26]/80" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3 sm:mb-4">
            {isId ? "Perusahaan" : "Company"}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {isId ? "Pelatihan & Kegiatan" : "Training & Activities"}
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
            {isId
              ? "Program pelatihan, lokakarya, dan kegiatan yang mencerminkan komitmen kami terhadap pembelajaran berkelanjutan."
              : "Training programs, workshops, and activities reflecting our commitment to continuous growth."}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section
        style={{ backgroundColor: "#F5F1E8" }}
        className="sticky top-[72px] z-30 border-b border-[#D8C3A5]/60"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap gap-1.5 sm:gap-2">
          {typeKeys.map((key) => {
            const label = isId ? typeMap[key]?.id : typeMap[key]?.en
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-all ${
                  activeKey === key
                    ? "bg-[#A65F46] text-white shadow-sm"
                    : "bg-white text-[#302A26]/70 border border-[#D8C3A5] hover:border-[#A65F46] hover:text-[#A65F46]"
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Activities grid */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-[80px] max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-[#302A26]/50 text-[14px] leading-relaxed max-w-2xl">
            {isId
              ? "Catatan: Dokumentasi kegiatan pelatihan, sertifikasi, dan pengabdian masyarakat PARJONO KERAMIK JAYA bersama dinas, pengrajin lokal, dan institusi pendidikan."
              : "Note: Activity titles, dates, and locations below showcase training, certification, and community development programs by PARJONO KERAMIK JAYA."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#F5F1E8] text-[#7A8065] text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                    {isId ? (typeMap[activity.type]?.id ?? activity.type) : activity.type}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[18px] text-[#302A26] mb-2">
                  {activity.title}
                </h3>
                <div className="flex flex-col gap-1 mb-3">
                  <p className="text-[#302A26]/45 text-[12px]">
                    {activity.date}
                  </p>
                  <p className="text-[#302A26]/45 text-[12px]">
                    {activity.location}
                  </p>
                </div>
                <p className="text-[#302A26]/60 text-[13px] leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
