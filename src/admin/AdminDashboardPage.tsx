import React, { useState } from "react"
import { NavigateFn } from "../App"
import { useAppStore } from "../context/AppContext"
import AdminLayout from "./AdminLayout"
import {
  Package,
  MessageSquare,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Eye,
  Newspaper,
  Image,
  Award,
  Sparkles,
  Users,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  RefreshCw,
  Activity,
  Compass,
} from "lucide-react"

interface AdminDashboardPageProps {
  navigate: NavigateFn
}

export default function AdminDashboardPage({
  navigate,
}: AdminDashboardPageProps) {
  const {
    products,
    inquiries,
    news,
    gallery,
    awards,
    exhibitions,
    visitorStats,
    simulateNewVisitor,
    resetVisitorStats,
    updateInquiryStatus,
  } = useAppStore()

  const [activeTab, setActiveTab] = useState<"overview" | "visitors">("overview")
  const [showSimulateSuccess, setShowSimulateSuccess] = useState(false)

  const publishedCount = products.filter((p) => p.status === "published").length
  const draftCount = products.filter((p) => p.status === "draft").length
  const newInquiries = inquiries.filter((i) => i.status === "new")

  // Categories count
  const categoriesMap = products.reduce(
    (acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const recentProducts = products.slice(0, 5)
  const recentNews = news.slice(0, 4)
  const recentExhibitions = exhibitions.slice(0, 4)
  const recentInquiries = inquiries.slice(0, 5)

  // Max views in weekly trend for dynamic bar chart height calculation
  const maxWeeklyViews = Math.max(
    ...visitorStats.weeklyTrend.map((d) => d.views),
    10,
  )

  const handleSimulate = () => {
    simulateNewVisitor()
    setShowSimulateSuccess(true)
    setTimeout(() => setShowSimulateSuccess(false), 2500)
  }

  return (
    <AdminLayout
      currentPage="admin-dashboard"
      navigate={navigate}
      title="Dashboard Overview"
      subtitle="Ringkasan data produk, artikel berita, galeri foto, pesan, dan statistik pengunjung website"
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate("admin-products")}
            className="flex items-center gap-1.5 bg-[#A65F46] hover:bg-[#8f5239] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Produk</span>
          </button>
          <button
            onClick={() => navigate("admin-exhibitions")}
            className="flex items-center gap-1.5 bg-[#7A8065] hover:bg-[#666c53] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Pameran</span>
          </button>
          <button
            onClick={() => navigate("admin-news")}
            className="flex items-center gap-1.5 bg-[#302A26] hover:bg-black text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tulis Berita</span>
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Metric Cards - 6 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Card 1: Total Products */}
          <div
            onClick={() => navigate("admin-products")}
            className="bg-white p-5 rounded-2xl border border-[#D8C3A5]/40 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#A65F46]/50 transition-colors"
          >
            <div>
              <p className="text-[11px] font-semibold text-[#302A26]/50 uppercase tracking-wider mb-1">
                Katalog Produk
              </p>
              <h3 className="font-display text-2xl font-bold text-[#302A26]">
                {products.length}
              </h3>
              <p className="text-[11px] text-emerald-600 flex items-center gap-1 mt-1.5">
                <span>{publishedCount} tayang</span>
                {draftCount > 0 && (
                  <span className="text-amber-600">({draftCount} draft)</span>
                )}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#A65F46]/10 text-[#A65F46] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Berita & Artikel */}
          <div
            onClick={() => navigate("admin-news")}
            className="bg-white p-5 rounded-2xl border border-[#D8C3A5]/40 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#A65F46]/50 transition-colors"
          >
            <div>
              <p className="text-[11px] font-semibold text-[#302A26]/50 uppercase tracking-wider mb-1">
                Berita & Cerita
              </p>
              <h3 className="font-display text-2xl font-bold text-[#302A26]">
                {news.length}
              </h3>
              <p className="text-[11px] text-[#A65F46] mt-1.5">
                Artikel kegiatan
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Galeri Foto */}
          <div
            onClick={() => navigate("admin-gallery")}
            className="bg-white p-5 rounded-2xl border border-[#D8C3A5]/40 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#A65F46]/50 transition-colors"
          >
            <div>
              <p className="text-[11px] font-semibold text-[#302A26]/50 uppercase tracking-wider mb-1">
                Galeri Foto
              </p>
              <h3 className="font-display text-2xl font-bold text-[#302A26]">
                {gallery.length}
              </h3>
              <p className="text-[11px] text-[#7A8065] mt-1.5">
                Dokumentasi kriya
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Image className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4: Awards */}
          <div
            onClick={() => navigate("admin-awards")}
            className="bg-white p-5 rounded-2xl border border-[#D8C3A5]/40 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#A65F46]/50 transition-colors"
          >
            <div>
              <p className="text-[11px] font-semibold text-[#302A26]/50 uppercase tracking-wider mb-1">
                Penghargaan
              </p>
              <h3 className="font-display text-2xl font-bold text-[#302A26]">
                {awards.length}
              </h3>
              <p className="text-[11px] text-amber-600 mt-1.5">
                Prestasi kriya
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>

          {/* Card 5: Exhibitions (Pameran) */}
          <div
            onClick={() => navigate("admin-exhibitions")}
            className="bg-white p-5 rounded-2xl border border-[#D8C3A5]/40 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#A65F46]/50 transition-colors"
          >
            <div>
              <p className="text-[11px] font-semibold text-[#302A26]/50 uppercase tracking-wider mb-1">
                Pameran Diikuti
              </p>
              <h3 className="font-display text-2xl font-bold text-[#302A26]">
                {exhibitions.length}
              </h3>
              <p className="text-[11px] text-[#7A8065] mt-1.5">
                Riwayat pameran
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#7A8065]/15 text-[#7A8065] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Card 6: Inquiries */}
          <div
            onClick={() => navigate("admin-inquiries")}
            className="bg-white p-5 rounded-2xl border border-[#D8C3A5]/40 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#A65F46]/50 transition-colors"
          >
            <div>
              <p className="text-[11px] font-semibold text-[#302A26]/50 uppercase tracking-wider mb-1">
                Pesan & Inquiry
              </p>
              <h3 className="font-display text-2xl font-bold text-[#A65F46]">
                {inquiries.length}
              </h3>
              <p className="text-[11px] text-[#A65F46] font-medium mt-1.5">
                {newInquiries.length} belum dibalas
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#A65F46]/10 text-[#A65F46] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STATISTIK PENGUNJUNG WEBSITE (LIVE WEB ANALYTICS) */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-[#D8C3A5]/50 shadow-sm p-6 lg:p-8 space-y-6">
          {/* Header Analytics */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#D8C3A5]/30">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Live Traffic Tracker
                </span>
                {showSimulateSuccess && (
                  <span className="text-[11px] font-semibold text-[#A65F46] animate-pulse">
                    +1 Kunjungan baru tercatat!
                  </span>
                )}
              </div>
              <h2 className="font-display text-2xl font-bold text-[#302A26]">
                Statistik Pengunjung Website
              </h2>
              <p className="text-xs text-[#302A26]/60">
                Data interaksi pengunjung real-time saat menjelajahi katalog produk, cerita ekspor, dan kontak PKJ Craft
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulate}
                className="flex items-center gap-1.5 bg-[#A65F46]/10 hover:bg-[#A65F46] text-[#A65F46] hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs"
                title="Simulasi pengunjung baru membuka website"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Simulasi Kunjungan (+1)</span>
              </button>
              <button
                onClick={resetVisitorStats}
                className="p-2 rounded-xl border border-[#D8C3A5]/60 hover:bg-[#F8F6F0] text-[#302A26]/60 hover:text-[#302A26] transition-colors"
                title="Reset statistik ke data default"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4 Analytics Metric Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Total Views */}
            <div className="bg-[#F8F6F0] p-5 rounded-2xl border border-[#D8C3A5]/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#302A26]/60 uppercase tracking-wider">
                  Total Dilihat (Pageviews)
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#A65F46]/15 text-[#A65F46] flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-display text-3xl font-bold text-[#302A26] mb-1">
                {visitorStats.totalViews.toLocaleString("id-ID")}
              </h3>
              <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12.4% minggu ini</span>
              </p>
            </div>

            {/* Metric 2: Unique Visitors */}
            <div className="bg-[#F8F6F0] p-5 rounded-2xl border border-[#D8C3A5]/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#302A26]/60 uppercase tracking-wider">
                  Pengunjung Unik
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-display text-3xl font-bold text-[#302A26] mb-1">
                {visitorStats.totalVisitors.toLocaleString("id-ID")}
              </h3>
              <p className="text-[11px] text-[#302A26]/60">
                Sesi perangkat unik
              </p>
            </div>

            {/* Metric 3: Today's Visits */}
            <div className="bg-[#F8F6F0] p-5 rounded-2xl border border-[#D8C3A5]/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#302A26]/60 uppercase tracking-wider">
                  Kunjungan Hari Ini
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-display text-3xl font-bold text-[#A65F46] mb-1">
                {visitorStats.todayViews.toLocaleString("id-ID")}
              </h3>
              <p className="text-[11px] text-emerald-700 font-medium">
                {visitorStats.todayVisitors} pengunjung unik hari ini
              </p>
            </div>

            {/* Metric 4: Average Pages / Session */}
            <div className="bg-[#F8F6F0] p-5 rounded-2xl border border-[#D8C3A5]/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#302A26]/60 uppercase tracking-wider">
                  Rata-rata Hal. / Sesi
                </span>
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-display text-3xl font-bold text-[#302A26] mb-1">
                {(
                  visitorStats.totalViews /
                  (visitorStats.totalVisitors || 1)
                ).toFixed(1)}
              </h3>
              <p className="text-[11px] text-[#7A8065] font-medium">
                Kedalaman eksplorasi kriya
              </p>
            </div>
          </div>

          {/* Grid 2 Columns: 7-Day Trend Chart & Top Pages / Devices */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Left Chart (7 spans): 7-Day Visitor Trend */}
            <div className="lg:col-span-7 bg-[#FAF8F5] rounded-2xl p-6 border border-[#D8C3A5]/40 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-base text-[#302A26]">
                    Tren Kunjungan 7 Hari Terakhir
                  </h3>
                  <p className="text-xs text-[#302A26]/50">
                    Jumlah halaman yang diakses setiap hari
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#A65F46] bg-[#A65F46]/10 px-2.5 py-1 rounded-lg">
                  7 Hari
                </span>
              </div>

              {/* Visual Bar Chart */}
              <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 pt-4 pb-2 border-b border-[#D8C3A5]/30">
                {visitorStats.weeklyTrend.map((item, idx) => {
                  const heightPercent = Math.max(
                    Math.round((item.views / maxWeeklyViews) * 100),
                    12,
                  )
                  const isToday = idx === visitorStats.weeklyTrend.length - 1

                  return (
                    <div
                      key={item.date}
                      className="flex-1 flex flex-col items-center h-full justify-end group relative"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#302A26] text-white text-[10px] font-mono py-1 px-2 rounded-lg whitespace-nowrap pointer-events-none shadow-md z-10">
                        {item.views} views ({item.visitors} unik)
                      </div>

                      {/* Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full max-w-[42px] rounded-t-xl transition-all duration-300 group-hover:scale-y-105 ${
                          isToday
                            ? "bg-gradient-to-t from-[#A65F46] to-[#d87c5c] shadow-sm"
                            : "bg-[#D8C3A5] hover:bg-[#bda586]"
                        }`}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Chart Labels */}
              <div className="flex items-center justify-between gap-2 sm:gap-4 pt-3 text-center">
                {visitorStats.weeklyTrend.map((item, idx) => {
                  const isToday = idx === visitorStats.weeklyTrend.length - 1
                  return (
                    <div key={item.date} className="flex-1">
                      <p
                        className={`text-[11px] font-bold ${
                          isToday ? "text-[#A65F46]" : "text-[#302A26]/70"
                        }`}
                      >
                        {item.dayName}
                      </p>
                      <p className="text-[10px] text-[#302A26]/40">{item.date}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Column (5 spans): Devices & Top Pages */}
            <div className="lg:col-span-5 space-y-6">
              {/* Device Breakdown */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#D8C3A5]/40">
                <h4 className="font-display font-bold text-sm text-[#302A26] mb-3">
                  Perangkat Pengunjung
                </h4>
                <div className="space-y-3">
                  {visitorStats.devices.map((d) => {
                    const iconMap = {
                      Mobile: <Smartphone className="w-3.5 h-3.5 text-blue-600" />,
                      Desktop: <Monitor className="w-3.5 h-3.5 text-emerald-600" />,
                      Tablet: <Tablet className="w-3.5 h-3.5 text-purple-600" />,
                    }

                    return (
                      <div key={d.device} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 font-medium text-[#302A26]">
                            {iconMap[d.device]}
                            {d.device === "Mobile"
                              ? "Smartphone"
                              : d.device === "Desktop"
                                ? "Komputer / Laptop"
                                : "Tablet / iPad"}
                          </span>
                          <span className="font-bold text-[#302A26] font-mono">
                            {d.percentage}% ({d.count})
                          </span>
                        </div>
                        <div className="w-full bg-[#D8C3A5]/30 rounded-full h-2 overflow-hidden">
                          <div
                            style={{ width: `${d.percentage}%` }}
                            className={`h-full rounded-full ${
                              d.device === "Mobile"
                                ? "bg-blue-600"
                                : d.device === "Desktop"
                                  ? "bg-emerald-600"
                                  : "bg-purple-600"
                            }`}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Top Pages */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#D8C3A5]/40">
                <h4 className="font-display font-bold text-sm text-[#302A26] mb-3">
                  Halaman Paling Populer
                </h4>
                <div className="space-y-2.5">
                  {visitorStats.topPages.slice(0, 4).map((page, rank) => (
                    <div
                      key={page.path}
                      className="flex items-center justify-between text-xs p-2 rounded-xl bg-white border border-[#D8C3A5]/30"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#A65F46]/10 text-[#A65F46] font-bold text-[10px] flex items-center justify-center">
                          #{rank + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-[#302A26] line-clamp-1">
                            {page.name}
                          </p>
                          <p className="text-[10px] text-[#302A26]/40 font-mono">
                            {page.path}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold font-mono text-[#A65F46] bg-[#A65F46]/10 px-2 py-0.5 rounded text-[11px]">
                        {page.views} views
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Visitor Log Feed */}
          <div className="pt-4 border-t border-[#D8C3A5]/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-base text-[#302A26]">
                  Aktivitas Pengunjung Terkini (Live Feed)
                </h3>
                <p className="text-xs text-[#302A26]/50">
                  Daftar pengunjung terbaru yang membuka halaman website PKJ Craft
                </p>
              </div>
              <span className="text-xs text-[#302A26]/40">
                Menampilkan {Math.min(visitorStats.recentLogs.length, 6)} aktivitas terakhir
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D8C3A5]/40 text-[#302A26]/50 uppercase tracking-wider text-[10px]">
                    <th className="pb-2.5 font-semibold">Waktu</th>
                    <th className="pb-2.5 font-semibold">Halaman Di Browse</th>
                    <th className="pb-2.5 font-semibold">Perangkat / Browser</th>
                    <th className="pb-2.5 font-semibold">Asal Pengunjung</th>
                    <th className="pb-2.5 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8C3A5]/20">
                  {visitorStats.recentLogs.slice(0, 6).map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-[#F8F6F0]/80 transition-colors"
                    >
                      <td className="py-2.5 pr-2 font-mono text-[#302A26]/60">
                        {log.timeFormatted}
                      </td>
                      <td className="py-2.5 px-2">
                        <span className="font-semibold text-[#302A26] block">
                          {log.pageName}
                        </span>
                        <span className="text-[10px] text-[#302A26]/40 font-mono">
                          {log.path}
                        </span>
                      </td>
                      <td className="py-2.5 px-2">
                        <div className="flex items-center gap-1.5">
                          {log.device === "Mobile" ? (
                            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                          ) : (
                            <Monitor className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                          <span className="text-[#302A26]/80">{log.browser}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2">
                        <span className="inline-flex items-center gap-1 text-[#302A26]/80">
                          <Globe className="w-3 h-3 text-[#7A8065]" />
                          {log.location}
                        </span>
                      </td>
                      <td className="py-2.5 pl-2 text-right">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Terverifikasi
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-[#302A26] text-white p-6 rounded-3xl shadow-sm border border-white/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8C3A5]">
                Pusat Kontrol Cepat
              </span>
              <h3 className="font-display font-bold text-lg text-white">
                Kelola Konten Website
              </h3>
            </div>
            <p className="text-xs text-white/60">
              Pilih modul untuk menambah atau mengedit data yang tampil pada
              website publik
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <button
              onClick={() => navigate("admin-products")}
              className="bg-white/10 hover:bg-[#A65F46] p-3.5 rounded-2xl text-left transition-all group flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center mb-2 text-[#D8C3A5] group-hover:text-white">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white block">
                Produk Keramik
              </span>
              <span className="text-[11px] text-white/50 group-hover:text-white/80">
                {products.length} terdaftar
              </span>
            </button>

            <button
              onClick={() => navigate("admin-news")}
              className="bg-white/10 hover:bg-[#A65F46] p-3.5 rounded-2xl text-left transition-all group flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center mb-2 text-[#D8C3A5] group-hover:text-white">
                <Newspaper className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white block">
                Berita & Artikel
              </span>
              <span className="text-[11px] text-white/50 group-hover:text-white/80">
                {news.length} artikel
              </span>
            </button>

            <button
              onClick={() => navigate("admin-gallery")}
              className="bg-white/10 hover:bg-[#A65F46] p-3.5 rounded-2xl text-left transition-all group flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center mb-2 text-[#D8C3A5] group-hover:text-white">
                <Image className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white block">
                Galeri Foto
              </span>
              <span className="text-[11px] text-white/50 group-hover:text-white/80">
                {gallery.length} foto kriya
              </span>
            </button>

            <button
              onClick={() => navigate("admin-awards")}
              className="bg-white/10 hover:bg-[#A65F46] p-3.5 rounded-2xl text-left transition-all group flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center mb-2 text-[#D8C3A5] group-hover:text-white">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white block">
                Penghargaan
              </span>
              <span className="text-[11px] text-white/50 group-hover:text-white/80">
                {awards.length} penghargaan
              </span>
            </button>

            <button
              onClick={() => navigate("admin-exhibitions")}
              className="bg-white/10 hover:bg-[#A65F46] p-3.5 rounded-2xl text-left transition-all group flex flex-col justify-between col-span-2 sm:col-span-1"
            >
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center mb-2 text-[#D8C3A5] group-hover:text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white block">
                Agenda Pameran
              </span>
              <span className="text-[11px] text-white/50 group-hover:text-white/80">
                {exhibitions.length} event pameran
              </span>
            </button>
          </div>
        </div>

        {/* Two Columns: Recent Products & Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 spans): Recent Products & News */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Products */}
            <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 shadow-xs p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#302A26]">
                    Produk Terbaru di Katalog
                  </h3>
                  <p className="text-xs text-[#302A26]/50">
                    Daftar produk terakhir yang dikelola di sistem
                  </p>
                </div>
                <button
                  onClick={() => navigate("admin-products")}
                  className="text-xs font-semibold text-[#A65F46] hover:text-[#8f5239] flex items-center gap-1"
                >
                  <span>Kelola Semua ({products.length})</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Product Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#D8C3A5]/30 text-[11px] font-semibold text-[#302A26]/50 uppercase tracking-wider">
                      <th className="pb-3">Produk</th>
                      <th className="pb-3">Kategori</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8C3A5]/20">
                    {recentProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-[#F8F6F0]/60 transition-colors"
                      >
                        <td className="py-3.5 pr-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover bg-[#D8C3A5]/50 flex-shrink-0"
                            />
                            <div>
                              <p className="font-semibold text-[#302A26] line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-xs text-[#302A26]/50 line-clamp-1">
                                {product.material || "Terracotta"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F8F6F0] text-[#7A8065] border border-[#D8C3A5]/40">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Tayang
                          </span>
                        </td>
                        <td className="py-3.5 pl-3 text-right">
                          <button
                            onClick={() => navigate("admin-products")}
                            className="text-[#A65F46] hover:text-[#8f5239] font-medium text-xs hover:underline"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent News Articles */}
            <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 shadow-xs p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#302A26]">
                    Artikel & Kegiatan Terkini
                  </h3>
                  <p className="text-xs text-[#302A26]/50">
                    Publikasi berita workshop dan kriya gerabah
                  </p>
                </div>
                <button
                  onClick={() => navigate("admin-news")}
                  className="text-xs font-semibold text-[#A65F46] hover:text-[#8f5239] flex items-center gap-1"
                >
                  <span>Kelola Berita ({news.length})</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {recentNews.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate("admin-news")}
                    className="p-3.5 rounded-xl border border-[#D8C3A5]/40 hover:border-[#A65F46] transition-all cursor-pointer flex gap-3 group bg-white"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover bg-[#D8C3A5]/40 flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-semibold text-[#A65F46] uppercase tracking-wide block mb-0.5">
                        {item.category}
                      </span>
                      <h4 className="font-semibold text-xs text-[#302A26] line-clamp-1 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#302A26]/60 line-clamp-2">
                        {item.excerpt || item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Exhibitions */}
            <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 shadow-xs p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#302A26]">
                    Pameran yang Pernah Diikuti
                  </h3>
                  <p className="text-xs text-[#302A26]/50">
                    Riwayat pameran nasional &amp; internasional yang tampil di halaman Pameran
                  </p>
                </div>
                <button
                  onClick={() => navigate("admin-exhibitions")}
                  className="text-xs font-semibold text-[#A65F46] hover:text-[#8f5239] flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>Kelola Pameran ({exhibitions.length})</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {recentExhibitions.length === 0 ? (
                <div className="text-center py-6 bg-[#F8F6F0] rounded-xl border border-[#D8C3A5]/40">
                  <p className="text-xs text-[#302A26]/60 mb-3">
                    Belum ada data pameran tercatat.
                  </p>
                  <button
                    onClick={() => navigate("admin-exhibitions")}
                    className="inline-flex items-center gap-1.5 bg-[#A65F46] text-white px-3.5 py-2 rounded-xl text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Pameran Pertama</span>
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {recentExhibitions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate("admin-exhibitions")}
                      className="p-3.5 rounded-xl border border-[#D8C3A5]/40 hover:border-[#A65F46] transition-all cursor-pointer flex gap-3 group bg-white"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover bg-[#D8C3A5]/40 flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="overflow-hidden flex-1">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-white bg-[#A65F46] px-2 py-0.5 rounded-full">
                            {item.year}
                          </span>
                          <span className="text-[11px] font-semibold text-[#A65F46] group-hover:underline">
                            Update
                          </span>
                        </div>
                        <h4 className="font-semibold text-xs text-[#302A26] line-clamp-1 mb-0.5">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#7A8065] font-medium line-clamp-1">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 shadow-xs p-6">
              <h3 className="font-display font-bold text-base text-[#302A26] mb-4">
                Distribusi Kategori Keramik
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(categoriesMap).map(([cat, count]) => (
                  <div
                    key={cat}
                    className="p-3 rounded-xl bg-[#F8F6F0] border border-[#D8C3A5]/40 flex items-center justify-between"
                  >
                    <span className="text-xs font-medium text-[#302A26]">
                      {cat}
                    </span>
                    <span className="text-xs font-bold font-mono bg-white px-2 py-0.5 rounded-md text-[#A65F46] border border-[#D8C3A5]/30">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 span): Recent Inquiries & Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 shadow-xs p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#302A26]">
                    Pesan Terbaru
                  </h3>
                  <p className="text-xs text-[#302A26]/50">
                    Inquiry dari website publik
                  </p>
                </div>
                <button
                  onClick={() => navigate("admin-inquiries")}
                  className="text-xs font-semibold text-[#A65F46] hover:text-[#8f5239] flex items-center gap-1"
                >
                  <span>Semua ({inquiries.length})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {recentInquiries.length === 0 ? (
                <p className="text-sm text-[#302A26]/40 py-8 text-center">
                  Belum ada pesan masuk
                </p>
              ) : (
                <div className="space-y-3.5">
                  {recentInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-3.5 rounded-xl bg-[#F8F6F0] border border-[#D8C3A5]/30 hover:border-[#A65F46]/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-semibold text-xs text-[#302A26] line-clamp-1">
                          {inq.name}
                        </span>
                        {inq.status === "new" ? (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#A65F46] text-white">
                            Baru
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#D8C3A5]/50 text-[#302A26]">
                            {inq.status}
                          </span>
                        )}
                      </div>

                      {inq.company && (
                        <p className="text-[11px] text-[#A65F46] font-medium mb-1">
                          {inq.company} {inq.country ? `(${inq.country})` : ""}
                        </p>
                      )}

                      <p className="text-xs text-[#302A26]/70 line-clamp-2 leading-relaxed mb-2">
                        {inq.message}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-[#302A26]/40 pt-2 border-t border-[#D8C3A5]/30">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(inq.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                        {inq.status === "new" && (
                          <button
                            onClick={() =>
                              updateInquiryStatus(inq.id, "contacted")
                            }
                            className="text-[#A65F46] font-medium hover:underline text-[11px]"
                          >
                            Tandai Dibalas
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live website link card */}
            <div className="bg-[#302A26] text-white rounded-2xl p-6 relative overflow-hidden shadow-md">
              <div className="relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8C3A5]">
                  Sistem Real-Time
                </span>
                <h4 className="font-display font-bold text-base text-white mt-1 mb-2">
                  Terhubung Langsung ke Web
                </h4>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Setiap konten berita, foto galeri, penghargaan, dan pameran
                  yang Anda tambahkan atau edit akan seketika tampil di website
                  publik.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate("home")}
                    className="w-full bg-white/10 hover:bg-[#A65F46] text-white text-xs font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Website Publik</span>
                  </button>
                  <button
                    onClick={() => navigate("products")}
                    className="w-full bg-white/10 hover:bg-[#A65F46] text-white text-xs font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Katalog Produk</span>
                  </button>
                  <button
                    onClick={() => navigate("exhibitions")}
                    className="w-full bg-white/10 hover:bg-[#A65F46] text-white text-xs font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Halaman Pameran</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
