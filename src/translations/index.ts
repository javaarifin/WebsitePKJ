export type Lang = 'en' | 'id'

export interface TranslationDictionary {
  // Nav
  nav: {
    home: string
    about: string
    products: string
    news: string
    gallery: string
    contact: string
    company: string
    companyProfile: string
    exportExperience: string
    awards: string
    exhibitions: string
    training: string
    contactUs: string
    admin: string
    language: string
  }
  // Footer
  footer: {
    tagline: string
    navigation: string
    company: string
    contact: string
    phone: string
    whatsapp: string
    email: string
    rights: string
    madeIn: string
    adminPortal: string
  }
  // Home
  home: {
    heroTag: string
    heroTitle1: string
    heroTitle2: string
    heroSubtitle: string
    exploreBtn: string
    contactBtn: string
    statEstablished: string
    statExperience: string
    statExport: string
    statProducts: string
    processTag: string
    processTitle: string
    processSubtitle: string
    step1Title: string
    step1Desc: string
    step2Title: string
    step2Desc: string
    step3Title: string
    step3Desc: string
    step4Title: string
    step4Desc: string
    step5Title: string
    step5Desc: string
    aboutTag: string
    aboutTitle: string
    aboutDesc1: string
    aboutDesc2: string
    readStory: string
    featuredTag: string
    featuredTitle: string
    viewAllProducts: string
    awardsTag: string
    awardsTitle: string
    viewAllAwards: string
    exhibitionsTag: string
    exhibitionsTitle: string
    viewAllExhibitions: string
    newsTag: string
    newsTitle: string
    newsSubtitle: string
    readMore: string
    viewAllNews: string
    galleryTag: string
    galleryTitle: string
    viewAllGallery: string
    ctaTitle1: string
    ctaTitle2: string
    ctaDesc: string
    chatWa: string
  }
  // Products
  products: {
    title: string
    subtitle: string
    searchPlaceholder: string
    allCategories: string
    catTerracotta: string
    catClayPottery: string
    catGarden: string
    catHomeDecoration: string
    catCustom: string
    noProducts: string
    viewDetails: string
    inquireBtn: string
    material: string
    size: string
    weight: string
    finish: string
    moq: string
    backToCatalog: string
    relatedProducts: string
    inquiryFormTitle: string
    inquiryFormDesc: string
  }
  // Contact
  contact: {
    tag: string
    title: string
    subtitle: string
    infoTitle: string
    formTitle: string
    formSubtitle: string
    nameLabel: string
    namePlaceholder: string
    companyLabel: string
    companyPlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    subjectLabel: string
    subjectPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    sendBtn: string
    successTitle: string
    successDesc: string
    sendAnotherBtn: string
  }
  // Common
  common: {
    readMore: string
    learnMore: string
    loading: string
    back: string
    showAll: string
    chatWa: string
  }
}

export const translations: Record<Lang, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      news: 'News',
      gallery: 'Gallery',
      contact: 'Contact',
      company: 'Company',
      companyProfile: 'Company Profile',
      exportExperience: 'Export Experience',
      awards: 'Awards & Achievements',
      exhibitions: 'Exhibitions',
      training: 'Training & Activities',
      contactUs: 'Contact Us',
      admin: 'Admin',
      language: 'Language',
    },
    footer: {
      tagline:
        'Handcrafted terracotta and clay products from Bantul, Yogyakarta, Indonesia. Established in 2003 with a commitment to quality and traditional craftsmanship.',
      navigation: 'Navigation',
      company: 'Company',
      contact: 'Contact',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      rights: '© PARJONO KERAMIK JAYA. All Rights Reserved.',
      madeIn: 'Handcrafted in Yogyakarta, Indonesia',
      adminPortal: 'Admin Portal',
    },
    home: {
      heroTag: 'HANDCRAFTED TERRACOTTA · YOGYAKARTA, INDONESIA',
      heroTitle1: 'Natural Clay,',
      heroTitle2: 'Timeless Craft',
      heroSubtitle:
        'From our workshop in Bantul, Yogyakarta, we handcraft authentic terracotta and clay pottery for homes, gardens, and international destinations.',
      exploreBtn: 'Explore Products',
      contactBtn: 'Contact Us',
      statEstablished: 'Established',
      statExperience: 'Years of Experience',
      statExport: 'Export Experience',
      statProducts: 'Product Variations',
      processTag: 'OUR CRAFT PROCESS',
      processTitle: 'From Raw Clay to Finished Form',
      processSubtitle:
        'Every piece passes through skilled artisan hands and traditional wood-fired kilns, creating character that machinery cannot replicate.',
      step1Title: 'Material',
      step1Desc: 'Selection and preparation of locally sourced natural clay.',
      step2Title: 'Shaping',
      step2Desc: 'Handcrafted and formed with care on traditional pottery wheels.',
      step3Title: 'Drying',
      step3Desc: 'Carefully air-dried in controlled shade before firing.',
      step4Title: 'Firing',
      step4Desc: 'Fired at optimal temperatures to develop enduring strength and earthy character.',
      step5Title: 'Finishing',
      step5Desc: 'Final hand-finishing, smoothing, and strict quality inspection.',
      aboutTag: 'ABOUT PARJONO KERAMIK JAYA',
      aboutTitle: 'Two Decades of Javanese Clay Pottery Tradition',
      aboutDesc1:
        'Founded in 2003 in Klisat, Srihardono, Pundong, Bantul, PARJONO KERAMIK JAYA has grown from a local artisan workshop into a trusted producer of authentic Indonesian terracotta goods.',
      aboutDesc2:
        'We work closely with local artisans, preserving traditional throwing and forming techniques while adhering to contemporary export packaging and quality standards.',
      readStory: 'Read Our Story',
      featuredTag: 'CURATED COLLECTION',
      featuredTitle: 'Featured Terracotta Pottery',
      viewAllProducts: 'View All Products',
      awardsTag: 'RECOGNITION',
      awardsTitle: 'Experience Worth Sharing',
      viewAllAwards: 'View All Achievements',
      exhibitionsTag: 'COMPANY',
      exhibitionsTitle: 'Growing Through Experience',
      viewAllExhibitions: 'View Exhibition History',
      newsTag: 'STORIES & ACTIVITIES',
      newsTitle: 'Latest Activities & Stories',
      newsSubtitle:
        'Discover our recent exhibitions, community training, and craftsmanship stories from Yogyakarta.',
      readMore: 'Read More',
      viewAllNews: 'View All News',
      galleryTag: 'VISUAL ARCHIVE',
      galleryTitle: 'Gallery & Craftsmanship',
      viewAllGallery: 'View Full Gallery',
      ctaTitle1: 'Looking for Terracotta',
      ctaTitle2: 'from Indonesia?',
      ctaDesc:
        'Talk to us about our products, custom specifications, or potential business and export partnerships.',
      chatWa: 'WhatsApp Us',
    },
    products: {
      title: 'Our Products',
      subtitle:
        'Handcrafted terracotta planters, vases, rustic pots, and interior decor made from high-grade natural clay.',
      searchPlaceholder: 'Search products by name or material...',
      allCategories: 'All Products',
      catTerracotta: 'Terracotta',
      catClayPottery: 'Clay Pottery',
      catGarden: 'Garden',
      catHomeDecoration: 'Home Decoration',
      catCustom: 'Custom Made',
      noProducts: 'No products match your search or filter.',
      viewDetails: 'View Details',
      inquireBtn: 'Inquire Now',
      material: 'Material',
      size: 'Dimensions',
      weight: 'Approx. Weight',
      finish: 'Surface Finish',
      moq: 'Minimum Order',
      backToCatalog: 'Back to Products',
      relatedProducts: 'Related Products',
      inquiryFormTitle: 'Request a Wholesale or Custom Quote',
      inquiryFormDesc: 'Fill out this inquiry and our export team will respond within 24 hours.',
    },
    contact: {
      tag: 'GET IN TOUCH',
      title: 'Contact Us',
      subtitle:
        'We welcome inquiries for wholesale orders, bespoke design requests, and export collaborations worldwide.',
      infoTitle: 'Workshop & Head Office',
      formTitle: 'Send Us a Message',
      formSubtitle: 'Fill in your details below and our team will get back to you promptly.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. John Doe',
      companyLabel: 'Company / Business (Optional)',
      companyPlaceholder: 'e.g. Terra Living Co.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@company.com',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+62 / International format',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Wholesale inquiry, custom order, general question...',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Tell us about your requirements, destination port, or questions...',
      sendBtn: 'Send Message',
      successTitle: 'Thank You for Reaching Out!',
      successDesc:
        'Your message has been received. Our team will review your inquiry and contact you shortly.',
      sendAnotherBtn: 'Send Another Message',
    },
    common: {
      readMore: 'Read More',
      learnMore: 'Learn More',
      loading: 'Loading...',
      back: 'Back',
      showAll: 'Show All',
      chatWa: 'Chat with us',
    },
  },
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang Kami',
      products: 'Produk',
      news: 'Berita',
      gallery: 'Galeri',
      contact: 'Kontak',
      company: 'Perusahaan',
      companyProfile: 'Profil Perusahaan',
      exportExperience: 'Pengalaman Ekspor',
      awards: 'Penghargaan',
      exhibitions: 'Pameran',
      training: 'Pelatihan & Kegiatan',
      contactUs: 'Hubungi Kami',
      admin: 'Admin',
      language: 'Bahasa',
    },
    footer: {
      tagline:
        'Produk kerajinan gerabah dan terakota buatan tangan dari Bantul, Yogyakarta, Indonesia. Berdiri sejak tahun 2003 dengan komitmen mutu dan kearifan kriya tradisional.',
      navigation: 'Navigasi',
      company: 'Perusahaan',
      contact: 'Kontak Kami',
      phone: 'Telepon',
      whatsapp: 'WhatsApp',
      email: 'Email',
      rights: '© PARJONO KERAMIK JAYA. Seluruh Hak Cipta Dilindungi.',
      madeIn: 'Dibuat dengan Tangan di Yogyakarta, Indonesia',
      adminPortal: 'Portal Admin',
    },
    home: {
      heroTag: 'KRIYA TERAKOTA BUATAN TANGAN · YOGYAKARTA, INDONESIA',
      heroTitle1: 'Tanah Liat Alami,',
      heroTitle2: 'Kriya Sepanjang Masa',
      heroSubtitle:
        'Dari bengkel kerja kami di Bantul, Yogyakarta, kami membuat aneka gerabah dan keramik terakota autentik untuk hunian, taman, hingga tujuan ekspor mancanegara.',
      exploreBtn: 'Jelajahi Produk',
      contactBtn: 'Hubungi Kami',
      statEstablished: 'Tahun Berdiri',
      statExperience: 'Tahun Pengalaman',
      statExport: 'Pengalaman Ekspor',
      statProducts: 'Variasi Produk',
      processTag: 'PROSES KRIYA KAMI',
      processTitle: 'Dari Tanah Mentah Menjadi Karya Nyata',
      processSubtitle:
        'Setiap produk dibentuk langsung oleh tangan terampil para perajin dan dibakar di tungku tradisional, menghasilkan karakter unik yang tak tertandingi mesin.',
      step1Title: 'Bahan Baku',
      step1Desc: 'Pemilihan dan pengolahan tanah liat alami berkualitas dari Yogyakarta.',
      step2Title: 'Pembentukan',
      step2Desc: 'Dibentuk dengan cermat menggunakan teknik putar dan cetak tangan tradisional.',
      step3Title: 'Pengeringan',
      step3Desc: 'Dikeringkan secara bertahap di tempat teduh berangin sebelum proses pembakaran.',
      step4Title: 'Pembakaran',
      step4Desc: 'Dibakar dengan suhu optimal untuk menghasilkan ketahanan fisik dan warna alami terakota.',
      step5Title: 'Finishing & QC',
      step5Desc: 'Penghalusan akhir, sentuhan alami, serta pemeriksaan kualitas yang teliti.',
      aboutTag: 'TENTANG PARJONO KERAMIK JAYA',
      aboutTitle: 'Lebih dari Dua Dekade Menjaga Tradisi Gerabah Jawa',
      aboutDesc1:
        'Didirikan pada tahun 2003 di Klisat, Srihardono, Pundong, Bantul, PARJONO KERAMIK JAYA telah berkembang dari bengkel kriya lokal menjadi produsen terpercaya produk terakota khas Indonesia.',
      aboutDesc2:
        'Kami memberdayakan perajin lokal, merawat teknik putar dan tempa tradisional, sembari menerapkan standar kemasan ekspor dan kualitas internasional modern.',
      readStory: 'Baca Kisah Kami',
      featuredTag: 'KOLEKSI PILIHAN',
      featuredTitle: 'Koleksi Gerabah Terakota Unggulan',
      viewAllProducts: 'Lihat Semua Produk',
      awardsTag: 'PENGHARGAAN & PRESTASI',
      awardsTitle: 'Pengalaman Bernilai & Terpercaya',
      viewAllAwards: 'Lihat Semua Penghargaan',
      exhibitionsTag: 'AGENDA & PAMERAN',
      exhibitionsTitle: 'Tumbuh Melalui Pengalaman Pameran',
      viewAllExhibitions: 'Lihat Riwayat Pameran',
      newsTag: 'KISAH & KEGIATAN',
      newsTitle: 'Cerita & Berita Terkini',
      newsSubtitle:
        'Ikuti agenda pameran terbaru, lokakarya pelatihan kriya, dan cerita keahlian dari Yogyakarta.',
      readMore: 'Baca Selengkapnya',
      viewAllNews: 'Lihat Semua Berita',
      galleryTag: 'ARSIP VISUAL',
      galleryTitle: 'Galeri & Dokumentasi Kriya',
      viewAllGallery: 'Buka Galeri Lengkap',
      ctaTitle1: 'Mencari Keramik Gerabah',
      ctaTitle2: 'Asli Indonesia?',
      ctaDesc:
        'Konsultasikan kebutuhan produk, pembuatan pesanan khusus, atau peluang kemitraan bisnis dan ekspor bersama kami.',
      chatWa: 'Chat via WhatsApp',
    },
    products: {
      title: 'Katalog Produk Kami',
      subtitle:
        'Aneka pot tanaman terakota, vas dekoratif, guci rustic, dan hiasan interior berbahan tanah liat alami berkualitas.',
      searchPlaceholder: 'Cari produk berdasarkan nama atau material...',
      allCategories: 'Semua Produk',
      catTerracotta: 'Terakota',
      catClayPottery: 'Gerabah Tanah Liat',
      catGarden: 'Pot Taman',
      catHomeDecoration: 'Dekorasi Rumah',
      catCustom: 'Pesanan Kustom',
      noProducts: 'Tidak ada produk yang cocok dengan pencarian Anda.',
      viewDetails: 'Lihat Detail',
      inquireBtn: 'Pesan Sekarang',
      material: 'Material',
      size: 'Dimensi / Ukuran',
      weight: 'Perkiraan Bobot',
      finish: 'Sentuhan Akhir',
      moq: 'Minimal Pemesanan (MOQ)',
      backToCatalog: 'Kembali ke Katalog Produk',
      relatedProducts: 'Produk Terkait Lainnya',
      inquiryFormTitle: 'Kirim Permintaan Harga / Pemesanan Proyek',
      inquiryFormDesc: 'Isi formulir ini dan tim kami akan segera membalas dalam kurun 24 jam kerja.',
    },
    contact: {
      tag: 'HUBUNGI KAMI',
      title: 'Kontak & Lokasi Workshop',
      subtitle:
        'Kami menyambut pemesanan grosir, proyek dekorasi arsitektur, dan kerja sama ekspor ke berbagai negara.',
      infoTitle: 'Kantor & Workshop Bengkel',
      formTitle: 'Kirim Pesan atau Pertanyaan',
      formSubtitle: 'Lengkapi formulir di bawah ini, tim representatif kami akan segera merespons Anda.',
      nameLabel: 'Nama Lengkap',
      namePlaceholder: 'Contoh: Budi Santoso',
      companyLabel: 'Nama Perusahaan / Usaha (Opsional)',
      companyPlaceholder: 'Contoh: PT Villa Ubud Lestari',
      emailLabel: 'Alamat Email',
      emailPlaceholder: 'nama@email.com',
      phoneLabel: 'Nomor Telepon / WhatsApp',
      phonePlaceholder: '+62 812-xxxx-xxxx',
      subjectLabel: 'Subjek / Perihal',
      subjectPlaceholder: 'Pemesanan pot taman, katalog ekspor, custom order...',
      messageLabel: 'Isi Pesan Anda',
      messagePlaceholder: 'Tuliskan kebutuhan Anda, spesifikasi produk yang diminati, atau pertanyaan...',
      sendBtn: 'Kirim Pesan Sekarang',
      successTitle: 'Terima Kasih, Pesan Terkirim!',
      successDesc:
        'Pesan Anda telah kami terima dengan baik. Tim kami akan segera meninjau dan menghubungi Anda.',
      sendAnotherBtn: 'Kirim Pesan Lainnya',
    },
    common: {
      readMore: 'Baca Selengkapnya',
      learnMore: 'Pelajari Lebih Lanjut',
      loading: 'Memuat...',
      back: 'Kembali',
      showAll: 'Tampilkan Semua',
      chatWa: 'Hubungi via WhatsApp',
    },
  },
}

