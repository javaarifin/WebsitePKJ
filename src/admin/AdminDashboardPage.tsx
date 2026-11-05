import React from "react"
import { NavigateFn } from "../App"
import { useAppStore } from "../context/AppContext"
import AdminLayout from "./AdminLayout"
import {
  Package,
  CheckCircle2,
  FileEdit,
  MessageSquare,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Tag,
  Clock,
  Eye,
  Trash2,
  Newspaper,
  Image,
  Award,
  Sparkles,
  Calendar,
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
    deleteProduct,
    updateInquiryStatus,
  } = useAppStore()

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
  const recentInquiries = inquiries.slice(0, 5)

  return (
    <AdminLayout
      currentPage="admin-dashboard"
      navigate={navigate}
      title="Dashboard Overview"
      subtitle="Ringkasan data produk, artikel berita, galeri foto, prestasi, dan pesan pelanggan"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("admin-products")}
            className="flex items-center gap-1.5 bg-[#A65F46] hover:bg-[#8f5239] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Produk</span>
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
        {/* Metric Cards - 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

          {/* Card 4: Awards & Exhibitions */}
          <div
            onClick={() => navigate("admin-awards")}
            className="bg-white p-5 rounded-2xl border border-[#D8C3A5]/40 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#A65F46]/50 transition-colors"
          >
            <div>
              <p className="text-[11px] font-semibold text-[#302A26]/50 uppercase tracking-wider mb-1">
                Prestasi & Pameran
              </p>
              <h3 className="font-display text-2xl font-bold text-[#302A26]">
                {awards.length + exhibitions.length}
              </h3>
              <p className="text-[11px] text-[#302A26]/50 mt-1.5">
                {awards.length} Award • {exhibitions.length} Expo
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>

          {/* Card 5: Inquiries */}
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
                            <Tag className="w-3 h-3" />
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          {product.status === "published" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Tayang
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 pl-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() =>
                                navigate("product-detail", {
                                  productId: product.id,
                                })
                              }
                              className="p-1.5 text-[#302A26]/60 hover:text-[#A65F46] hover:bg-[#F8F6F0] rounded-lg"
                              title="Lihat Halaman Publik"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => navigate("admin-products")}
                              className="p-1.5 text-[#302A26]/60 hover:text-blue-600 hover:bg-[#F8F6F0] rounded-lg"
                              title="Edit di Menu Produk"
                            >
                              <FileEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  confirm(`Hapus produk "${product.name}"?`)
                                ) {
                                  deleteProduct(product.id)
                                }
                              }}
                              className="p-1.5 text-[#302A26]/40 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Hapus Produk"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent News Section */}
            <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 shadow-xs p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#302A26]">
                    Berita & Artikel Terkini
                  </h3>
                  <p className="text-xs text-[#302A26]/50">
                    Dokumentasi kegiatan dan cerita yang baru saja
                    dipublikasikan
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentNews.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#F8F6F0] border border-[#D8C3A5]/30 flex gap-3 items-start hover:border-[#A65F46]/50 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold text-[#A65F46]">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-[#302A26]/40 flex items-center gap-0.5">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      </div>
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
                    onClick={() => navigate("news")}
                    className="w-full bg-white/10 hover:bg-[#A65F46] text-white text-xs font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Uji Halaman Berita Publik</span>
                  </button>
                  <button
                    onClick={() => navigate("gallery")}
                    className="w-full bg-white/10 hover:bg-[#A65F46] text-white text-xs font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Uji Halaman Galeri Publik</span>
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
