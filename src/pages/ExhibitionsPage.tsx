import { NavigateFn } from "../App"
import { useAppStore } from "../context/AppContext"

interface Props {
  navigate: NavigateFn
}

export default function ExhibitionsPage({ navigate }: Props) {
  const { exhibitions, lang } = useAppStore()
  const isId = lang === "id"

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        style={{ backgroundColor: "#302A26" }}
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=1400&h=600&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#302A26]/80" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
            {isId ? "Perusahaan" : "Company"}
          </p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">
            {isId ? "Pameran & Ekshibisi" : "Exhibitions"}
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {isId
              ? "Partisipasi aktif kami dalam berbagai pameran kriya di tingkat nasional maupun mancanegara."
              : "Our participation in exhibitions across Indonesia and beyond."}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 max-w-[1280px] mx-auto px-6">
        <p className="text-[#302A26]/50 text-[14px] leading-relaxed max-w-2xl">
          {isId
            ? "Dokumentasi dan partisipasi pameran kriya keramik gerabah PARJONO KERAMIK JAYA di tingkat nasional maupun internasional."
            : "Documentation and records of craft exhibitions and trade shows attended by PARJONO KERAMIK JAYA."}
        </p>
      </section>

      {/* Exhibition timeline */}
      <section className="pb-[100px] max-w-[1280px] mx-auto px-6">
        {exhibitions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#D8C3A5]/40">
            <p className="font-display text-[24px] text-[#302A26]/40 mb-3">
              {isId ? "Belum ada agenda pameran" : "No exhibitions recorded yet"}
            </p>
            <p className="text-xs text-[#302A26]/60">
              {isId
                ? "Data pameran dapat ditambahkan melalui panel admin."
                : "Exhibitions data can be added via the admin dashboard."}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {exhibitions.map((ex, idx) => (
              <div
                key={ex.id}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {idx % 2 === 0 ? (
                  <>
                    <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5]">
                      <img
                        src={ex.image}
                        alt={ex.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
                        {ex.year}
                      </p>
                      <h2 className="font-display text-[32px] font-bold text-[#302A26] mb-2">
                        {ex.name}
                      </h2>
                      <p className="text-[#7A8065] text-[14px] font-medium mb-4">
                        {ex.location}
                      </p>
                      <p className="text-[#302A26]/65 leading-relaxed">
                        {ex.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="order-2 lg:order-1">
                      <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
                        {ex.year}
                      </p>
                      <h2 className="font-display text-[32px] font-bold text-[#302A26] mb-2">
                        {ex.name}
                      </h2>
                      <p className="text-[#7A8065] text-[14px] font-medium mb-4">
                        {ex.location}
                      </p>
                      <p className="text-[#302A26]/65 leading-relaxed">
                        {ex.description}
                      </p>
                    </div>
                    <div className="order-1 lg:order-2 rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5]">
                      <img
                        src={ex.image}
                        alt={ex.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
