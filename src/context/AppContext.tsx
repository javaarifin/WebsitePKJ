import React, { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_PRODUCTS, NEWS, GALLERY_IMAGES, AWARDS, EXHIBITIONS } from '../data'
import { Lang, TranslationDictionary, translations } from '../translations'

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
}

interface AppContextType {
  // Language & i18n
  lang: Lang
  setLang: (lang: Lang) => void
  t: TranslationDictionary

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

  // Auth
  isAuthenticated: boolean
  user: AuthUser | null
  login: (username: string, password: string) => { success: boolean; error?: string }
  logout: () => void
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
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
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

  // 7. Auth state
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Error loading auth from localStorage:', e)
    }
    return null
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

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    const newProduct: Product = {
      ...productData,
      id: nextId,
      createdAt: new Date().toISOString(),
    }
    setProducts(prev => [newProduct, ...prev])
    return newProduct
  }

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...productData } : p)))
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
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
    return newItem
  }

  const updateNews = (id: number, itemData: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => (n.id === id ? { ...n, ...itemData } : n)))
  }

  const deleteNews = (id: number) => {
    setNews(prev => prev.filter(n => n.id !== id))
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
    return newItem
  }

  const updateGalleryItem = (id: number, itemData: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => (g.id === id ? { ...g, ...itemData } : g)))
  }

  const deleteGalleryItem = (id: number) => {
    setGallery(prev => prev.filter(g => g.id !== id))
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
    return newItem
  }

  const updateAward = (id: number, itemData: Partial<AwardItem>) => {
    setAwards(prev => prev.map(a => (a.id === id ? { ...a, ...itemData } : a)))
  }

  const deleteAward = (id: number) => {
    setAwards(prev => prev.filter(a => a.id !== id))
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
    return newItem
  }

  const updateExhibition = (id: number, itemData: Partial<ExhibitionItem>) => {
    setExhibitions(prev => prev.map(e => (e.id === id ? { ...e, ...itemData } : e)))
  }

  const deleteExhibition = (id: number) => {
    setExhibitions(prev => prev.filter(e => e.id !== id))
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
    return newInquiry
  }

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(inq => (inq.id === id ? { ...inq, status } : inq)))
  }

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id))
  }

  // Auth operations
  const login = (username: string, password: string) => {
    const trimmedUser = username.trim()
    const trimmedPass = password.trim()
    if (trimmedUser === 'admin' && trimmedPass === 'admin123') {
      const authUser: AuthUser = {
        username: 'admin',
        name: 'Parjono Admin',
        role: 'superadmin',
      }
      setUser(authUser)
      return { success: true }
    }
    return { success: false, error: 'Username atau password salah. Gunakan admin / admin123' }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang] || translations.en,
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
        isAuthenticated: !!user,
        user,
        login,
        logout,
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
