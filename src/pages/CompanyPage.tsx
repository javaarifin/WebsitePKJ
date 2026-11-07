import { NavigateFn, Page } from '../App'
import { IMAGES } from '../data'
import { useAppStore } from '../context/AppContext'
import { PKJ_LOGO } from '../assets/logo'

interface Props {
  navigate: NavigateFn
}

export default function CompanyPage({ navigate }: Props) {
  const { lang, t } = useAppStore()

  const companyCards: { title: string; desc: string; page: Page; image: string }[] = [
    {
      title: t.nav.companyProfile,
      desc:
        lang === 'id'
          ? 'Pelajari sejarah bengkel kami, lokasi di Bantul, dan nilai kriya yang kami pegang.'
          : 'Learn about our history, workshop location in Bantul, and the values that guide our craft.',
      page: 'about',
      image: IMAGES.intro,
    },
    {
      title: t.nav.exportExperience,
      desc:
        lang === 'id'
          ? 'Telusuri rekam jejak kami dalam melayani pesanan pasar ekspor internasional.'
          : 'Discover our experience serving international markets with high quality terracotta goods.',
      page: 'export',
      image: IMAGES.export1,
    },
    {
      title: t.nav.awards,
      desc:
        lang === 'id'
          ? 'Apresiasi dan pengakuan atas dedikasi mutu kriya gerabah selama puluhan tahun.'
          : 'Recognition and achievements earned through years of dedicated craftsmanship.',
      page: 'awards',
      image:
        'https://images.unsplash.com/photo-1557128712-4ab4dc147a71?w=600&h=400&fit=crop&auto=format',
    },
    {
      title: t.nav.exhibitions,
      desc:
        lang === 'id'
          ? 'Keikutsertaan kami dalam berbagai ajang pameran dagang kriya di Indonesia dan mancanegara.'
          : 'Our presence at exhibitions and trade events in Indonesia and beyond.',
      page: 'exhibitions',
      image:
        'https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=600&h=400&fit=crop&auto=format',
    },
    {
      title: t.nav.training,
      desc:
        lang === 'id'
          ? 'Program pelatihan, lokakarya kriya, dan aktivitas pemberdayaan masyarakat yang kami ikuti.'
          : 'Training programs, artisan workshops, and community activities we actively participate in.',
      page: 'training',
      image: IMAGES.craftsman2,
    },
  ]

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={IMAGES.craftsmanWoman} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#302A26]/80" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center flex flex-col items-center">
          <div className="bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-white/20 inline-block mb-6 hover:scale-105 transition-transform">
            <img
              src={PKJ_LOGO}
              alt="PARJONO KERAMIK JAYA Logo"
              className="h-14 md:h-18 w-auto object-contain"
            />
          </div>
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
            {t.nav.company}
          </p>
          <h1 className="font-display text-[46px] md:text-[56px] font-bold text-white mb-4">
            PARJONO KERAMIK JAYA
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {lang === 'id'
              ? 'Dibuat dengan tangan di Yogyakarta. Berpengalaman sejak 2003. Siap untuk dunia.'
              : 'Handcrafted in Yogyakarta. Experienced since 2003. Ready for the world.'}
          </p>
        </div>
      </section>

      {/* Navigation cards */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-[36px] font-bold text-[#302A26] mb-3">
            {lang === 'id' ? 'Mengenal Perusahaan Lebih Dekat' : 'Explore the Company'}
          </h2>
          <p className="text-[#302A26]/60 max-w-lg mx-auto">
            {lang === 'id'
              ? 'Pilih halaman di bawah untuk mengetahui profil, pengalaman ekspor, prestasi, dan aktivitas kami.'
              : 'Discover more about our company profile, export experience, achievements, and activities.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companyCards.map(card => (
            <div
              key={card.page}
              onClick={() => navigate(card.page)}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer group transition-all duration-300 hover:-translate-y-1 border border-[#D8C3A5]/40"
            >
              <div className="aspect-[16/10] bg-[#D8C3A5]/30 overflow-hidden">
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
                <p className="text-[#302A26]/60 text-[13px] leading-relaxed mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#A65F46] text-[13px] font-semibold group-hover:gap-2 transition-all">
                  {lang === 'id' ? 'Kunjungi Halaman' : 'Learn More'}
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview stats band */}
      <section style={{ backgroundColor: '#D8C3A5' }} className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-display text-[40px] font-bold text-[#302A26] mb-1">2003</p>
            <p className="text-[#302A26]/70 text-sm font-semibold">{t.home.statEstablished}</p>
          </div>
          <div>
            <p className="font-display text-[40px] font-bold text-[#302A26] mb-1">20+</p>
            <p className="text-[#302A26]/70 text-sm font-semibold">{t.home.statExperience}</p>
          </div>
          <div>
            <p className="font-display text-[40px] font-bold text-[#302A26] mb-1">Bantul</p>
            <p className="text-[#302A26]/70 text-sm font-semibold">
              {lang === 'id' ? 'Pusat Kriya Gerabah' : 'Clay Pottery Heritage'}
            </p>
          </div>
          <div>
            <p className="font-display text-[40px] font-bold text-[#302A26] mb-1">Global</p>
            <p className="text-[#302A26]/70 text-sm font-semibold">{t.home.statExport}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
