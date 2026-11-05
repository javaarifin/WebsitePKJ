import React, { useState, useRef } from "react"
import { NavigateFn } from "../App"
import { useAppStore, ExhibitionItem } from "../context/AppContext"
import AdminLayout from "./AdminLayout"
import {
  Sparkles,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Upload,
  Link as LinkIcon,
  X,
  Check,
  RotateCcw,
  AlertCircle,
} from "lucide-react"

interface AdminExhibitionsPageProps {
  navigate: NavigateFn
}

export default function AdminExhibitionsPage({
  navigate,
}: AdminExhibitionsPageProps) {
  const {
    exhibitions,
    addExhibition,
    updateExhibition,
    deleteExhibition,
    resetExhibitionsToDefault,
  } = useAppStore()

  const [search, setSearch] = useState("")

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ExhibitionItem | null>(null)
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">(
    "upload",
  )
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [formData, setFormData] = useState<{
    name: string
    location: string
    year: string
    description: string
    image: string
  }>({
    name: "",
    location: "",
    year: new Date().getFullYear().toString(),
    description: "",
    image:
      "https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=600&h=400&fit=crop&auto=format",
  })

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const filteredExhibitions = exhibitions.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.year.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    return matchSearch
  })

  const handleOpenCreateModal = () => {
    setEditingItem(null)
    setFormData({
      name: "",
      location: "",
      year: new Date().getFullYear().toString(),
      description: "",
      image:
        "https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=600&h=400&fit=crop&auto=format",
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (item: ExhibitionItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      location: item.location,
      year: item.year,
      description: item.description,
      image: item.image,
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
          setFormData((prev) => ({ ...prev, image: reader.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert("Nama pameran tidak boleh kosong")
      return
    }
    if (!formData.location.trim()) {
      alert("Lokasi / tempat pameran tidak boleh kosong")
      return
    }

    if (editingItem) {
      updateExhibition(editingItem.id, formData)
      showToast("Data pameran berhasil diperbarui!")
    } else {
      addExhibition(formData)
      showToast("Pameran baru berhasil ditambahkan!")
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    deleteExhibition(id)
    setDeleteConfirmId(null)
    showToast("Pameran telah dihapus.")
  }

  return (
    <AdminLayout
      currentPage="admin-exhibitions"
      navigate={navigate}
      title="Kelola Pameran (Exhibitions)"
      subtitle="Agenda & dokumentasi keikutsertaan pameran dagang kerajinan gerabah internasional"
      actions={
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-[#A65F46] hover:bg-[#8f5239] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pameran</span>
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
        {/* Search & Actions Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#D8C3A5]/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#302A26]/70">
              Total Terdaftar:
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#A65F46]/10 text-[#A65F46]">
              {exhibitions.length} Pameran
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#302A26]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama pameran atau lokasi..."
                className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/50 pl-9 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-[#A65F46]"
              />
            </div>
            <button
              onClick={() => {
                if (
                  confirm(
                    "Kembalikan semua daftar pameran ke data awal default?",
                  )
                ) {
                  resetExhibitionsToDefault()
                  showToast("Data pameran di-reset ke default.")
                }
              }}
              title="Reset ke data pameran awal"
              className="p-2 text-[#302A26]/50 hover:text-[#A65F46] hover:bg-[#F8F6F0] rounded-xl transition-colors border border-[#D8C3A5]/40"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Exhibitions Timeline List */}
        {filteredExhibitions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 p-12 text-center">
            <Sparkles className="w-12 h-12 text-[#302A26]/20 mx-auto mb-3" />
            <h4 className="font-display font-semibold text-base text-[#302A26]">
              Tidak ada pameran ditemukan
            </h4>
            <p className="text-xs text-[#302A26]/50 mt-1 max-w-sm mx-auto">
              Belum ada data pameran yang cocok dengan pencarian Anda.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="mt-4 inline-flex items-center gap-1.5 bg-[#A65F46] text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Pameran Sekarang</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExhibitions.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#D8C3A5]/40 shadow-xs p-5 flex flex-col md:flex-row items-start md:items-center gap-5 hover:border-[#A65F46]/50 transition-colors"
              >
                {/* Photo thumbnail */}
                <div className="w-full md:w-44 h-32 rounded-xl bg-[#D8C3A5]/30 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="bg-[#A65F46] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.year}
                    </span>
                    <span className="text-xs text-[#7A8065] font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#302A26] mb-1.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#302A26]/65 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[#D8C3A5]/30">
                  <button
                    onClick={() => navigate("exhibitions")}
                    className="flex-1 md:flex-none text-xs text-[#A65F46] font-semibold hover:bg-[#F8F6F0] px-3 py-1.5 rounded-lg flex items-center justify-center gap-1"
                    title="Lihat Halaman Publik"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 text-[#302A26]/60 hover:text-blue-600 hover:bg-[#F8F6F0] rounded-lg transition-colors"
                      title="Edit Pameran"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-2 text-[#302A26]/50 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus Pameran"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
              Hapus Pameran Ini?
            </h3>
            <p className="text-xs text-[#302A26]/60 mb-6">
              Data pameran ini akan dihilangkan dari halaman /exhibitions
              publik.
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

      {/* Add / Edit Exhibition Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#D8C3A5]/60">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8C3A5]/30 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#A65F46]/10 text-[#A65F46] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#302A26]">
                    {editingItem ? "Edit Data Pameran" : "Tambah Pameran Baru"}
                  </h3>
                  <p className="text-xs text-[#302A26]/50">
                    Lengkapi nama acara, lokasi kota/venue, dan dokumentasi foto
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
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Nama Pameran / Event <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: Trade Expo Indonesia 2024"
                  className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                />
              </div>

              {/* Year & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                    Tahun <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    placeholder="Contoh: 2024"
                    className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                    Lokasi / Venue <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Contoh: ICE BSD, Tangerang"
                    className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Deskripsi Kegiatan Pameran
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Ceritakan partisipasi, respon buyer internasional, dan produk yang dipamerkan..."
                  className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white leading-relaxed"
                />
              </div>

              {/* Image Upload / URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#302A26] uppercase tracking-wider">
                    Foto Booth / Suasana Pameran
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

                <div className="flex gap-4 items-start">
                  <div className="w-24 h-18 rounded-xl bg-[#D8C3A5]/40 overflow-hidden border border-[#D8C3A5]/50 flex-shrink-0">
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
                          <span>Pilih Foto Dokumentasi Pameran</span>
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
                        className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                      />
                    )}
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
                  {editingItem ? "Simpan Perubahan" : "Tambahkan Pameran"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
