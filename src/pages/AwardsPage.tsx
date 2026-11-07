import { NavigateFn } from "../App"
import { useAppStore } from "../context/AppContext"

interface Props {
  navigate: NavigateFn
}

export default function AwardsPage({ navigate }: Props) {
  const { awards, lang, t } = useAppStore()
  const isId = lang === "id"

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        style={{ backgroundColor: "#302A26" }}
        className="py-16 sm:py-24 relative overflow-hidden"
      >
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3 sm:mb-4">
            {isId ? "Penghargaan" : "Recognition"}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {isId ? "Penghargaan & Prestasi" : "Awards & Achievements"}
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
            {isId
              ? "Apresiasi dan pengakuan atas dedikasi bertahun-tahun dalam menjaga mutu kriya dan tradisi gerabah Indonesia."
              : "Recognition earned through years of dedication to handcraft quality and Indonesian craft tradition."}
          </p>
        </div>
      </section>

      {/* Awards grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-[100px] max-w-[1280px] mx-auto px-4 sm:px-6">
        {awards.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="font-display text-xl sm:text-[24px] text-[#302A26]/40 mb-3">
              {isId ? "Belum ada data penghargaan" : "No awards recorded yet"}
            </p>
            <p className="text-xs sm:text-sm text-[#302A26]/60">
              {isId
                ? "Data penghargaan dapat dikelola melalui dashboard admin."
                : "Awards records can be managed via the admin dashboard."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-video bg-[#D8C3A5] overflow-hidden">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#A65F46]/10 text-[#A65F46] text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                        {award.year}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-[20px] text-[#302A26] mb-1">
                      {award.title}
                    </h3>
                    <p className="text-[#7A8065] text-[13px] font-medium mb-3">
                      {award.organization}
                    </p>
                    <p className="text-[#302A26]/60 text-[13px] leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Commitment section */}
      <section style={{ backgroundColor: "#D8C3A5" }} className="py-12 sm:py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#302A26] mb-4 sm:mb-5">
            {isId ? "Komitmen Terhadap Mutu" : "Committed to Quality"}
          </h2>
          <p className="text-[#302A26]/65 max-w-xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
            {isId
              ? "Setiap apresiasi yang diraih memotivasi kami untuk terus menjaga mutu karya kriya gerabah dan melestarikan warisan terakota Kasongan ke panggung global."
              : "Our recognition reflects our ongoing commitment to quality craftsmanship and the promotion of Indonesian clay and terracotta traditions."}
          </p>
          <button
            onClick={() => navigate("contact")}
            className="w-full sm:w-auto bg-[#A65F46] text-white font-semibold px-8 py-3.5 sm:py-4 rounded-xl hover:bg-[#8f5239] transition-colors text-sm sm:text-base"
          >
            {isId ? "Hubungi & Kerjasama" : "Work With Us"}
          </button>
        </div>
      </section>
    </div>
  )
}
