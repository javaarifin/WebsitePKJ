import { useState } from "react"
import { NavigateFn } from "../App"
import { useAppStore } from "../context/AppContext"

interface Props {
  navigate: NavigateFn
}

const catMap: Record<string, { en: string; id: string }> = {
  All: { en: "All", id: "Semua" },
  Company: { en: "Company", id: "Perusahaan" },
  Exhibition: { en: "Exhibition", id: "Pameran" },
  Training: { en: "Training", id: "Pelatihan" },
  Product: { en: "Product", id: "Produk" },
  Export: { en: "Export", id: "Ekspor" },
}

const catKeys = ["All", "Company", "Exhibition", "Training", "Product", "Export"]

export default function NewsPage({ navigate }: Props) {
  const { news, lang } = useAppStore()
  const isId = lang === "id"
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleCount, setVisibleCount] = useState(6)

  const filtered =
    activeCategory === "All"
      ? news
      : news.filter((n) => n.category === activeCategory)
  const visible = filtered.slice(0, visibleCount)

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        style={{ backgroundColor: "#302A26" }}
        className="py-24 relative overflow-hidden"
      >
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
            {isId ? "Kabar & Cerita" : "News"}
          </p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">
            {isId ? "Kisah & Kegiatan" : "Stories & Activities"}
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {isId
              ? "Temukan kegiatan terkini, partisipasi pameran, program pelatihan, dan wawasan kriya dari PARJONO KERAMIK JAYA."
              : "Discover the latest activities, exhibitions, training, and stories from PARJONO KERAMIK JAYA."}
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section
        style={{ backgroundColor: "#F5F1E8" }}
        className="sticky top-[72px] z-30 border-b border-[#D8C3A5]/60"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap gap-2">
          {catKeys.map((cat) => {
            const label = isId ? catMap[cat]?.id : catMap[cat]?.en
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setVisibleCount(6)
                }}
                className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-all ${
                  activeCategory === cat
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

      {/* News grid */}
      <section className="py-[80px] max-w-[1280px] mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-[24px] text-[#302A26]/40 mb-3">
              {isId ? "Belum ada berita dalam kategori ini" : "No articles in this category"}
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="text-[#A65F46] font-medium text-sm hover:underline"
            >
              {isId ? "Tampilkan semua" : "Show all"}
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {visible.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate("news-detail", { newsId: item.id })}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-[#F5F1E8] text-[#A65F46] text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                        {isId ? (catMap[item.category]?.id ?? item.category) : item.category}
                      </span>
                      <span className="text-[#302A26]/40 text-[12px]">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-[18px] text-[#302A26] mb-2 group-hover:text-[#A65F46] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#302A26]/55 text-[13px] leading-relaxed mb-4 line-clamp-3">
                      {item.excerpt || item.body.slice(0, 140) + "..."}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[#A65F46] text-[13px] font-semibold group-hover:gap-2 transition-all">
                      {isId ? "Baca Selengkapnya" : "Read More"}
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="text-center">
                <button
                  onClick={() => setVisibleCount((c) => c + 6)}
                  className="border-2 border-[#A65F46] text-[#A65F46] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#A65F46] hover:text-white transition-all duration-200"
                >
                  {isId ? "Muat Lebih Banyak" : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
