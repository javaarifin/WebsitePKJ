import React, { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_PRODUCTS, NEWS, GALLERY_IMAGES, AWARDS, EXHIBITIONS } from '../data'
import { Lang, TranslationDictionary, translations } from '../translations'
import { hashPassword, checkLoginRateLimit, recordFailedLogin, clearLoginRateLimit } from '../utils/security'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export type { Lang, TranslationDictionary }

export interface Product {
  id: number
  name: string
  category: string
  description: string
  fullDescription: string
  image: string
  material: string
  size: string
  weight: string
  finish: string
  moq: string
  price?: string
  status: 'published' | 'draft'
  createdAt?: string
}

export interface NewsItem {
  id: number
  category: string
  date: string
  title: string
  excerpt: string
  image: string
  body: string
  createdAt?: string
}

export interface GalleryItem {
  id: number
  category: string
  src: string
  alt: string
  caption: string
  createdAt?: string
}

export interface AwardItem {
  id: number
  title: string
  year: string
  organization: string
  description: string
  image: string
  createdAt?: string
}

export interface ExhibitionItem {
  id: number
  name: string
  location: string
  year: string
  description: string
  image: string
  createdAt?: string
}

export interface Inquiry {
  id: string
  name: string
  company?: string
  email: string
  phone?: string
  subject?: string
  message: string
  productName?: string
  country?: string
  quantity?: string
  status: 'new' | 'contacted' | 'archived'
  createdAt: string
}

export interface AuthUser {
  username: string
  name: string
  role: 'superadmin' | 'editor'
  loginTime?: string
  expiresAt?: number
}

export interface CompanyInfo {
  name: string
  tagline: string
  phone: string
  whatsapp: string
  email: string
  addressLine1: string
  addressLine2: string
  operatingHours: string
  googleMapsUrl: string
  instagram: string
  facebook: string
}

export function formatWhatsAppLink(phone: string, text?: string): string {
  let cleaned = (phone || '').replace(/[^0-9]/g, '')
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1)
  }
  if (!cleaned) cleaned = '6281234567890'
  const base = `https://wa.me/${cleaned}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export interface VisitorLog {
  id: string
  timestamp: string
  timeFormatted: string
  path: string
  pageName: string
  device: 'Mobile' | 'Desktop' | 'Tablet'
  browser: string
  location: string
}

export interface DayTrend {
  date: string
  dayName: string
  views: number
  visitors: number
}

export interface PageStat {
  path: string
  name: string
  views: number
  percentage: number
}

export interface DeviceStat {
  device: 'Mobile' | 'Desktop' | 'Tablet'
  count: number
  percentage: number
}

export interface VisitorStats {
  totalViews: number
  totalVisitors: number
  todayViews: number
  todayVisitors: number
  lastUpdated: string
  weeklyTrend: DayTrend[]
  topPages: PageStat[]
  devices: DeviceStat[]
  recentLogs: VisitorLog[]
}

interface AppContextType {
  // Language & i18n
  lang: Lang
  setLang: (lang: Lang) => void
  t: TranslationDictionary

  // Visitor Analytics
  visitorStats: VisitorStats
  recordPageVisit: (page: string) => void
  simulateNewVisitor: () => void
  resetVisitorStats: () => void

  // Products
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void
  resetProductsToDefault: () => void

  // News
  news: NewsItem[]
  addNews: (item: Omit<NewsItem, 'id' | 'createdAt'>) => NewsItem
  updateNews: (id: number, item: Partial<NewsItem>) => void
  deleteNews: (id: number) => void
  resetNewsToDefault: () => void

  // Gallery
  gallery: GalleryItem[]
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'createdAt'>) => GalleryItem
  updateGalleryItem: (id: number, item: Partial<GalleryItem>) => void
  deleteGalleryItem: (id: number) => void
  resetGalleryToDefault: () => void

  // Awards
  awards: AwardItem[]
  addAward: (item: Omit<AwardItem, 'id' | 'createdAt'>) => AwardItem
  updateAward: (id: number, item: Partial<AwardItem>) => void
  deleteAward: (id: number) => void
  resetAwardsToDefault: () => void

  // Exhibitions
  exhibitions: ExhibitionItem[]
  addExhibition: (item: Omit<ExhibitionItem, 'id' | 'createdAt'>) => ExhibitionItem
  updateExhibition: (id: number, item: Partial<ExhibitionItem>) => void
  deleteExhibition: (id: number) => void
  resetExhibitionsToDefault: () => void

  // Inquiries
  inquiries: Inquiry[]
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'status' | 'createdAt'>) => Inquiry
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void
  deleteInquiry: (id: string) => void

  // Company Info & Contact
  companyInfo: CompanyInfo
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void
  resetCompanyInfoToDefault: () => void

  // Auth
  isAuthenticated: boolean
  user: AuthUser | null
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  changeAdminPassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const STORAGE_KEYS = {
  LANG: 'pkj_craft_lang_v1',
  PRODUCTS: 'pkj_craft_products_v1',
  NEWS: 'pkj_craft_news_v1',
  GALLERY: 'pkj_craft_gallery_v1',
  AWARDS: 'pkj_craft_awards_v1',
  EXHIBITIONS: 'pkj_craft_exhibitions_v1',
  INQUIRIES: 'pkj_craft_inquiries_v1',
  AUTH: 'pkj_craft_auth_v1',
  ADMIN_CRED: 'pkj_craft_admin_cred_v1',
  VISITOR_STATS: 'pkj_craft_visitor_stats_v1',
  COMPANY_INFO: 'pkj_craft_company_info_v1',
}

export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  name: 'PARJONO KERAMIK JAYA',
  tagline: 'Produsen Gerabah',
  phone: '+62 813-2716-3564',
  whatsapp: '+62 813-2716-3564',
  email: 'agustinawdyt@gmail.com',
  addressLine1: 'Klisat, Srihardono, Pundong',
  addressLine2: 'Bantul, D.I. Yogyakarta 55771, Indonesia',
  operatingHours: 'Senin - Sabtu: 08:00 - 16:00 WIB',
  googleMapsUrl: 'https://maps.app.goo.gl/oDqzTpA58RFrxJK47',
  instagram: '@PARJONO_KERAMIK',
  facebook: 'Parjono Keramik Jaya',
}

const generateDefaultVisitorStats = (): VisitorStats => {
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const today = new Date()

  const weeklyTrend: DayTrend[] = []
  const baseViews = [142, 198, 230, 210, 265, 310, 187]
  const baseVisitors = [65, 92, 108, 98, 124, 145, 88]

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const dayName = days[d.getDay()]
    const dateStr = `${d.getDate()} ${months[d.getMonth()]}`
    weeklyTrend.push({
      date: dateStr,
      dayName: i === 0 ? 'Hari Ini' : dayName,
      views: baseViews[6 - i] || 150,
      visitors: baseVisitors[6 - i] || 70,
    })
  }

  const todayStat = weeklyTrend[weeklyTrend.length - 1]

  const topPages: PageStat[] = [
    { path: '/', name: 'Beranda Utama', views: 842, percentage: 46 },
    { path: '/products', name: 'Katalog Produk', views: 485, percentage: 26 },
    { path: '/export', name: 'Pengalaman Ekspor', views: 218, percentage: 12 },
    { path: '/gallery', name: 'Galeri Foto Kriya', views: 146, percentage: 8 },
    { path: '/about', name: 'Tentang Kami', views: 98, percentage: 5 },
    { path: '/contact', name: 'Kontak & Penawaran', views: 53, percentage: 3 },
  ]

  const devices: DeviceStat[] = [
    { device: 'Mobile', count: 1142, percentage: 62 },
    { device: 'Desktop', count: 608, percentage: 33 },
    { device: 'Tablet', count: 92, percentage: 5 },
  ]

  const recentLogs: VisitorLog[] = [
    {
      id: 'log-1',
      timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
      timeFormatted: 'Baru saja',
      path: '/products',
      pageName: 'Katalog Produk',
      device: 'Mobile',
      browser: 'Chrome Mobile',
      location: 'Yogyakarta, ID',
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 14 * 60000).toISOString(),
      timeFormatted: '14 menit lalu',
      path: '/',
      pageName: 'Beranda Utama',
      device: 'Mobile',
      browser: 'Safari iOS',
      location: 'Jakarta, ID',
    },
    {
      id: 'log-3',
      timestamp: new Date(Date.now() - 35 * 60000).toISOString(),
      timeFormatted: '35 menit lalu',
      path: '/export',
      pageName: 'Pengalaman Ekspor',
      device: 'Desktop',
      browser: 'Chrome Windows',
      location: 'Sydney, AU',
    },
    {
      id: 'log-4',
      timestamp: new Date(Date.now() - 52 * 60000).toISOString(),
      timeFormatted: '52 menit lalu',
      path: '/products',
      pageName: 'Katalog Produk',
      device: 'Mobile',
      browser: 'Chrome Android',
      location: 'Surabaya, ID',
    },
    {
      id: 'log-5',
      timestamp: new Date(Date.now() - 85 * 60000).toISOString(),
      timeFormatted: '1 jam lalu',
      path: '/contact',
      pageName: 'Kontak & Penawaran',
      device: 'Desktop',
      browser: 'Firefox Mac',
      location: 'Bandung, ID',
    },
    {
      id: 'log-6',
      timestamp: new Date(Date.now() - 110 * 60000).toISOString(),
      timeFormatted: '2 jam lalu',
      path: '/gallery',
      pageName: 'Galeri Foto Kriya',
      device: 'Mobile',
      browser: 'Safari iOS',
      location: 'Bali, ID',
    },
    {
      id: 'log-7',
      timestamp: new Date(Date.now() - 160 * 60000).toISOString(),
      timeFormatted: '2 jam lalu',
      path: '/about',
      pageName: 'Tentang Kami',
      device: 'Desktop',
      browser: 'Edge Windows',
      location: 'Semarang, ID',
    },
  ]

  return {
    totalViews: 1842,
    totalVisitors: 824,
    todayViews: todayStat.views,
    todayVisitors: todayStat.visitors,
    lastUpdated: new Date().toISOString(),
    weeklyTrend,
    topPages,
    devices,
    recentLogs,
  }
}

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Kenji Takahashi',
    company: 'Kyoto Living Goods Co.',
    email: 'kenji@kyotoliving.jp',
    phone: '+81 90-1234-5678',
    subject: 'Wholesale inquiry for Terracotta Planters',
    message:
      'We are looking to order 500 units of the Terracotta Planter for our autumn catalogue in Tokyo. Please provide pricing and shipping options to Osaka Port.',
    productName: 'Terracotta Planter',
    country: 'Japan',
    quantity: '500 pcs',
    status: 'new',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 'inq-2',
    name: 'Sarah Miller',
    company: 'Earth & Clay Studio Sydney',
    email: 'sarah@earthclay.com.au',
    phone: '+61 412 345 678',
    subject: 'Custom handmade vase order',
    message:
      'Interested in bespoke rustic vases for hotel boutique decor in Melbourne. Can you customize the height to 45cm?',
    productName: 'Handcrafted Vase',
    country: 'Australia',
    quantity: '120 pcs',
    status: 'contacted',
    createdAt: new Date(Date.now() - 28 * 3600000).toISOString(),
  },
  {
    id: 'inq-3',
    name: 'Budi Santoso',
    company: 'PT Nusantara Resort Bali',
    email: 'procurement@nusantararesort.com',
    phone: '+62 812-9876-5432',
    subject: 'Pemesanan Pot Taman untuk Proyek Villa Ubud',
    message:
      'Halo Pak Parjono, kami membutuhkan sekitar 80 pot taman rustic untuk proyek renovasi resort kami di Ubud. Mohon dikirimkan katalog harga proyek.',
    productName: 'Rustic Garden Pot',
    country: 'Indonesia',
    quantity: '80 pcs',
    status: 'new',
    createdAt: new Date(Date.now() - 50 * 3600000).toISOString(),
  },
]

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 0. Language state
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANG)
      if (saved === 'en' || saved === 'id') return saved
    } catch (e) {
      console.error('Error loading language from localStorage:', e)
    }
    return 'en'
  })

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, newLang)
    } catch (e) {
      console.error('Error saving language:', e)
    }
  }

  // 1. Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Product) => ({
            ...p,
            price: p.price ? p.price.replace(/\s*\/\s*\$[\d.]+/g, "").trim() : p.price,
          }))
        }
      }
    } catch (e) {
      console.error('Error loading products from localStorage:', e)
    }
    const initialWithStatus: Product[] = INITIAL_PRODUCTS.map(p => ({
      ...p,
      status: 'published',
      createdAt: new Date().toISOString(),
    }))
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialWithStatus))
    } catch (e) {
      console.error('Error saving initial products:', e)
    }
    return initialWithStatus
  })

  // 2. News state
  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.error('Error loading news from localStorage:', e)
    }
    const initialNews: NewsItem[] = NEWS.map(n => ({
      ...n,
      createdAt: new Date().toISOString(),
    }))
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(initialNews))
    } catch (e) {
      console.error('Error saving initial news:', e)
    }
    return initialNews
  })

  // 3. Gallery state
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.error('Error loading gallery from localStorage:', e)
    }
    const initialGallery: GalleryItem[] = GALLERY_IMAGES.map(g => ({
      ...g,
      createdAt: new Date().toISOString(),
    }))
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(initialGallery))
    } catch (e) {
      console.error('Error saving initial gallery:', e)
    }
    return initialGallery
  })

  // 4. Awards state
  const [awards, setAwards] = useState<AwardItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AWARDS)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.error('Error loading awards from localStorage:', e)
    }
    const initialAwards: AwardItem[] = AWARDS.map(a => ({
      ...a,
      createdAt: new Date().toISOString(),
    }))
    try {
      localStorage.setItem(STORAGE_KEYS.AWARDS, JSON.stringify(initialAwards))
    } catch (e) {
      console.error('Error saving initial awards:', e)
    }
    return initialAwards
  })

  // 5. Exhibitions state
  const [exhibitions, setExhibitions] = useState<ExhibitionItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXHIBITIONS)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.error('Error loading exhibitions from localStorage:', e)
    }
    const initialExhibitions: ExhibitionItem[] = EXHIBITIONS.map(e => ({
      ...e,
      createdAt: new Date().toISOString(),
    }))
    try {
      localStorage.setItem(STORAGE_KEYS.EXHIBITIONS, JSON.stringify(initialExhibitions))
    } catch (e) {
      console.error('Error saving initial exhibitions:', e)
    }
    return initialExhibitions
  })

  // 6. Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.error('Error loading inquiries:', e)
    }
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES))
    } catch (e) {
      console.error('Error saving default inquiries:', e)
    }
    return DEFAULT_INQUIRIES
  })

  // 7. Auth state with session expiration check
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH)
      if (saved) {
        const parsed: AuthUser = JSON.parse(saved)
        // Auto-logout if session has expired (anti session hijacking)
        if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
          localStorage.removeItem(STORAGE_KEYS.AUTH)
          return null
        }
        return parsed
      }
    } catch (e) {
      console.error('Error loading auth from localStorage:', e)
    }
    return null
  })

  // 8. Visitor Stats state
  const [visitorStats, setVisitorStats] = useState<VisitorStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VISITOR_STATS)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed.totalViews === 'number') return parsed
      }
    } catch (e) {
      console.error('Error loading visitor stats:', e)
    }
    const defaultStats = generateDefaultVisitorStats()
    try {
      localStorage.setItem(STORAGE_KEYS.VISITOR_STATS, JSON.stringify(defaultStats))
    } catch (e) {}
    return defaultStats
  })

  // 9. Company Info state (WhatsApp, phone, email, address, maps)
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANY_INFO)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_COMPANY_INFO, ...parsed }
        }
      }
    } catch (e) {
      console.error('Error loading company info:', e)
    }
    return DEFAULT_COMPANY_INFO
  })

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products))
    } catch (e) {
      console.error('Failed to save products:', e)
    }
  }, [products])

  // Persist news
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news))
    } catch (e) {
      console.error('Failed to save news:', e)
    }
  }, [news])

  // Persist gallery
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery))
    } catch (e) {
      console.error('Failed to save gallery:', e)
    }
  }, [gallery])

  // Persist awards
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AWARDS, JSON.stringify(awards))
    } catch (e) {
      console.error('Failed to save awards:', e)
    }
  }, [awards])

  // Persist exhibitions
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXHIBITIONS, JSON.stringify(exhibitions))
    } catch (e) {
      console.error('Failed to save exhibitions:', e)
    }
  }, [exhibitions])

  // Persist inquiries
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries))
    } catch (e) {
      console.error('Failed to save inquiries:', e)
    }
  }, [inquiries])

  // Persist auth
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH)
      }
    } catch (e) {
      console.error('Failed to save auth:', e)
    }
  }, [user])

  // Sync with Supabase on mount
  useEffect(() => {
    if (!isSupabaseConfigured()) return

    const loadDataFromSupabase = async () => {
      try {
        // 1. Company Info
        const { data: compData, error: compErr } = await supabase
          .from('company_info')
          .select('*')
          .eq('id', 1)
          .maybeSingle()

        if (compData && !compErr) {
          const syncedCompany: CompanyInfo = {
            name: compData.name || DEFAULT_COMPANY_INFO.name,
            tagline: compData.tagline || DEFAULT_COMPANY_INFO.tagline,
            phone: compData.phone || DEFAULT_COMPANY_INFO.phone,
            whatsapp: compData.whatsapp || DEFAULT_COMPANY_INFO.whatsapp,
            email: compData.email || DEFAULT_COMPANY_INFO.email,
            addressLine1: compData.address_line1 || DEFAULT_COMPANY_INFO.addressLine1,
            addressLine2: compData.address_line2 || DEFAULT_COMPANY_INFO.addressLine2,
            operatingHours: compData.operating_hours || DEFAULT_COMPANY_INFO.operatingHours,
            googleMapsUrl: compData.google_maps_url || DEFAULT_COMPANY_INFO.googleMapsUrl,
            instagram: compData.instagram || DEFAULT_COMPANY_INFO.instagram,
            facebook: compData.facebook || DEFAULT_COMPANY_INFO.facebook,
          }
          setCompanyInfo(syncedCompany)
          localStorage.setItem(STORAGE_KEYS.COMPANY_INFO, JSON.stringify(syncedCompany))
        }

        // 2. Products
        const { data: prodData } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: false })

        if (prodData && prodData.length > 0) {
          const syncedProducts: Product[] = prodData.map(p => ({
            id: Number(p.id),
            name: p.name,
            category: p.category || 'Terracotta',
            description: p.description || '',
            fullDescription: p.full_description || '',
            image: p.image,
            material: p.material || '',
            size: p.size || '',
            weight: p.weight || '',
            finish: p.finish || '',
            moq: p.moq || '',
            price: p.price || '',
            status: p.status || 'published',
            createdAt: p.created_at,
          }))
          setProducts(syncedProducts)
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(syncedProducts))
        }

        // 3. News
        const { data: newsData } = await supabase
          .from('news')
          .select('*')
          .order('id', { ascending: false })

        if (newsData && newsData.length > 0) {
          const syncedNews: NewsItem[] = newsData.map(n => ({
            id: Number(n.id),
            category: n.category,
            date: n.date,
            title: n.title,
            excerpt: n.excerpt || '',
            image: n.image,
            body: n.body,
            createdAt: n.created_at,
          }))
          setNews(syncedNews)
          localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(syncedNews))
        }

        // 4. Gallery
        const { data: galData } = await supabase
          .from('gallery')
          .select('*')
          .order('id', { ascending: false })

        if (galData && galData.length > 0) {
          const syncedGallery: GalleryItem[] = galData.map(g => ({
            id: Number(g.id),
            category: g.category,
            src: g.src,
            alt: g.alt || '',
            caption: g.caption || '',
            createdAt: g.created_at,
          }))
          setGallery(syncedGallery)
          localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(syncedGallery))
        }

        // 5. Awards
        const { data: awardData } = await supabase
          .from('awards')
          .select('*')
          .order('id', { ascending: false })

        if (awardData && awardData.length > 0) {
          const syncedAwards: AwardItem[] = awardData.map(a => ({
            id: Number(a.id),
            title: a.title,
            year: a.year,
            organization: a.organization,
            description: a.description || '',
            image: a.image,
            createdAt: a.created_at,
          }))
          setAwards(syncedAwards)
          localStorage.setItem(STORAGE_KEYS.AWARDS, JSON.stringify(syncedAwards))
        }

        // 6. Exhibitions
        const { data: exhData } = await supabase
          .from('exhibitions')
          .select('*')
          .order('id', { ascending: false })

        if (exhData && exhData.length > 0) {
          const syncedExhibitions: ExhibitionItem[] = exhData.map(e => ({
            id: Number(e.id),
            name: e.name,
            location: e.location,
            year: e.year,
            description: e.description || '',
            image: e.image,
            createdAt: e.created_at,
          }))
          setExhibitions(syncedExhibitions)
          localStorage.setItem(STORAGE_KEYS.EXHIBITIONS, JSON.stringify(syncedExhibitions))
        }

        // 7. Inquiries
        const { data: inqData } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false })

        if (inqData && inqData.length > 0) {
          const syncedInquiries: Inquiry[] = inqData.map(i => ({
            id: i.id,
            name: i.name,
            company: i.company || '',
            email: i.email,
            phone: i.phone || '',
            subject: i.subject || '',
            message: i.message,
            productName: i.product_name || '',
            country: i.country || '',
            quantity: i.quantity || '',
            status: i.status || 'new',
            createdAt: i.created_at,
          }))
          setInquiries(syncedInquiries)
          localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(syncedInquiries))
        }
      } catch (err) {
        console.error('Error synchronizing with Supabase:', err)
      }
    }

    loadDataFromSupabase()
  }, [])

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    const newProduct: Product = {
      ...productData,
      id: nextId,
      createdAt: new Date().toISOString(),
    }
    setProducts(prev => [newProduct, ...prev])

    if (isSupabaseConfigured()) {
      supabase.from('products').insert({
        name: newProduct.name,
        category: newProduct.category,
        description: newProduct.description,
        full_description: newProduct.fullDescription,
        image: newProduct.image,
        material: newProduct.material,
        size: newProduct.size,
        weight: newProduct.weight,
        finish: newProduct.finish,
        moq: newProduct.moq,
        price: newProduct.price,
        status: newProduct.status,
      }).select().single().then(({ data, error }) => {
        if (data && !error) {
          setProducts(prev => prev.map(p => p.id === newProduct.id ? { ...p, id: Number(data.id) } : p))
        } else if (error) {
          console.error('Supabase add product error:', error)
        }
      })
    }

    return newProduct
  }

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...productData } : p)))

    if (isSupabaseConfigured()) {
      supabase.from('products').update({
        ...(productData.name !== undefined && { name: productData.name }),
        ...(productData.category !== undefined && { category: productData.category }),
        ...(productData.description !== undefined && { description: productData.description }),
        ...(productData.fullDescription !== undefined && { full_description: productData.fullDescription }),
        ...(productData.image !== undefined && { image: productData.image }),
        ...(productData.material !== undefined && { material: productData.material }),
        ...(productData.size !== undefined && { size: productData.size }),
        ...(productData.weight !== undefined && { weight: productData.weight }),
        ...(productData.finish !== undefined && { finish: productData.finish }),
        ...(productData.moq !== undefined && { moq: productData.moq }),
        ...(productData.price !== undefined && { price: productData.price }),
        ...(productData.status !== undefined && { status: productData.status }),
        updated_at: new Date().toISOString(),
      }).eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase update product error:', error)
      })
    }
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))

    if (isSupabaseConfigured()) {
      supabase.from('products').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase delete product error:', error)
      })
    }
  }

  const resetProductsToDefault = () => {
    const initialWithStatus: Product[] = INITIAL_PRODUCTS.map(p => ({
      ...p,
      status: 'published',
      createdAt: new Date().toISOString(),
    }))
    setProducts(initialWithStatus)
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialWithStatus))
  }

  // News CRUD
  const addNews = (itemData: Omit<NewsItem, 'id' | 'createdAt'>): NewsItem => {
    const nextId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1
    const newItem: NewsItem = {
      ...itemData,
      id: nextId,
      createdAt: new Date().toISOString(),
    }
    setNews(prev => [newItem, ...prev])

    if (isSupabaseConfigured()) {
      supabase.from('news').insert({
        category: newItem.category,
        date: newItem.date,
        title: newItem.title,
        excerpt: newItem.excerpt,
        image: newItem.image,
        body: newItem.body,
      }).select().single().then(({ data, error }) => {
        if (data && !error) {
          setNews(prev => prev.map(n => n.id === newItem.id ? { ...n, id: Number(data.id) } : n))
        }
      })
    }

    return newItem
  }

  const updateNews = (id: number, itemData: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => (n.id === id ? { ...n, ...itemData } : n)))

    if (isSupabaseConfigured()) {
      supabase.from('news').update({
        ...(itemData.category !== undefined && { category: itemData.category }),
        ...(itemData.date !== undefined && { date: itemData.date }),
        ...(itemData.title !== undefined && { title: itemData.title }),
        ...(itemData.excerpt !== undefined && { excerpt: itemData.excerpt }),
        ...(itemData.image !== undefined && { image: itemData.image }),
        ...(itemData.body !== undefined && { body: itemData.body }),
      }).eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase update news error:', error)
      })
    }
  }

  const deleteNews = (id: number) => {
    setNews(prev => prev.filter(n => n.id !== id))

    if (isSupabaseConfigured()) {
      supabase.from('news').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase delete news error:', error)
      })
    }
  }

  const resetNewsToDefault = () => {
    const initialNews: NewsItem[] = NEWS.map(n => ({
      ...n,
      createdAt: new Date().toISOString(),
    }))
    setNews(initialNews)
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(initialNews))
  }

  // Gallery CRUD
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id' | 'createdAt'>): GalleryItem => {
    const nextId = gallery.length > 0 ? Math.max(...gallery.map(g => g.id)) + 1 : 1
    const newItem: GalleryItem = {
      ...itemData,
      id: nextId,
      createdAt: new Date().toISOString(),
    }
    setGallery(prev => [newItem, ...prev])

    if (isSupabaseConfigured()) {
      supabase.from('gallery').insert({
        category: newItem.category,
        src: newItem.src,
        alt: newItem.alt,
        caption: newItem.caption,
      }).select().single().then(({ data, error }) => {
        if (data && !error) {
          setGallery(prev => prev.map(g => g.id === newItem.id ? { ...g, id: Number(data.id) } : g))
        }
      })
    }

    return newItem
  }

  const updateGalleryItem = (id: number, itemData: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => (g.id === id ? { ...g, ...itemData } : g)))

    if (isSupabaseConfigured()) {
      supabase.from('gallery').update({
        ...(itemData.category !== undefined && { category: itemData.category }),
        ...(itemData.src !== undefined && { src: itemData.src }),
        ...(itemData.alt !== undefined && { alt: itemData.alt }),
        ...(itemData.caption !== undefined && { caption: itemData.caption }),
      }).eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase update gallery error:', error)
      })
    }
  }

  const deleteGalleryItem = (id: number) => {
    setGallery(prev => prev.filter(g => g.id !== id))

    if (isSupabaseConfigured()) {
      supabase.from('gallery').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase delete gallery error:', error)
      })
    }
  }

  const resetGalleryToDefault = () => {
    const initialGallery: GalleryItem[] = GALLERY_IMAGES.map(g => ({
      ...g,
      createdAt: new Date().toISOString(),
    }))
    setGallery(initialGallery)
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(initialGallery))
  }

  // Awards CRUD
  const addAward = (itemData: Omit<AwardItem, 'id' | 'createdAt'>): AwardItem => {
    const nextId = awards.length > 0 ? Math.max(...awards.map(a => a.id)) + 1 : 1
    const newItem: AwardItem = {
      ...itemData,
      id: nextId,
      createdAt: new Date().toISOString(),
    }
    setAwards(prev => [newItem, ...prev])

    if (isSupabaseConfigured()) {
      supabase.from('awards').insert({
        title: newItem.title,
        year: newItem.year,
        organization: newItem.organization,
        description: newItem.description,
        image: newItem.image,
      }).select().single().then(({ data, error }) => {
        if (data && !error) {
          setAwards(prev => prev.map(a => a.id === newItem.id ? { ...a, id: Number(data.id) } : a))
        }
      })
    }

    return newItem
  }

  const updateAward = (id: number, itemData: Partial<AwardItem>) => {
    setAwards(prev => prev.map(a => (a.id === id ? { ...a, ...itemData } : a)))

    if (isSupabaseConfigured()) {
      supabase.from('awards').update({
        ...(itemData.title !== undefined && { title: itemData.title }),
        ...(itemData.year !== undefined && { year: itemData.year }),
        ...(itemData.organization !== undefined && { organization: itemData.organization }),
        ...(itemData.description !== undefined && { description: itemData.description }),
        ...(itemData.image !== undefined && { image: itemData.image }),
      }).eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase update award error:', error)
      })
    }
  }

  const deleteAward = (id: number) => {
    setAwards(prev => prev.filter(a => a.id !== id))

    if (isSupabaseConfigured()) {
      supabase.from('awards').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase delete award error:', error)
      })
    }
  }

  const resetAwardsToDefault = () => {
    const initialAwards: AwardItem[] = AWARDS.map(a => ({
      ...a,
      createdAt: new Date().toISOString(),
    }))
    setAwards(initialAwards)
    localStorage.setItem(STORAGE_KEYS.AWARDS, JSON.stringify(initialAwards))
  }

  // Exhibitions CRUD
  const addExhibition = (itemData: Omit<ExhibitionItem, 'id' | 'createdAt'>): ExhibitionItem => {
    const nextId = exhibitions.length > 0 ? Math.max(...exhibitions.map(e => e.id)) + 1 : 1
    const newItem: ExhibitionItem = {
      ...itemData,
      id: nextId,
      createdAt: new Date().toISOString(),
    }
    setExhibitions(prev => [newItem, ...prev])

    if (isSupabaseConfigured()) {
      supabase.from('exhibitions').insert({
        name: newItem.name,
        location: newItem.location,
        year: newItem.year,
        description: newItem.description,
        image: newItem.image,
      }).select().single().then(({ data, error }) => {
        if (data && !error) {
          setExhibitions(prev => prev.map(e => e.id === newItem.id ? { ...e, id: Number(data.id) } : e))
        }
      })
    }

    return newItem
  }

  const updateExhibition = (id: number, itemData: Partial<ExhibitionItem>) => {
    const existing = exhibitions.find(e => e.id === id)
    const merged: ExhibitionItem | null = existing ? { ...existing, ...itemData } : null

    setExhibitions(prev => prev.map(e => (e.id === id ? { ...e, ...itemData } : e)))

    if (isSupabaseConfigured()) {
      supabase.from('exhibitions').update({
        ...(itemData.name !== undefined && { name: itemData.name }),
        ...(itemData.location !== undefined && { location: itemData.location }),
        ...(itemData.year !== undefined && { year: itemData.year }),
        ...(itemData.description !== undefined && { description: itemData.description }),
        ...(itemData.image !== undefined && { image: itemData.image }),
      }).eq('id', id).select().then(({ data, error }) => {
        if (error) {
          console.error('Supabase update exhibition error:', error)
          return
        }
        // If row didn't exist in Supabase yet (e.g., editing a default placeholder item), insert it now
        if ((!data || data.length === 0) && merged) {
          supabase.from('exhibitions').insert({
            name: merged.name,
            location: merged.location,
            year: merged.year,
            description: merged.description,
            image: merged.image,
          }).select().single().then(({ data: inserted, error: insErr }) => {
            if (inserted && !insErr) {
              const newDbId = Number(inserted.id)
              setExhibitions(prev => {
                const collision = prev.some(other => other.id === newDbId && other.id !== id)
                return prev.map((e, idx) => {
                  if (e.id === id) return { ...e, id: newDbId }
                  if (collision && e.id === newDbId) return { ...e, id: Date.now() + idx }
                  return e
                })
              })
            }
          })
        }
      })
    }
  }

  const deleteExhibition = (id: number) => {
    setExhibitions(prev => prev.filter(e => e.id !== id))

    if (isSupabaseConfigured()) {
      supabase.from('exhibitions').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase delete exhibition error:', error)
      })
    }
  }

  const resetExhibitionsToDefault = () => {
    const initialExhibitions: ExhibitionItem[] = EXHIBITIONS.map(e => ({
      ...e,
      createdAt: new Date().toISOString(),
    }))
    setExhibitions(initialExhibitions)
    localStorage.setItem(STORAGE_KEYS.EXHIBITIONS, JSON.stringify(initialExhibitions))
  }

  // Inquiries CRUD
  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Inquiry => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    }
    setInquiries(prev => [newInquiry, ...prev])

    if (isSupabaseConfigured()) {
      supabase.from('inquiries').insert({
        id: newInquiry.id,
        name: newInquiry.name,
        company: newInquiry.company,
        email: newInquiry.email,
        phone: newInquiry.phone,
        subject: newInquiry.subject,
        message: newInquiry.message,
        product_name: newInquiry.productName,
        country: newInquiry.country,
        quantity: newInquiry.quantity,
        status: newInquiry.status,
      }).then(({ error }) => {
        if (error) console.error('Supabase add inquiry error:', error)
      })
    }

    return newInquiry
  }

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(inq => (inq.id === id ? { ...inq, status } : inq)))

    if (isSupabaseConfigured()) {
      supabase.from('inquiries').update({ status }).eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase update inquiry error:', error)
      })
    }
  }

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id))

    if (isSupabaseConfigured()) {
      supabase.from('inquiries').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase delete inquiry error:', error)
      })
    }
  }

  // Company Info operations
  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo(prev => {
      const updated = { ...prev, ...info }
      try {
        localStorage.setItem(STORAGE_KEYS.COMPANY_INFO, JSON.stringify(updated))
      } catch (e) {
        console.error('Failed to save company info:', e)
      }

      if (isSupabaseConfigured()) {
        supabase.from('company_info').upsert({
          id: 1,
          name: updated.name,
          tagline: updated.tagline,
          phone: updated.phone,
          whatsapp: updated.whatsapp,
          email: updated.email,
          address_line1: updated.addressLine1,
          address_line2: updated.addressLine2,
          operating_hours: updated.operatingHours,
          google_maps_url: updated.googleMapsUrl,
          instagram: updated.instagram,
          facebook: updated.facebook,
          updated_at: new Date().toISOString(),
        }).then(({ error }) => {
          if (error) console.error('Supabase update company_info error:', error)
        })
      }

      return updated
    })
  }

  const resetCompanyInfoToDefault = () => {
    setCompanyInfo(DEFAULT_COMPANY_INFO)
    try {
      localStorage.setItem(STORAGE_KEYS.COMPANY_INFO, JSON.stringify(DEFAULT_COMPANY_INFO))
    } catch (e) {
      console.error('Failed to reset company info:', e)
    }
  }

  // Auth & Security operations
  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedUser = username.trim()
    const trimmedPass = password.trim()

    // 1. Check Rate Limiting / Brute-force lockout
    const rateLimit = checkLoginRateLimit()
    if (rateLimit.isLocked) {
      return {
        success: false,
        error: `Terlalu banyak percobaan gagal. Akses login dikunci sementara selama ${rateLimit.remainingSeconds} detik demi keamanan.`,
      }
    }

    if (!trimmedUser || !trimmedPass) {
      return { success: false, error: 'Username dan password wajib diisi.' }
    }

    // 2. Fetch or initialize stored admin credential hash
    let storedCred: { username: string; hash: string } | null = null
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_CRED)
      if (raw) {
        storedCred = JSON.parse(raw)
      } else {
        const defaultHash = await hashPassword('admin123')
        storedCred = { username: 'admin', hash: defaultHash }
        localStorage.setItem(STORAGE_KEYS.ADMIN_CRED, JSON.stringify(storedCred))
      }
    } catch (e) {
      const defaultHash = await hashPassword('admin123')
      storedCred = { username: 'admin', hash: defaultHash }
    }

    // 3. Verify user and password hash
    const inputHash = await hashPassword(trimmedPass)
    const isUserMatch = trimmedUser.toLowerCase() === (storedCred?.username || 'admin').toLowerCase()
    const isPassMatch = storedCred && inputHash === storedCred.hash

    if (isUserMatch && isPassMatch) {
      clearLoginRateLimit()
      const now = Date.now()
      const authUser: AuthUser = {
        username: storedCred?.username || 'admin',
        name: 'Parjono Admin',
        role: 'superadmin',
        loginTime: new Date(now).toISOString(),
        expiresAt: now + 8 * 3600 * 1000, // 8-hour session
      }
      setUser(authUser)
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authUser))
      } catch (e) {}
      return { success: true }
    }

    // 4. Record failed attempt
    const failedStatus = recordFailedLogin()
    if (failedStatus.isLocked) {
      return {
        success: false,
        error: `Terlalu banyak percobaan gagal berturut-turut. Akun dikunci sementara selama 5 menit untuk alasan keamanan.`,
      }
    }

    const remaining = Math.max(0, 5 - failedStatus.attempts)
    return {
      success: false,
      error: `Username atau password salah. Sisa kesempatan sebelum akun dikunci: ${remaining} kali.`,
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH)
    } catch (e) {}
  }

  const changeAdminPassword = async (
    oldPass: string,
    newPass: string,
  ): Promise<{ success: boolean; error?: string }> => {
    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'Password baru minimal 6 karakter.' }
    }

    let storedCred: { username: string; hash: string } | null = null
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_CRED)
      if (raw) {
        storedCred = JSON.parse(raw)
      } else {
        const defaultHash = await hashPassword('admin123')
        storedCred = { username: 'admin', hash: defaultHash }
      }
    } catch (e) {
      return { success: false, error: 'Gagal membaca data kredensial.' }
    }

    const oldHash = await hashPassword(oldPass.trim())
    if (!storedCred || oldHash !== storedCred.hash) {
      return { success: false, error: 'Password lama yang Anda masukkan tidak sesuai.' }
    }

    const newHash = await hashPassword(newPass.trim())
    const updatedCred = {
      username: storedCred.username,
      hash: newHash,
      updatedAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_CRED, JSON.stringify(updatedCred))
      return { success: true }
    } catch (e) {
      return { success: false, error: 'Gagal menyimpan password baru.' }
    }
  }

  // Visitor tracking operations
  const recordPageVisit = (page: string) => {
    if (page.startsWith('admin')) return

    const pageNames: Record<string, string> = {
      home: 'Beranda Utama',
      products: 'Katalog Produk',
      'product-detail': 'Detail Produk',
      about: 'Tentang Kami',
      company: 'Profil Perusahaan',
      export: 'Pengalaman Ekspor',
      awards: 'Penghargaan & Prestasi',
      exhibitions: 'Agenda Pameran',
      training: 'Pelatihan & Kegiatan',
      news: 'Berita & Artikel',
      'news-detail': 'Detail Berita',
      gallery: 'Galeri Foto Kriya',
      contact: 'Kontak & Penawaran',
    }

    const pagePath: Record<string, string> = {
      home: '/',
      products: '/products',
      'product-detail': '/products',
      about: '/about',
      company: '/company',
      export: '/export',
      awards: '/awards',
      exhibitions: '/exhibitions',
      training: '/training',
      news: '/news',
      'news-detail': '/news',
      gallery: '/gallery',
      contact: '/contact',
    }

    const pName = pageNames[page] || page
    const pPath = pagePath[page] || `/${page}`

    let device: 'Mobile' | 'Desktop' | 'Tablet' = 'Desktop'
    let browser = 'Browser'
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent
      if (/ipad|tablet/i.test(ua)) device = 'Tablet'
      else if (/mobile|iphone|android/i.test(ua)) device = 'Mobile'

      if (/chrome|crios/i.test(ua)) browser = 'Chrome'
      else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari'
      else if (/firefox/i.test(ua)) browser = 'Firefox'
      else if (/edg/i.test(ua)) browser = 'Edge'
    }

    setVisitorStats(prev => {
      let isNewSession = false
      try {
        if (!sessionStorage.getItem('pkj_visited_session')) {
          isNewSession = true
          sessionStorage.setItem('pkj_visited_session', 'true')
        }
      } catch (e) {}

      const newTotalViews = prev.totalViews + 1
      const newTodayViews = prev.todayViews + 1
      const newTotalVisitors = isNewSession ? prev.totalVisitors + 1 : prev.totalVisitors
      const newTodayVisitors = isNewSession ? prev.todayVisitors + 1 : prev.todayVisitors

      const updatedWeekly = [...prev.weeklyTrend]
      if (updatedWeekly.length > 0) {
        const lastIdx = updatedWeekly.length - 1
        updatedWeekly[lastIdx] = {
          ...updatedWeekly[lastIdx],
          views: updatedWeekly[lastIdx].views + 1,
          visitors: isNewSession ? updatedWeekly[lastIdx].visitors + 1 : updatedWeekly[lastIdx].visitors,
        }
      }

      let pageFound = false
      let updatedPages = prev.topPages.map(item => {
        if (item.path === pPath || item.name === pName) {
          pageFound = true
          return { ...item, views: item.views + 1 }
        }
        return item
      })
      if (!pageFound) {
        updatedPages.push({ path: pPath, name: pName, views: 1, percentage: 0 })
      }
      const sumPageViews = updatedPages.reduce((acc, p) => acc + p.views, 0)
      updatedPages = updatedPages
        .map(p => ({
          ...p,
          percentage: Math.round((p.views / (sumPageViews || 1)) * 100),
        }))
        .sort((a, b) => b.views - a.views)

      let updatedDevices = prev.devices.map(d => (d.device === device ? { ...d, count: d.count + 1 } : d))
      const sumDeviceCounts = updatedDevices.reduce((acc, d) => acc + d.count, 0)
      updatedDevices = updatedDevices.map(d => ({
        ...d,
        percentage: Math.round((d.count / (sumDeviceCounts || 1)) * 100),
      }))

      const now = new Date()
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`
      const newLog: VisitorLog = {
        id: `log-${Date.now()}`,
        timestamp: now.toISOString(),
        timeFormatted: timeStr,
        path: pPath,
        pageName: pName,
        device,
        browser,
        location: 'Pengunjung Web',
      }
      const updatedLogs = [newLog, ...prev.recentLogs.slice(0, 24)]

      const updatedStats: VisitorStats = {
        ...prev,
        totalViews: newTotalViews,
        totalVisitors: newTotalVisitors,
        todayViews: newTodayViews,
        todayVisitors: newTodayVisitors,
        lastUpdated: now.toISOString(),
        weeklyTrend: updatedWeekly,
        topPages: updatedPages,
        devices: updatedDevices,
        recentLogs: updatedLogs,
      }

      try {
        localStorage.setItem(STORAGE_KEYS.VISITOR_STATS, JSON.stringify(updatedStats))
      } catch (e) {}

      return updatedStats
    })
  }

  const simulateNewVisitor = () => {
    const pageKeys = ['home', 'products', 'export', 'gallery', 'contact', 'about']
    const randomPage = pageKeys[Math.floor(Math.random() * pageKeys.length)]
    const cities = ['Yogyakarta, ID', 'Jakarta, ID', 'Surabaya, ID', 'Bandung, ID', 'Bali, ID', 'Tokyo, JP', 'Sydney, AU']
    const randomCity = cities[Math.floor(Math.random() * cities.length)]
    const devList: ('Mobile' | 'Desktop' | 'Tablet')[] = ['Mobile', 'Mobile', 'Desktop', 'Tablet']
    const randomDev = devList[Math.floor(Math.random() * devList.length)]
    const browsers = ['Chrome Mobile', 'Safari iOS', 'Chrome Windows', 'Firefox Mac', 'Edge Windows']
    const randomBrowser = browsers[Math.floor(Math.random() * browsers.length)]

    const pageNames: Record<string, string> = {
      home: 'Beranda Utama',
      products: 'Katalog Produk',
      export: 'Pengalaman Ekspor',
      gallery: 'Galeri Foto Kriya',
      contact: 'Kontak & Penawaran',
      about: 'Tentang Kami',
    }
    const pagePaths: Record<string, string> = {
      home: '/',
      products: '/products',
      export: '/export',
      gallery: '/gallery',
      contact: '/contact',
      about: '/about',
    }

    setVisitorStats(prev => {
      const now = new Date()
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`
      const newTotalViews = prev.totalViews + 1
      const newTotalVisitors = prev.totalVisitors + 1
      const newTodayViews = prev.todayViews + 1
      const newTodayVisitors = prev.todayVisitors + 1

      const updatedWeekly = [...prev.weeklyTrend]
      if (updatedWeekly.length > 0) {
        const lastIdx = updatedWeekly.length - 1
        updatedWeekly[lastIdx] = {
          ...updatedWeekly[lastIdx],
          views: updatedWeekly[lastIdx].views + 1,
          visitors: updatedWeekly[lastIdx].visitors + 1,
        }
      }

      let updatedPages = prev.topPages.map(p => {
        if (p.path === pagePaths[randomPage]) {
          return { ...p, views: p.views + 1 }
        }
        return p
      })
      const sumPageViews = updatedPages.reduce((acc, p) => acc + p.views, 0)
      updatedPages = updatedPages
        .map(p => ({
          ...p,
          percentage: Math.round((p.views / (sumPageViews || 1)) * 100),
        }))
        .sort((a, b) => b.views - a.views)

      let updatedDevices = prev.devices.map(d => (d.device === randomDev ? { ...d, count: d.count + 1 } : d))
      const sumDeviceCounts = updatedDevices.reduce((acc, d) => acc + d.count, 0)
      updatedDevices = updatedDevices.map(d => ({
        ...d,
        percentage: Math.round((d.count / (sumDeviceCounts || 1)) * 100),
      }))

      const newLog: VisitorLog = {
        id: `log-${Date.now()}`,
        timestamp: now.toISOString(),
        timeFormatted: timeStr,
        path: pagePaths[randomPage],
        pageName: pageNames[randomPage],
        device: randomDev,
        browser: randomBrowser,
        location: randomCity,
      }

      const updatedStats: VisitorStats = {
        ...prev,
        totalViews: newTotalViews,
        totalVisitors: newTotalVisitors,
        todayViews: newTodayViews,
        todayVisitors: newTodayVisitors,
        lastUpdated: now.toISOString(),
        weeklyTrend: updatedWeekly,
        topPages: updatedPages,
        devices: updatedDevices,
        recentLogs: [newLog, ...prev.recentLogs.slice(0, 24)],
      }

      try {
        localStorage.setItem(STORAGE_KEYS.VISITOR_STATS, JSON.stringify(updatedStats))
      } catch (e) {}

      return updatedStats
    })
  }

  const resetVisitorStats = () => {
    const freshStats = generateDefaultVisitorStats()
    setVisitorStats(freshStats)
    try {
      localStorage.setItem(STORAGE_KEYS.VISITOR_STATS, JSON.stringify(freshStats))
    } catch (e) {}
  }

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang] || translations.en,
        visitorStats,
        recordPageVisit,
        simulateNewVisitor,
        resetVisitorStats,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        news,
        addNews,
        updateNews,
        deleteNews,
        resetNewsToDefault,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        resetGalleryToDefault,
        awards,
        addAward,
        updateAward,
        deleteAward,
        resetAwardsToDefault,
        exhibitions,
        addExhibition,
        updateExhibition,
        deleteExhibition,
        resetExhibitionsToDefault,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        companyInfo,
        updateCompanyInfo,
        resetCompanyInfoToDefault,
        isAuthenticated: !!user,
        user,
        login,
        logout,
        changeAdminPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppStore = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider')
  }
  return context
}
