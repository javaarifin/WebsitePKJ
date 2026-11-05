import { useState } from "react"
import { NavigateFn } from "../App"
import { useAppStore } from "../context/AppContext"

interface Props {
  navigate: NavigateFn
}

const catMap: Record<string, { en: string; id: string }> = {
  All: { en: "All", id: "Semua" },
  Products: { en: "Products", id: "Produk" },
  Workshop: { en: "Workshop", id: "Workshop" },
  Craftsmanship: { en: "Craftsmanship", id: "Pengerjaan" },
  Exhibition: { en: "Exhibition", id: "Pameran" },
  Export: { en: "Export", id: "Ekspor" },
  Activities: { en: "Activities", id: "Kegiatan" },
}

const catKeys = [
  "All",
  "Products",
  "Workshop",
  "Craftsmanship",
  "Exhibition",
  "Export",
  "Activities",
]

export default function GalleryPage({ navigate }: Props) {
  const { gallery, lang } = useAppStore()
  const isId = lang === "id"
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const filtered =
    activeCategory === "All"
      ? gallery
      : gallery.filter((g) => g.category === activeCategory)

  const close = () => setLightboxIdx(null)
  const prev = () => setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i))
  const next = () =>
    setLightboxIdx((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i))

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        style={{ backgroundColor: "#302A26" }}
        className="py-24 relative overflow-hidden"
      >
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
            {isId ? "Arsip Visual" : "Visual Archive"}
          </p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">
            {isId ? "Galeri Foto" : "Gallery"}
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {isId
              ? "Potret mendalam produk kriya, bengkel kerja, keahlian tangan, dan aktivitas PARJONO KERAMIK JAYA."
              : "A closer look at our products, workshop, craftsmanship, and activities."}
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
                onClick={() => setActiveCategory(cat)}
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

      {/* Masonry-style grid */}
      <section className="py-[80px] max-w-[1280px] mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-[24px] text-[#302A26]/40 mb-3">
              {isId ? "Belum ada foto dalam kategori ini" : "No photos in this category"}
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="text-[#A65F46] font-medium text-sm hover:underline"
            >
              {isId ? "Tampilkan semua foto" : "Show all photos"}
            </button>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIdx(idx)}
                className="break-inside-avoid rounded-xl overflow-hidden bg-[#D8C3A5] cursor-pointer group relative block mb-4"
              >
                <img
                  src={img.src}
                  alt={img.alt || img.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#302A26]/0 group-hover:bg-[#302A26]/40 transition-colors duration-300 flex items-end p-4">
                  <p className="text-white text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity leading-tight">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && filtered[lightboxIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 text-white/60 hover:text-white w-10 h-10 flex items-center justify-center z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-5 text-white/60 hover:text-white w-10 h-10 flex items-center justify-center z-10"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="px-16 max-w-5xl w-full mx-auto"
          >
            <img
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].alt || filtered[lightboxIdx].caption}
              className="max-h-[80vh] max-w-full object-contain rounded-xl mx-auto block"
            />
            <div className="text-center mt-4">
              <p className="text-white/70 text-sm">
                {filtered[lightboxIdx].caption}
              </p>
              <p className="text-white/35 text-[12px] mt-1">
                {activeCategory === "All"
                  ? (isId ? (catMap[filtered[lightboxIdx].category]?.id ?? filtered[lightboxIdx].category) : filtered[lightboxIdx].category)
                  : (isId ? catMap[activeCategory]?.id : activeCategory)}{" "}
                · {lightboxIdx + 1} / {filtered.length}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-5 text-white/60 hover:text-white w-10 h-10 flex items-center justify-center z-10"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
