import { NavigateFn } from '../App'
import { IMAGES } from '../data'
import { useAppStore } from '../context/AppContext'

interface Props {
  navigate: NavigateFn
}

export default function AboutPage({ navigate }: Props) {
  const { lang, t } = useAppStore()

  const values =
    lang === 'id'
      ? [
          {
            title: 'Keahlian Tradisi',
            desc: 'Menghargai proses buatan tangan dan keterampilan warisan leluhur.',
          },
          {
            title: 'Kualitas Mutu',
            desc: 'Komitmen penuh pada konsistensi material tanah liat dan standar pembakaran.',
          },
          {
            title: 'Kepercayaan',
            desc: 'Membangun kemitraan jangka panjang dengan pelanggan dan mitra dagang internasional.',
          },
          {
            title: 'Pertumbuhan',
            desc: 'Terus belajar melalui pengalaman pameran, inovasi desain, dan kolaborasi kriya.',
          },
        ]
      : [
          {
            title: 'Craftsmanship',
            desc: 'Respect for handmade processes and traditional skills.',
          },
          {
            title: 'Quality',
            desc: 'Commitment to consistent product quality and materials.',
          },
          {
            title: 'Reliability',
            desc: 'Building long-term relationships with customers and partners.',
          },
          {
            title: 'Growth',
            desc: 'Continuously learning through experience, exhibitions, and collaboration.',
          },
        ]

  const timeline =
    lang === 'id'
      ? [
          {
            year: '2003',
            title: 'Pendirian Usaha',
            desc: 'PARJONO KERAMIK JAYA didirikan di Klisat, Srihardono, Pundong, Bantul, Yogyakarta.',
          },
          {
            year: '2010',
            title: 'Ekspansi Workshop & Mitra Pengrajin',
            desc: 'Memperluas kapasitas bengkel kerja dan membina puluhan perajin lokal di Bantul.',
          },
          {
            year: '2016',
            title: 'Pengembangan Standar Ekspor',
            desc: 'Mulai melayani pesanan pembeli internasional dengan kemasan kayu dan peti palet berstandar ekspor.',
          },
          {
            year: '2020',
            title: 'Inovasi Desain Kontemporer',
            desc: 'Menghadirkan ragam bentuk pot tanaman dan vas terakota yang sesuai dengan tren dekorasi modern.',
          },
          {
            year: '2024',
            title: 'Partisipasi Pameran Global & Terpercaya',
            desc: 'Konsisten berpartisipasi dalam pameran dagang kriya dan siap menjangkau lebih banyak pasar dunia.',
          },
        ]
      : [
          {
            year: '2003',
            title: 'Company Established',
            desc: 'PARJONO KERAMIK JAYA was founded in Klisat, Srihardono, Pundong, Bantul, Yogyakarta.',
          },
          {
            year: '2010',
            title: 'Workshop Expansion',
            desc: 'Expanded production workshop capacity and built strong artisan partnerships in Bantul.',
          },
          {
            year: '2016',
            title: 'Export Packaging Standards',
            desc: 'Adopted international shipping and wooden crate packaging standards for global markets.',
          },
          {
            year: '2020',
            title: 'Contemporary Design Evolution',
            desc: 'Introduced minimalist and rustic pottery shapes tailored for modern interior trends.',
          },
          {
            year: '2024',
            title: 'Global Trade & Continuous Craft',
            desc: 'Actively participating in trade exhibitions and supplying authentic Indonesian craft worldwide.',
          },
        ]

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section style={{ backgroundColor: '#302A26' }} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.intro} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#302A26]/80" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[#D8C3A5] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
            {t.nav.about}
          </p>
          <h1 className="font-display text-[52px] font-bold text-white mb-4">
            {lang === 'id' ? 'Kisah Perjalanan Kami' : 'Our Story'}
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {lang === 'id'
              ? 'Dedikasi kriya tanah liat dan gerabah autentik sejak 2003 di Yogyakarta.'
              : 'A journey of craftsmanship and dedication since 2003.'}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
              {lang === 'id' ? 'Tentang Perusahaan' : 'Company Story'}
            </p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-6">
              {lang === 'id' ? 'Berakar di Bantul, Yogyakarta' : 'Rooted in Yogyakarta'}
            </h2>
            <p className="text-[#7A8065] text-[13px] font-semibold tracking-wide mb-4">
              Klisat, Srihardono, Pundong, Bantul, Yogyakarta, Indonesia
            </p>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              {lang === 'id'
                ? 'PARJONO KERAMIK JAYA adalah produsen kriya gerabah dan terakota yang berakar kuat pada tradisi tembikar Bantul, Yogyakarta. Didirikan pada tahun 2003, usaha kami berkembang berkat ketekunan tangan, pengalaman bertahun-tahun, dan komitmen tulus pada mutu produk.'
                : 'PARJONO KERAMIK JAYA is a terracotta and clay craft company rooted in the rich pottery tradition of Bantul, Yogyakarta. Established in 2003, the company has developed through years of hands-on craftsmanship, dedication, and an ongoing commitment to quality.'}
            </p>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              {lang === 'id'
                ? 'Berasal dari kawasan Klisat Pundong yang masyhur dengan warisan kerajinan tanah liat, kami mengolah lempung alami lokal menggunakan teknik putar dan tempa tradisional, menghasilkan produk yang kuat, fungsional, dan sarat nilai budaya nusantara.'
                : 'Located in Klisat, Srihardono, Pundong — an area with a long heritage in clay craft — we work with natural materials sourced locally, applying traditional forming techniques to create products that are both functional and culturally significant.'}
            </p>
            <p className="text-[#302A26]/70 leading-relaxed">
              {lang === 'id'
                ? 'Kami melayani kebutuhan pelanggan di dalam negeri maupun pembeli mancanegara, dilandasi keyakinan bahwa karya kriya tangan asli Yogyakarta pantas hadir dan menghiasi berbagai hunian di seluruh dunia.'
                : 'Our work serves both domestic customers and international buyers, reflecting our belief that quality handcraft from Yogyakarta deserves a place in homes and spaces around the world.'}
            </p>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-[#D8C3A5] shadow-xs">
              <img
                src={IMAGES.craftsmanWoman}
                alt="Artisan at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Journey Timeline */}
      <section style={{ backgroundColor: '#F5F1E8' }} className="py-[100px] border-y border-[#D8C3A5]/40">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
              {lang === 'id' ? 'Tonggak Sejarah' : 'Our History'}
            </p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26]">
              {lang === 'id' ? 'Jejak Perjalanan Usaha' : 'Company Journey'}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#D8C3A5]" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-8 items-start pl-0">
                  <div className="relative flex-shrink-0 w-16 text-right">
                    <span className="font-display font-bold text-[#A65F46] text-[15px]">
                      {item.year}
                    </span>
                    <div className="absolute right-[-33px] top-1.5 w-4 h-4 rounded-full bg-[#A65F46] border-4 border-[#F5F1E8]" />
                  </div>
                  <div className="pb-4">
                    <h3 className="font-display font-semibold text-[20px] text-[#302A26] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#302A26]/60 leading-relaxed text-[14px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5] shadow-xs">
            <img
              src={IMAGES.craftsman2}
              alt="Workshop craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
              {lang === 'id' ? 'Keahlian Tangan' : 'Craftsmanship'}
            </p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-6">
              {lang === 'id' ? 'Sentuhan Tangan di Setiap Karya' : 'Made by Hand, Every Time'}
            </h2>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              {lang === 'id'
                ? 'Setiap produk yang meninggalkan bengkel kami dibentuk secara manual dengan tangan. Kami tidak mengandalkan cetakan massal mesin otomatis — sebaliknya, kami merawat keahlian putar tanah liat yang telah diasah turun-temurun di Yogyakarta.'
                : 'Every product that leaves our workshop is shaped by hand. We do not rely on mass-production methods — instead, we apply traditional clay-forming techniques that have been practised in Yogyakarta for generations.'}
            </p>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              {lang === 'id'
                ? 'Hal ini membuat setiap pot dan gerabah memiliki variasi alami dan jiwa tersendiri yang hanya dimiliki kriya autentik. Perbedaan halus antar produk bukanlah cacat, melainkan bukti otentik kerja tangan perajin.'
                : 'This means each piece carries the natural variation and character that only genuine handcraft can provide. Minor differences between pieces are not imperfections — they are the mark of authenticity.'}
            </p>
            <p className="text-[#302A26]/70 leading-relaxed">
              {lang === 'id'
                ? 'Mulai dari seleksi tanah liat lempung, pembentukan, pengeringan teduh, pembakaran kayu bertahap, hingga inspeksi akhir, semua proses dikerjakan dengan penuh dedikasi.'
                : 'From raw clay selection to final inspection, every step is managed with care and attention to maintain the standards our customers expect.'}
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section style={{ backgroundColor: '#D8C3A5' }} className="py-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
              {lang === 'id' ? 'Nilai Pokok' : 'What We Believe'}
            </p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26]">
              {lang === 'id' ? 'Nilai-Nilai Kriya Kami' : 'Our Values'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-8 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#A65F46]/10 flex items-center justify-center mb-5">
                  <div className="w-3 h-3 rounded-full bg-[#A65F46]" />
                </div>
                <h3 className="font-display font-semibold text-[20px] text-[#302A26] mb-3">
                  {v.title}
                </h3>
                <p className="text-[#302A26]/60 text-[14px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Experience */}
      <section className="py-[100px] max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#A65F46] text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">
              {lang === 'id' ? 'Jangkauan Ekspor' : 'International Reach'}
            </p>
            <h2 className="font-display text-[40px] font-bold text-[#302A26] mb-6">
              {t.nav.exportExperience}
            </h2>
            <p className="text-[#302A26]/70 leading-relaxed mb-5">
              {lang === 'id'
                ? 'PARJONO KERAMIK JAYA memiliki rekam jejak dalam melayani pengiriman pesanan ke pasar internasional. Produk kami telah dikirimkan ke berbagai pembeli luar negeri dengan kepatuhan standar kemasan pelindung dan sertifikasi mutu.'
                : 'PARJONO KERAMIK JAYA has experience serving international markets. Our products have been prepared and shipped to buyers outside Indonesia, reflecting our capability to meet international quality and packaging requirements.'}
            </p>
            <p className="text-[#302A26]/70 leading-relaxed mb-8">
              {lang === 'id'
                ? 'Kami menyambut hangat komunikasi dari para pembeli grosir, importir, dan distributor mancanegara yang berminat memasarkan kerajinan terakota asli Indonesia.'
                : 'We welcome inquiries from international buyers, distributors, and retail partners interested in authentic Indonesian terracotta craft.'}
            </p>
            <button
              onClick={() => navigate('export')}
              className="inline-flex items-center gap-2 bg-[#A65F46] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#8f5239] transition-colors shadow-xs"
            >
              <span>{lang === 'id' ? 'Pelajari Pengalaman Ekspor' : 'Learn About Our Export Experience'}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#D8C3A5] shadow-xs">
            <img
              src={IMAGES.export1}
              alt="Products prepared for export"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#302A26' }} className="py-[80px]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="font-display text-[36px] font-bold text-white mb-4">
            {lang === 'id' ? 'Siap Berkolaborasi Bersama Kami?' : 'Ready to work with us?'}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            {lang === 'id'
              ? 'Hubungi kami untuk mendiskusikan pesanan kustom, katalog harga grosir, atau peluang kerja sama ekspor.'
              : 'Get in touch to discuss your requirements, products, or business partnership opportunities.'}
          </p>
          <button
            onClick={() => navigate('contact')}
            className="bg-[#A65F46] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#8f5239] transition-colors shadow-xs"
          >
            {t.nav.contactUs}
          </button>
        </div>
      </section>
    </div>
  )
}
