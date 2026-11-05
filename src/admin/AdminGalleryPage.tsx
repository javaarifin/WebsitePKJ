import React, { useState, useRef } from "react"
import { NavigateFn } from "../App"
import { useAppStore, GalleryItem } from "../context/AppContext"
import AdminLayout from "./AdminLayout"
import {
  Image,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Upload,
  Link as LinkIcon,
  X,
  Check,
  RotateCcw,
  AlertCircle,
  Tag,
} from "lucide-react"

const GALLERY_CATEGORIES = [
  "Products",
  "Workshop",
  "Craftsmanship",
  "Exhibition",
  "Export",
  "Activities",
]

interface AdminGalleryPageProps {
  navigate: NavigateFn
}

export default function AdminGalleryPage({ navigate }: AdminGalleryPageProps) {
  const {
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetGalleryToDefault,
  } = useAppStore()

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">(
    "upload",
  )
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)
  const [previewLightbox, setPreviewLightbox] = useState<GalleryItem | null>(
    null,
  )

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [formData, setFormData] = useState<{
    category: string
    src: string
    alt: string
    caption: string
  }>({
    category: "Products",
    src: "https://images.unsplash.com/photo-1604264726154-26480e76f4e1?w=800&h=800&fit=crop&auto=format",
    alt: "",
    caption: "",
  })

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const filteredGallery = gallery.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory
    const matchSearch =
      item.caption.toLowerCase().includes(search.toLowerCase()) ||
      item.alt.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const handleOpenCreateModal = () => {
    setEditingItem(null)
    setFormData({
      category: "Products",
      src: "https://images.unsplash.com/photo-1604264726154-26480e76f4e1?w=800&h=800&fit=crop&auto=format",
      alt: "",
      caption: "",
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      category: item.category,
      src: item.src,
      alt: item.alt,
      caption: item.caption,
    })
    setIsModalOpen(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB")
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFormData((prev) => ({
            ...prev,
            src: reader.result as string,
            alt: prev.alt || file.name.replace(/\.[^/.]+$/, ""),
            caption: prev.caption || file.name.replace(/\.[^/.]+$/, ""),
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.src.trim()) {
      alert("Pilih gambar atau masukkan URL foto terlebih dahulu.")
      return
    }
    if (!formData.caption.trim()) {
      alert("Keterangan / Caption foto tidak boleh kosong")
      return
    }

    const payload = {
      ...formData,
      alt: formData.alt.trim() || formData.caption.trim(),
    }

    if (editingItem) {
      updateGalleryItem(editingItem.id, payload)
      showToast("Foto galeri berhasil diperbarui!")
    } else {
      addGalleryItem(payload)
      showToast("Foto baru berhasil ditambahkan ke galeri!")
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    deleteGalleryItem(id)
    setDeleteConfirmId(null)
    showToast("Foto telah dihapus dari galeri.")
  }

  return (
    <AdminLayout
      currentPage="admin-gallery"
      navigate={navigate}
      title="Kelola Galeri Foto"
      subtitle="Arsip visual workshop, proses pembuatan kerajinan, dan dokumentasi ekspor"
      actions={
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-[#A65F46] hover:bg-[#8f5239] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Foto Baru</span>
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
              Semua ({gallery.length})
            </button>
            {GALLERY_CATEGORIES.map((cat) => {
              const count = gallery.filter((g) => g.category === cat).length
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
                placeholder="Cari foto galeri..."
                className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/50 pl-9 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-[#A65F46]"
              />
            </div>
            <button
              onClick={() => {
                if (
                  confirm("Kembalikan semua foto galeri ke foto bawaan awal?")
                ) {
                  resetGalleryToDefault()
                  showToast("Data galeri di-reset ke default.")
                }
              }}
              title="Reset ke galeri bawaan"
              className="p-2 text-[#302A26]/50 hover:text-[#A65F46] hover:bg-[#F8F6F0] rounded-xl transition-colors border border-[#D8C3A5]/40"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 p-12 text-center">
            <Image className="w-12 h-12 text-[#302A26]/20 mx-auto mb-3" />
            <h4 className="font-display font-semibold text-base text-[#302A26]">
              Tidak ada foto ditemukan
            </h4>
            <p className="text-xs text-[#302A26]/50 mt-1 max-w-sm mx-auto">
              Tidak ada dokumentasi visual yang cocok dengan filter atau kata
              kunci.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="mt-4 inline-flex items-center gap-1.5 bg-[#A65F46] text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Foto Sekarang</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#D8C3A5]/40 shadow-xs overflow-hidden flex flex-col group relative"
              >
                {/* Photo box */}
                <div className="relative aspect-square bg-[#D8C3A5]/30 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt || item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => setPreviewLightbox(item)}
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#302A26]/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover action overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
                    <button
                      onClick={() => setPreviewLightbox(item)}
                      className="p-2 bg-white/90 text-[#302A26] hover:bg-white rounded-xl shadow transition-colors"
                      title="Perbesar Foto"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 bg-white/90 text-blue-600 hover:bg-white rounded-xl shadow transition-colors"
                      title="Edit Caption"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-2 bg-white/90 text-red-600 hover:bg-white rounded-xl shadow transition-colors"
                      title="Hapus Foto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Caption footer */}
                <div className="p-3 bg-white">
                  <p className="font-semibold text-xs text-[#302A26] line-clamp-1">
                    {item.caption}
                  </p>
                  <p className="text-[11px] text-[#302A26]/50 line-clamp-1 mt-0.5">
                    {item.alt || item.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {previewLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewLightbox(null)}
        >
          <div
            className="max-w-3xl w-full bg-[#302A26] rounded-2xl overflow-hidden p-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#D8C3A5] tracking-widest">
                  {previewLightbox.category}
                </span>
                <h4 className="font-display font-bold text-sm text-white">
                  {previewLightbox.caption}
                </h4>
              </div>
              <button
                onClick={() => setPreviewLightbox(null)}
                className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-black/40">
              <img
                src={previewLightbox.src}
                alt={previewLightbox.alt}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            {previewLightbox.alt && (
              <p className="text-xs text-white/60 mt-3 text-center">
                {previewLightbox.alt}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#D8C3A5]/60 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#302A26] mb-1">
              Hapus Foto Galeri?
            </h3>
            <p className="text-xs text-[#302A26]/60 mb-6">
              Foto ini akan dihilangkan dari halaman galeri publik /gallery.
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

      {/* Add / Edit Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#D8C3A5]/60">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8C3A5]/30 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#A65F46]/10 text-[#A65F46] flex items-center justify-center">
                  <Image className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#302A26]">
                    {editingItem ? "Edit Foto Galeri" : "Upload Foto Baru"}
                  </h3>
                  <p className="text-xs text-[#302A26]/50">
                    Tambahkan dokumentasi foto workshop atau produk
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

            <form onSubmit={handleSave} className="space-y-4">
              {/* Photo Upload / URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#302A26] uppercase tracking-wider">
                    Foto <span className="text-red-500">*</span>
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
                      URL Foto
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-2xl bg-[#D8C3A5]/40 overflow-hidden border border-[#D8C3A5]/50 flex items-center justify-center">
                    <img
                      src={formData.src}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1604264726154-26480e76f4e1?w=800&h=800&fit=crop&auto=format"
                      }}
                    />
                  </div>

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
                        <span>Pilih Foto dari Galeri Perangkat Anda</span>
                      </button>
                    </div>
                  ) : (
                    <input
                      type="url"
                      value={formData.src}
                      onChange={(e) =>
                        setFormData({ ...formData, src: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                    />
                  )}
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Keterangan Foto / Caption{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.caption}
                  onChange={(e) =>
                    setFormData({ ...formData, caption: e.target.value })
                  }
                  placeholder="Contoh: Proses Pembentukan Guci Terracotta Tradisional"
                  className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                />
              </div>

              {/* Category */}
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
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Teks Alternatif (SEO & Aksesibilitas)
                </label>
                <input
                  type="text"
                  value={formData.alt}
                  onChange={(e) =>
                    setFormData({ ...formData, alt: e.target.value })
                  }
                  placeholder="Deskripsi singkat gambar untuk mesin pencari..."
                  className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                />
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
                  {editingItem ? "Simpan Perubahan" : "Upload ke Galeri"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
