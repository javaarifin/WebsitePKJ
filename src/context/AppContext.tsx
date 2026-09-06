import React, { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_PRODUCTS } from '../data'

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
  // Products
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void
  resetProductsToDefault: () => void

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
  PRODUCTS: 'pkj_craft_products_v1',
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
    message: 'We are looking to order 500 units of the Terracotta Planter for our autumn catalogue in Tokyo. Please provide pricing and shipping options to Osaka Port.',
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
    message: 'Interested in bespoke rustic vases for hotel boutique decor in Melbourne. Can you customize the height to 45cm?',
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
    message: 'Halo Pak Parjono, kami membutuhkan sekitar 80 pot taman rustic untuk proyek renovasi resort kami di Ubud. Mohon dikirimkan katalog harga proyek.',
    productName: 'Rustic Garden Pot',
    country: 'Indonesia',
    quantity: '80 pcs',
    status: 'new',
    createdAt: new Date(Date.now() - 50 * 3600000).toISOString(),
  },
]

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (e) {
      console.error('Error loading products from localStorage:', e)
    }
    // Seed initial products
    const initialWithStatus: Product[] = INITIAL_PRODUCTS.map((p) => ({
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

  // Inquiries state
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

  // Auth state
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
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...productData } : p))
    )
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const resetProductsToDefault = () => {
    const initialWithStatus: Product[] = INITIAL_PRODUCTS.map((p) => ({
      ...p,
      status: 'published',
      createdAt: new Date().toISOString(),
    }))
    setProducts(initialWithStatus)
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialWithStatus))
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
    setInquiries(prev =>
      prev.map(inq => (inq.id === id ? { ...inq, status } : inq))
    )
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
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
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
