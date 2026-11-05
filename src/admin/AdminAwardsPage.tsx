import React, { useState, useRef } from "react"
import { NavigateFn } from "../App"
import { useAppStore, AwardItem } from "../context/AppContext"
import AdminLayout from "./AdminLayout"
import {
  Award,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Building,
  Upload,
  Link as LinkIcon,
  X,
  Check,
  RotateCcw,
  AlertCircle,
  Trophy,
} from "lucide-react"

interface AdminAwardsPageProps {
  navigate: NavigateFn
}

export default function AdminAwardsPage({ navigate }: AdminAwardsPageProps) {
  const { awards, addAward, updateAward, deleteAward, resetAwardsToDefault } =
    useAppStore()

  const [search, setSearch] = useState("")

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<AwardItem | null>(null)
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">(
    "upload",
  )
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [formData, setFormData] = useState<{
    title: string
    year: string
    organization: string
    description: string
    image: string
  }>({
    title: "",
    year: new Date().getFullYear().toString(),
    organization: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1557128712-4ab4dc147a71?w=400&h=300&fit=crop&auto=format",
  })

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const filteredAwards = awards.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.organization.toLowerCase().includes(search.toLowerCase()) ||
      item.year.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    return matchSearch
  })

  const handleOpenCreateModal = () => {
    setEditingItem(null)
    setFormData({
      title: "",
      year: new Date().getFullYear().toString(),
      organization: "",
      description: "",
      image:
        "https://images.unsplash.com/photo-1557128712-4ab4dc147a71?w=400&h=300&fit=crop&auto=format",
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (item: AwardItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      year: item.year,
      organization: item.organization,
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
    if (!formData.title.trim()) {
      alert("Nama penghargaan tidak boleh kosong")
      return
    }
    if (!formData.organization.trim()) {
      alert("Nama lembaga / penyelenggara tidak boleh kosong")
      return
    }

    if (editingItem) {
      updateAward(editingItem.id, formData)
      showToast("Penghargaan berhasil diperbarui!")
    } else {
      addAward(formData)
      showToast("Penghargaan baru berhasil ditambahkan!")
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    deleteAward(id)
    setDeleteConfirmId(null)
    showToast("Penghargaan telah dihapus.")
  }

  return (
    <AdminLayout
      currentPage="admin-awards"
      navigate={navigate}
      title="Kelola Penghargaan (Awards)"
      subtitle="Dokumentasi apresiasi, sertifikasi, dan prestasi PARJONO KERAMIK JAYA"
      actions={
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-[#A65F46] hover:bg-[#8f5239] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Penghargaan</span>
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
              {awards.length} Penghargaan
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#302A26]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama penghargaan / lembaga..."
                className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/50 pl-9 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-[#A65F46]"
              />
            </div>
            <button
              onClick={() => {
                if (
                  confirm(
                    "Kembalikan semua daftar penghargaan ke data bawaan awal?",
                  )
                ) {
                  resetAwardsToDefault()
                  showToast("Data penghargaan di-reset ke default.")
                }
              }}
              title="Reset ke data awal"
              className="p-2 text-[#302A26]/50 hover:text-[#A65F46] hover:bg-[#F8F6F0] rounded-xl transition-colors border border-[#D8C3A5]/40"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Awards Grid */}
        {filteredAwards.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 p-12 text-center">
            <Trophy className="w-12 h-12 text-[#302A26]/20 mx-auto mb-3" />
            <h4 className="font-display font-semibold text-base text-[#302A26]">
              Tidak ada penghargaan ditemukan
            </h4>
            <p className="text-xs text-[#302A26]/50 mt-1 max-w-sm mx-auto">
              Belum ada data penghargaan yang cocok dengan pencarian Anda.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="mt-4 inline-flex items-center gap-1.5 bg-[#A65F46] text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Penghargaan Sekarang</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAwards.map((item) => (
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
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#A65F46] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#302A26] mb-1 group-hover:text-[#A65F46] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#7A8065] flex items-center gap-1.5 mb-3">
                      <Building className="w-3.5 h-3.5" />
                      <span>{item.organization}</span>
                    </p>
                    <p className="text-xs text-[#302A26]/65 leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-3 border-t border-[#D8C3A5]/30 flex items-center justify-between text-xs">
                    <button
                      onClick={() => navigate("awards")}
                      className="text-[#A65F46] hover:underline flex items-center gap-1 font-semibold"
                      title="Lihat Halaman Publik"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Publik</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 text-[#302A26]/60 hover:text-blue-600 hover:bg-[#F8F6F0] rounded-lg transition-colors"
                        title="Edit Penghargaan"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 text-[#302A26]/50 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Penghargaan"
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
              Hapus Penghargaan Ini?
            </h3>
            <p className="text-xs text-[#302A26]/60 mb-6">
              Data penghargaan ini akan dihapus dari halaman /awards website
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

      {/* Add / Edit Award Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#D8C3A5]/60">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8C3A5]/30 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#A65F46]/10 text-[#A65F46] flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#302A26]">
                    {editingItem
                      ? "Edit Penghargaan"
                      : "Tambah Penghargaan Baru"}
                  </h3>
                  <p className="text-xs text-[#302A26]/50">
                    Lengkapi nama penghargaan, lembaga penyelenggara, dan foto
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
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Nama Penghargaan / Apresiasi{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Contoh: Kriya Ekspor Unggulan Yogyakarta"
                  className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                />
              </div>

              {/* Year & Organization */}
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
                    placeholder="Contoh: 2023"
                    className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                    Lembaga / Organisasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                    placeholder="Contoh: Kementerian Perdagangan RI"
                    className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Deskripsi / Keterangan Penghargaan
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Keterangan singkat mengenai pencapaian dan kriteria penghargaan..."
                  className="w-full bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl px-4 py-2.5 text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white leading-relaxed"
                />
              </div>

              {/* Image Upload / URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#302A26] uppercase tracking-wider">
                    Foto Piagam / Trofi / Dokumentasi
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
                          "https://images.unsplash.com/photo-1557128712-4ab4dc147a71?w=400&h=300&fit=crop&auto=format"
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
                          <span>Pilih Foto Piagam/Trofi</span>
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
                  {editingItem ? "Simpan Perubahan" : "Tambahkan Penghargaan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
