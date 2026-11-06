import React, { useState, useRef } from "react"
import { NavigateFn } from "../App"
import { useAppStore, NewsItem } from "../context/AppContext"
import { validateImageFile } from "../utils/security"
import AdminLayout from "./AdminLayout"
import {
  Newspaper,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Tag,
  Upload,
  Link as LinkIcon,
  X,
  Check,
  RotateCcw,
  AlertCircle,
  FileText,
} from "lucide-react"

const NEWS_CATEGORIES = [
  "Company",
  "Exhibition",
  "Training",
  "Product",
  "Export",
]

interface AdminNewsPageProps {
  navigate: NavigateFn
}

export default function AdminNewsPage({ navigate }: AdminNewsPageProps) {
  const { news, addNews, updateNews, deleteNews, resetNewsToDefault } =
    useAppStore()

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null)
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">(
    "upload",
  )
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [formData, setFormData] = useState<{
    title: string
    category: string
    date: string
    excerpt: string
    body: string
    image: string
  }>({
    title: "",
    category: "Company",
    date: new Date().toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    }),
    excerpt: "",
    body: "",
    image:
      "https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=600&h=400&fit=crop&auto=format",
  })

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const filteredNews = news.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      item.body.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const handleOpenCreateModal = () => {
    setEditingItem(null)
    setFormData({
      title: "",
      category: "Company",
      date: new Date().toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      }),
      excerpt: "",
      body: "",
      image:
        "https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=600&h=400&fit=crop&auto=format",
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (item: NewsItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      category: item.category,
      date: item.date,
      excerpt: item.excerpt,
      body: item.body,
      image: item.image,
    })
    setIsModalOpen(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validation = validateImageFile(file)
      if (!validation.valid) {
        alert(validation.error)
        e.target.value = ""
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFormData((prev) => ({ ...prev, image: reader.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert("Judul berita tidak boleh kosong")
      return
    }
    if (!formData.body.trim()) {
      alert("Isi berita tidak boleh kosong")
      return
    }

    if (editingItem) {
      updateNews(editingItem.id, formData)
      showToast("Berita berhasil diperbarui!")
    } else {
      addNews(formData)
      showToast("Berita baru berhasil diterbitkan!")
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    deleteNews(id)
    setDeleteConfirmId(null)
    showToast("Berita telah dihapus.")
  }

  return (
    <AdminLayout
      currentPage="admin-news"
      navigate={navigate}
      title="Kelola Berita & Artikel"
      subtitle="Publikasikan kegiatan, pameran, pelatihan, dan cerita seputar keramik gerabah"
      actions={
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-[#A65F46] hover:bg-[#8f5239] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Berita Baru</span>
        </button>
      }
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#302A26] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-medium border border-[#D8C3A5]/40 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#D8C3A5]/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === "All"
                  ? "bg-[#A65F46] text-white"
                  : "bg-[#F8F6F0] text-[#302A26]/70 hover:bg-[#D8C3A5]/30"
              }`}
            >
              Semua ({news.length})
            </button>
            {NEWS_CATEGORIES.map((cat) => {
              const count = news.filter((n) => n.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-[#A65F46] text-white"
                      : "bg-[#F8F6F0] text-[#302A26]/70 hover:bg-[#D8C3A5]/30"
                  }`}
                >
                  {cat} {count > 0 && `(${count})`}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#302A26]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari berita..."
                className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/50 pl-9 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-[#A65F46]"
              />
            </div>
            <button
              onClick={() => {
                if (
                  confirm(
                    "Kembalikan semua artikel berita ke sampel default awal?",
                  )
                ) {
                  resetNewsToDefault()
                  showToast("Data berita di-reset ke default.")
                }
              }}
              title="Reset ke berita bawaan"
              className="p-2 text-[#302A26]/50 hover:text-[#A65F46] hover:bg-[#F8F6F0] rounded-xl transition-colors border border-[#D8C3A5]/40"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* News List */}
        {filteredNews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 p-12 text-center">
            <Newspaper className="w-12 h-12 text-[#302A26]/20 mx-auto mb-3" />
            <h4 className="font-display font-semibold text-base text-[#302A26]">
              Tidak ada berita ditemukan
            </h4>
            <p className="text-xs text-[#302A26]/50 mt-1 max-w-sm mx-auto">
              Tidak ada artikel yang cocok dengan filter atau kata kunci
              pencarian Anda.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="mt-4 inline-flex items-center gap-1.5 bg-[#A65F46] text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Berita Baru</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#D8C3A5]/40 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
              >
                {/* Image */}
                <div className="relative aspect-video bg-[#D8C3A5]/30 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#302A26]/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#302A26] text-[11px] font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#A65F46]" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#302A26] line-clamp-2 mb-2 group-hover:text-[#A65F46] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#302A26]/65 line-clamp-3 leading-relaxed mb-4">
                      {item.excerpt || item.body.slice(0, 140) + "..."}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-3 border-t border-[#D8C3A5]/30 flex items-center justify-between text-xs">
                    <button
                      onClick={() =>
                        navigate("news-detail", { newsId: item.id })
                      }
                      className="text-[#A65F46] hover:underline flex items-center gap-1 font-semibold"
                      title="Lihat Tampilan Publik"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Artikel</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 text-[#302A26]/60 hover:text-blue-600 hover:bg-[#F8F6F0] rounded-lg transition-colors"
                        title="Edit Berita"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 text-[#302A26]/50 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Berita"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#D8C3A5]/60 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#302A26] mb-1">
              Hapus Berita Ini?
            </h3>
            <p className="text-xs text-[#302A26]/60 mb-6">
              Artikel yang dihapus tidak akan tampil lagi di halaman publik
              /news.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2 rounded-xl text-xs font-semibold bg-[#F8F6F0] text-[#302A26] hover:bg-[#D8C3A5]/30 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-[#D8C3A5]/60 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8C3A5]/30 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#A65F46]/10 text-[#A65F46] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#302A26]">
                    {editingItem
                      ? "Edit Berita & Artikel"
                      : "Tulis Berita Baru"}
                  </h3>
                  <p className="text-xs text-[#302A26]/50">
                    Lengkapi informasi artikel untuk dipublikasikan
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#302A26]/40 hover:text-[#302A26] hover:bg-[#F8F6F0] rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Judul Berita / Kegiatan{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Contoh: Partisipasi PARJONO di Pameran Kriya Internasional 2024"
                  className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                />
              </div>

              {/* Category & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-3 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                  >
                    {NEWS_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                    Tanggal / Periode
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="Contoh: Maret 2024 / 15 Mei 2024"
                    className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                  />
                </div>
              </div>

              {/* Excerpt / Summary */}
              <div>
                <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Ringkasan Singkat (Excerpt)
                </label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="Ringkasan 1-2 kalimat untuk preview card..."
                  className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Isi Lengkap Berita / Artikel{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  placeholder="Tulis detail liputan, jalannya kegiatan, hasil, dsb. Gunakan enter dua kali untuk memisahkan paragraf."
                  className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white leading-relaxed"
                />
              </div>

              {/* Image Upload / URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#302A26] uppercase tracking-wider">
                    Foto Sampul Berita
                  </label>
                  <div className="flex items-center gap-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setImageInputMode("upload")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        imageInputMode === "upload"
                          ? "bg-[#A65F46] text-white font-medium"
                          : "text-[#302A26]/60 hover:bg-[#F8F6F0]"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode("url")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        imageInputMode === "url"
                          ? "bg-[#A65F46] text-white font-medium"
                          : "text-[#302A26]/60 hover:bg-[#F8F6F0]"
                      }`}
                    >
                      URL Gambar
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  {/* Preview */}
                  <div className="w-28 h-20 rounded-xl bg-[#D8C3A5]/40 overflow-hidden border border-[#D8C3A5]/50 flex-shrink-0">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=600&h=400&fit=crop&auto=format"
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    {imageInputMode === "upload" ? (
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full border-2 border-dashed border-[#D8C3A5] hover:border-[#A65F46] rounded-xl py-3 px-4 text-center transition-colors bg-[#F8F6F0] flex items-center justify-center gap-2 text-xs text-[#302A26]/70 font-medium"
                        >
                          <Upload className="w-4 h-4 text-[#A65F46]" />
                          <span>
                            Klik untuk pilih gambar dari komputer (PNG/JPG)
                          </span>
                        </button>
                      </div>
                    ) : (
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="https://..."
                        className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                      />
                    )}
                    <p className="text-[10px] text-[#302A26]/50 mt-1">
                      Foto akan tampil di kartu berita dan halaman detail
                      artikel
                    </p>
                  </div>
                </div>
              </div>

              {/* Form buttons */}
              <div className="pt-4 border-t border-[#D8C3A5]/30 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#F8F6F0] text-[#302A26] hover:bg-[#D8C3A5]/30 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#A65F46] hover:bg-[#8f5239] text-white shadow-sm transition-all"
                >
                  {editingItem ? "Simpan Perubahan" : "Terbitkan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
