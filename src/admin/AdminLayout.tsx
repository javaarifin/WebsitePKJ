import React, { useState } from "react"
import { Page, NavigateFn } from "../App"
import { useAppStore } from "../context/AppContext"
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Globe,
  LogOut,
  Menu,
  X,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Newspaper,
  Image,
  Award,
  Sparkles,
} from "lucide-react"

interface AdminLayoutProps {
  currentPage: Page
  navigate: NavigateFn
  children: React.ReactNode
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function AdminLayout({
  currentPage,
  navigate,
  children,
  title,
  subtitle,
  actions,
}: AdminLayoutProps) {
  const {
    user,
    logout,
    products,
    inquiries,
    news,
    gallery,
    awards,
    exhibitions,
  } = useAppStore()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const newInquiriesCount = inquiries.filter((i) => i.status === "new").length

  const navItems = [
    {
      label: "Dashboard Overview",
      page: "admin-dashboard" as Page,
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Katalog Produk",
      page: "admin-products" as Page,
      icon: Package,
      badge: products.length,
    },
    {
      label: "Berita & Artikel",
      page: "admin-news" as Page,
      icon: Newspaper,
      badge: news.length,
    },
    {
      label: "Galeri Foto",
      page: "admin-gallery" as Page,
      icon: Image,
      badge: gallery.length,
    },
    {
      label: "Penghargaan",
      page: "admin-awards" as Page,
      icon: Award,
      badge: awards.length,
    },
    {
      label: "Pameran (Exhibitions)",
      page: "admin-exhibitions" as Page,
      icon: Sparkles,
      badge: exhibitions.length,
    },
    {
      label: "Pesan & Inquiries",
      page: "admin-inquiries" as Page,
      icon: MessageSquare,
      badge: newInquiriesCount > 0 ? newInquiriesCount : null,
      badgeColor: "bg-[#A65F46] text-white",
    },
  ]

  const handleLogout = () => {
    logout()
    navigate("admin-login")
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col lg:flex-row text-[#302A26] font-sans">
      {/* Mobile Header Bar */}
      <header className="lg:hidden bg-[#302A26] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div>
            <span className="font-display font-bold text-sm tracking-wide text-white">
              PARJONO
            </span>
            <span className="text-[10px] bg-[#A65F46] text-white px-1.5 py-0.5 rounded font-mono ml-2">
              CMS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("home")}
            className="text-xs text-white/80 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1.5 rounded-lg"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-white/80 hover:text-red-300 p-1.5"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Sidebar Backdrop on Mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-72 bg-[#302A26] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } h-screen shadow-xl overflow-y-auto`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-wider text-white">
                  PARJONO
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#A65F46] text-white px-2 py-0.5 rounded shadow-sm">
                  CMS
                </span>
              </div>
              <span className="text-xs text-[#D8C3A5] font-light tracking-[0.2em] mt-0.5">
                KERAMIK JAYA
              </span>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6">
            <p className="px-3 text-[10px] font-semibold text-white/40 tracking-widest uppercase mb-3">
              Menu Pengelolaan
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.page
                return (
                  <button
                    key={item.page}
                    onClick={() => {
                      navigate(item.page)
                      setMobileSidebarOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#A65F46] text-white shadow-sm font-semibold"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== null && item.badge !== undefined && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                          item.badgeColor
                            ? item.badgeColor
                            : isActive
                              ? "bg-white/20 text-white"
                              : "bg-white/10 text-white/80"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Quick Switch to Public Site */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <p className="px-3 text-[10px] font-semibold text-white/40 tracking-widest uppercase mb-3">
                Live Website
              </p>
              <button
                onClick={() => {
                  navigate("home")
                  setMobileSidebarOpen(false)
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-[#D8C3A5] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#D8C3A5]" />
                  <span>Lihat Web Publik</span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40" />
              </button>
              <button
                onClick={() => {
                  navigate("products")
                  setMobileSidebarOpen(false)
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-[#D8C3A5] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#D8C3A5]" />
                  <span>Katalog Produk</span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40" />
              </button>
              <button
                onClick={() => {
                  navigate("news")
                  setMobileSidebarOpen(false)
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-[#D8C3A5] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Newspaper className="w-5 h-5 text-[#D8C3A5]" />
                  <span>Halaman Berita</span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40" />
              </button>
            </div>
          </div>
        </div>

        {/* User Footer Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#A65F46]/30 border border-[#A65F46]/50 flex items-center justify-center text-[#D8C3A5]">
                <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">
                  {user?.name || "Administrator"}
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {user?.role || "Super Admin"}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-white/60 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-[#D8C3A5]/40 px-6 py-4 hidden lg:flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#302A26]/50 mb-1">
              <span>Admin Dashboard</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#A65F46] font-medium capitalize">
                {currentPage.replace("admin-", "")}
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold text-[#302A26]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-[#302A26]/60 mt-0.5">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {actions}
            <button
              onClick={() => navigate("home")}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#302A26]/70 hover:text-[#302A26] bg-[#F8F6F0] hover:bg-[#D8C3A5]/30 rounded-lg border border-[#D8C3A5]/50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#A65F46]" />
              <span>Lihat Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Mobile Page Header (if on mobile) */}
        <div className="lg:hidden p-4 bg-white border-b border-[#D8C3A5]/40 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-xl font-bold text-[#302A26]">
              {title}
            </h1>
            {actions}
          </div>
          {subtitle && <p className="text-xs text-[#302A26]/60">{subtitle}</p>}
        </div>

        {/* Main Content Body */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
