import { NavigateFn } from "../App"
import { useAppStore } from "../context/AppContext"

interface Props {
  navigate: NavigateFn
  newsId?: number
}

export default function NewsDetailPage({ navigate, newsId }: Props) {
  const { news, lang, t } = useAppStore()
  const isId = lang === "id"
  const article = news.find((n) => n.id === newsId) || news[0]
  const related = news.filter((n) => article && n.id !== article.id).slice(0, 3)

  if (!article) {
    return (
      <div className="pt-[72px] min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-display text-2xl font-bold text-[#302A26] mb-2">
          {isId ? "Artikel Tidak Ditemukan" : "Article Not Found"}
        </h2>
        <p className="text-xs text-[#302A26]/60 mb-6">
          {isId
            ? "Artikel mungkin telah dihapus atau belum tersedia."
            : "The article may have been removed or is currently unavailable."}
        </p>
        <button
          onClick={() => navigate("news")}
          className="bg-[#A65F46] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#8f5239] transition-colors"
        >
          {isId ? "Kembali ke Daftar Berita" : "Back to All Stories"}
        </button>
      </div>
    )
  }

  return (
    <div className="pt-[72px]">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center gap-2 text-[13px] text-[#302A26]/50">
        <button
          onClick={() => navigate("home")}
          className="hover:text-[#A65F46] transition-colors"
        >
          {t.nav.home}
        </button>
        <span>/</span>
        <button
          onClick={() => navigate("news")}
          className="hover:text-[#A65F46] transition-colors"
        >
          {t.nav.news}
        </button>
        <span>/</span>
        <span className="text-[#302A26] truncate max-w-xs font-medium">
          {article.title}
        </span>
      </div>

      {/* Article */}
      <article className="max-w-[800px] mx-auto px-6 py-10">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#A65F46]/10 text-[#A65F46] text-[11px] font-semibold px-3 py-1.5 rounded-full tracking-wide">
              {article.category}
            </span>
            <span className="text-[#302A26]/45 text-[13px]">
              {article.date}
            </span>
          </div>
          <h1 className="font-display text-[40px] md:text-[48px] font-bold text-[#302A26] leading-[1.15] mb-6">
            {article.title}
          </h1>
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden aspect-video bg-[#D8C3A5] mb-10 shadow-sm">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Body */}
        <div className="prose prose-lg max-w-none">
          {article.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-[#302A26]/75 leading-relaxed mb-5 text-[16px]"
            >
              {para}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-12 p-8 rounded-2xl"
          style={{ backgroundColor: "#D8C3A5" }}
        >
          <h3 className="font-display text-[24px] font-bold text-[#302A26] mb-3">
            {isId ? "Tertarik dengan Kerajinan Kami?" : "Contact PARJONO KERAMIK JAYA"}
          </h3>
          <p className="text-[#302A26]/75 mb-6 leading-relaxed">
            {isId
              ? "Tertarik dengan produk gerabah kami atau ingin berkolaborasi untuk proyek kriya? Hubungi kami sekarang."
              : "Interested in our handcrafted products or want to discuss custom clay projects? Get in touch with us."}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("contact")}
              className="bg-[#A65F46] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#8f5239] transition-colors"
            >
              {t.nav.contact}
            </button>
            <button
              onClick={() => navigate("products")}
              className="border-2 border-[#302A26]/30 text-[#302A26] font-semibold px-6 py-3 rounded-lg hover:border-[#A65F46] hover:text-[#A65F46] transition-colors"
            >
              {t.nav.products}
            </button>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section style={{ backgroundColor: "#F5F1E8" }} className="py-16">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="font-display text-[28px] font-bold text-[#302A26] mb-8">
              {isId ? "Artikel Terkait" : "Related Articles"}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate("news-detail", { newsId: item.id })}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group transition-all"
                >
                  <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#A65F46] text-[11px] font-semibold tracking-wide">
                        {item.category}
                      </span>
                      <span className="text-[#302A26]/35 text-[11px]">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-[16px] text-[#302A26] group-hover:text-[#A65F46] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
