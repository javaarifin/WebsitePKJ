import { useState, useEffect } from 'react'
import { AppProvider, useAppStore } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CompanyPage from './pages/CompanyPage'
import ExportPage from './pages/ExportPage'
import AwardsPage from './pages/AwardsPage'
import ExhibitionsPage from './pages/ExhibitionsPage'
import TrainingPage from './pages/TrainingPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import AdminLoginPage from './admin/AdminLoginPage'
import AdminDashboardPage from './admin/AdminDashboardPage'
import AdminProductsPage from './admin/AdminProductsPage'
import AdminInquiriesPage from './admin/AdminInquiriesPage'

export type Page =
  | 'home'
  | 'about'
  | 'products'
  | 'product-detail'
  | 'company'
  | 'export'
  | 'awards'
  | 'exhibitions'
  | 'training'
  | 'news'
  | 'news-detail'
  | 'gallery'
  | 'contact'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-products'
  | 'admin-inquiries'

export interface NavState {
  page: Page
  productId?: number
  newsId?: number
  lang: 'en' | 'id'
}

export type NavigateFn = (page: Page, params?: { productId?: number; newsId?: number }) => void

const pathToPageMap: Record<string, Page> = {
  '/': 'home',
  '/about': 'about',
  '/products': 'products',
  '/company': 'company',
  '/export': 'export',
  '/awards': 'awards',
  '/exhibitions': 'exhibitions',
  '/training': 'training',
  '/news': 'news',
  '/gallery': 'gallery',
  '/contact': 'contact',
  '/admin': 'admin-dashboard',
  '/admin/': 'admin-dashboard',
  '/admin/login': 'admin-login',
  '/admin/dashboard': 'admin-dashboard',
  '/admin/products': 'admin-products',
  '/admin/inquiries': 'admin-inquiries',
}

const pageToPathMap: Record<Page, string> = {
  home: '/',
  about: '/about',
  products: '/products',
  'product-detail': '/products',
  company: '/company',
  export: '/export',
  awards: '/awards',
  exhibitions: '/exhibitions',
  training: '/training',
  news: '/news',
  'news-detail': '/news',
  gallery: '/gallery',
  contact: '/contact',
  'admin-login': '/admin/login',
  'admin-dashboard': '/admin/dashboard',
  'admin-products': '/admin/products',
  'admin-inquiries': '/admin/inquiries',
}

function AppContent() {
  const { isAuthenticated } = useAppStore()

  // Initialize page from URL pathname if matched
  const [nav, setNav] = useState<NavState>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/'
      const initialPage = pathToPageMap[path] || 'home'
      return { page: initialPage, lang: 'en' }
    }
    return { page: 'home', lang: 'en' }
  })

  // Navigate handler with URL synchronization
  const navigate: NavigateFn = (page, params) => {
    setNav(prev => ({ ...prev, page, productId: undefined, newsId: undefined, ...params }))
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const targetPath = pageToPathMap[page]
    if (targetPath && typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath)
    }
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/'
      const matchedPage = pathToPageMap[path]
      if (matchedPage) {
        setNav(prev => ({ ...prev, page: matchedPage, productId: undefined, newsId: undefined }))
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Route Guard for Admin pages
  useEffect(() => {
    const isAdminRoute =
      nav.page === 'admin-dashboard' ||
      nav.page === 'admin-products' ||
      nav.page === 'admin-inquiries'

    if (isAdminRoute && !isAuthenticated) {
      navigate('admin-login')
    } else if (nav.page === 'admin-login' && isAuthenticated) {
      navigate('admin-dashboard')
    }
  }, [nav.page, isAuthenticated])

  const setLang = (lang: 'en' | 'id') => setNav(prev => ({ ...prev, lang }))

  // Update document title
  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'PARJONO KERAMIK JAYA | Handcrafted Terracotta from Yogyakarta',
      about: 'About PARJONO KERAMIK JAYA | Indonesian Terracotta Craft',
      products: 'Terracotta & Clay Products | PARJONO KERAMIK JAYA',
      'product-detail': 'Product | PARJONO KERAMIK JAYA',
      company: 'Company | PARJONO KERAMIK JAYA',
      export: 'Export Experience | PARJONO KERAMIK JAYA',
      awards: 'Awards & Achievements | PARJONO KERAMIK JAYA',
      exhibitions: 'Exhibitions | PARJONO KERAMIK JAYA',
      training: 'Training & Activities | PARJONO KERAMIK JAYA',
      news: 'Stories & Activities | PARJONO KERAMIK JAYA',
      'news-detail': 'News | PARJONO KERAMIK JAYA',
      gallery: 'Gallery | PARJONO KERAMIK JAYA',
      contact: 'Contact PARJONO KERAMIK JAYA',
      'admin-login': 'Admin Login | PARJONO KERAMIK JAYA CMS',
      'admin-dashboard': 'Admin Dashboard | PARJONO KERAMIK JAYA CMS',
      'admin-products': 'Manajemen Produk | PARJONO KERAMIK JAYA CMS',
      'admin-inquiries': 'Manajemen Pesan & Inquiry | PARJONO KERAMIK JAYA CMS',
    }
    document.title = titles[nav.page] || titles.home
  }, [nav.page])

  const isAdminPage =
    nav.page === 'admin-login' ||
    nav.page === 'admin-dashboard' ||
    nav.page === 'admin-products' ||
    nav.page === 'admin-inquiries'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F1E8', color: '#302A26' }}>
      {/* Only show public navbar on public pages */}
      {!isAdminPage && <Navbar nav={nav} navigate={navigate} setLang={setLang} />}

      <main>
        {/* Public Pages */}
        {nav.page === 'home' && <HomePage navigate={navigate} />}
        {nav.page === 'about' && <AboutPage navigate={navigate} />}
        {nav.page === 'products' && <ProductsPage navigate={navigate} />}
        {nav.page === 'product-detail' && (
          <ProductDetailPage navigate={navigate} productId={nav.productId} />
        )}
        {nav.page === 'company' && <CompanyPage navigate={navigate} />}
        {nav.page === 'export' && <ExportPage navigate={navigate} />}
        {nav.page === 'awards' && <AwardsPage navigate={navigate} />}
        {nav.page === 'exhibitions' && <ExhibitionsPage navigate={navigate} />}
        {nav.page === 'training' && <TrainingPage navigate={navigate} />}
        {nav.page === 'news' && <NewsPage navigate={navigate} />}
        {nav.page === 'news-detail' && (
          <NewsDetailPage navigate={navigate} newsId={nav.newsId} />
        )}
        {nav.page === 'gallery' && <GalleryPage navigate={navigate} />}
        {nav.page === 'contact' && <ContactPage navigate={navigate} />}

        {/* Admin Pages */}
        {nav.page === 'admin-login' && <AdminLoginPage navigate={navigate} />}
        {nav.page === 'admin-dashboard' && <AdminDashboardPage navigate={navigate} />}
        {nav.page === 'admin-products' && <AdminProductsPage navigate={navigate} />}
        {nav.page === 'admin-inquiries' && <AdminInquiriesPage navigate={navigate} />}
      </main>

      {/* Only show public footer & WhatsApp button on public pages */}
      {!isAdminPage && <Footer navigate={navigate} />}
      {!isAdminPage && <WhatsAppButton />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
