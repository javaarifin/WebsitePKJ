import React, { useState, useRef } from "react"

import { NavigateFn } from "../App"

import { useAppStore, Product } from "../context/AppContext"
import { validateImageFile } from "../utils/security"

import AdminLayout from "./AdminLayout"

import { Package } from "lucide-react"

import {
  Plus,
  Search,
  FileEdit,
  Trash2,
  Eye,
  UploadCloud,
  Image as ImageIcon,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Link,
} from "lucide-react"

interface AdminProductsPageProps {
  navigate: NavigateFn
}

const CATEGORIES = [
  "Terracotta",

  "Clay Pottery",

  "Garden",

  "Home Decoration",

  "Custom",

  "Other",
]

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1604264726154-26480e76f4e1?w=600&h=600&fit=crop&auto=format",

  "https://images.unsplash.com/photo-1635175994617-1a9d85cdf680?w=600&h=600&fit=crop&auto=format",

  "https://images.unsplash.com/photo-1468531390554-9f62f9767a87?w=600&h=600&fit=crop&auto=format",

  "https://images.unsplash.com/photo-1510828561531-05a3388f6d3d?w=600&h=600&fit=crop&auto=format",

  "https://images.unsplash.com/photo-1699371830139-cb02e94878f1?w=600&h=600&fit=crop&auto=format",

  "https://images.unsplash.com/photo-1557128712-4ab4dc147a71?w=600&h=600&fit=crop&auto=format",
]

export default function AdminProductsPage({
  navigate,
}: AdminProductsPageProps) {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
  } = useAppStore()

  const [search, setSearch] = useState("")

  const [selectedCategory, setSelectedCategory] = useState("All")

  const [statusFilter, setStatusFilter] =
    useState<"all" | "published" | "draft">("all")

  // Modal states

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingProductId, setEditingProductId] = useState<number | null>(null)

  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Form state

  const [formData, setFormData] = useState<{
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

    price: string

    status: "published" | "draft"
  }>({
    name: "",

    category: "Terracotta",

    description: "",

    fullDescription: "",

    image: SAMPLE_IMAGES[0],

    material: "Natural Terracotta Clay",

    size: "D: 25cm, H: 30cm",

    weight: "2.5 kg",

    finish: "Natural / Unglazed",

    moq: "50 pcs",

    price: "Rp 75.000 / $5.00",

    status: "published",
  })

  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">(
    "upload",
  )

  const fileInputRef = useRef<HTMLInputElement>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)

    setTimeout(() => setToastMessage(null), 3500)
  }

  // Filtered products list

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory

    const matchStatus = statusFilter === "all" || p.status === statusFilter

    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      (p.material && p.material.toLowerCase().includes(search.toLowerCase()))

    return matchCategory && matchStatus && matchSearch
  })

  // Open modal for Create

  const handleOpenCreateModal = () => {
    setEditingProductId(null)

    setFormData({
      name: "",

      category: "Terracotta",

      description: "",

      fullDescription: "",

      image: SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)],

      material: "Natural Terracotta Clay",

      size: "D: 25cm, H: 30cm",

      weight: "2.5 kg",

      finish: "Natural / Unglazed",

      moq: "50 pcs",

      price: "Hubungi Kami / $5.00",

      status: "published",
    })

    setIsModalOpen(true)
  }

  // Open modal for Edit

  const handleOpenEditModal = (product: Product) => {
    setEditingProductId(product.id)

    setFormData({
      name: product.name,

      category: product.category,

      description: product.description,

      fullDescription: product.fullDescription,

      image: product.image,

      material: product.material,

      size: product.size,

      weight: product.weight,

      finish: product.finish,

      moq: product.moq,

      price: product.price || "Hubungi Kami",

      status: product.status,
    })

    setIsModalOpen(true)
  }

  // Handle local image file upload (converts to Base64 data URL)

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

  // Form submit handler (Create or Update)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert("Nama produk tidak boleh kosong.")

      return
    }

    if (!formData.image) {
      formData.image = SAMPLE_IMAGES[0]
    }

    if (editingProductId !== null) {
      // UPDATE

      updateProduct(editingProductId, formData)

      showToast(`Produk "${formData.name}" berhasil diperbarui!`)
    } else {
      // CREATE

      addProduct(formData)

      showToast(`Produk "${formData.name}" berhasil ditambahkan ke katalog!`)
    }

    setIsModalOpen(false)
  }

  // Delete product

  const handleDeleteProduct = (id: number) => {
    const item = products.find((p) => p.id === id)

    deleteProduct(id)

    setDeleteConfirmId(null)

    showToast(`Produk "${item?.name || "Produk"}" berhasil dihapus.`)
  }

  // Toggle status

  const handleToggleStatus = (product: Product) => {
    const nextStatus = product.status === "published" ? "draft" : "published"

    updateProduct(product.id, { status: nextStatus })

    showToast(
      `Status produk diubah menjadi: ${
        nextStatus === "published" ? "Tayang (Live)" : "Draft"
      }`,
    )
  }

  return (
    <AdminLayout
      currentPage="admin-products"
      navigate={navigate}
      title="Manajemen Produk"
      subtitle="Tambah, edit, hapus, dan atur katalog produk keramik & terracotta"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (
                confirm(
                  "Kembalikan produk ke data default katalog? Data kustom akan digantikan dengan 8 produk awal.",
                )
              ) {
                resetProductsToDefault()

                showToast("Katalog produk di-reset ke data default!")
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#302A26]/70 hover:text-[#302A26] bg-white border border-[#D8C3A5]/50 rounded-xl hover:bg-[#D8C3A5]/20 transition-colors"
            title="Reset ke produk awal"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#302A26]/60" />
            <span>Reset Default</span>
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 bg-[#A65F46] hover:bg-[#8f5239] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Produk Baru</span>
          </button>
        </div>
      }
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#302A26] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 lg:p-5 rounded-2xl border border-[#D8C3A5]/40 shadow-xs mb-6 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#302A26]/40" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama produk, bahan, atau deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl text-xs sm:text-sm text-[#302A26] placeholder-[#302A26]/40 focus:outline-none focus:border-[#A65F46] focus:bg-white transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#302A26]/40 hover:text-[#302A26]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter buttons */}
          <div className="flex items-center gap-1.5 bg-[#F8F6F0] p-1 rounded-xl border border-[#D8C3A5]/40 self-start md:self-auto">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "all"
                  ? "bg-white text-[#302A26] shadow-xs font-semibold"
                  : "text-[#302A26]/60 hover:text-[#302A26]"
              }`}
            >
              Semua ({products.length})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "published"
                  ? "bg-emerald-600 text-white shadow-xs font-semibold"
                  : "text-[#302A26]/60 hover:text-[#302A26]"
              }`}
            >
              Tayang ({products.filter((p) => p.status === "published").length})
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "draft"
                  ? "bg-amber-600 text-white shadow-xs font-semibold"
                  : "text-[#302A26]/60 hover:text-[#302A26]"
              }`}
            >
              Draft ({products.filter((p) => p.status === "draft").length})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#302A26]/50 font-medium whitespace-nowrap">
            Kategori:
          </span>
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#A65F46] text-white font-medium shadow-xs"
                  : "bg-[#F8F6F0] text-[#302A26]/70 hover:bg-[#D8C3A5]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#D8C3A5]/40 shadow-xs overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-[#F8F6F0] rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#302A26]/30">
              <Package className="w-7 h-7" />
            </div>
            <h3 className="font-display font-semibold text-lg text-[#302A26] mb-1">
              Tidak ada produk yang sesuai
            </h3>
            <p className="text-xs text-[#302A26]/50 max-w-sm mx-auto mb-5">
              Coba sesuaikan kata kunci pencarian atau ubah filter kategori
              Anda.
            </p>
            <button
              onClick={() => {
                setSearch("")

                setSelectedCategory("All")

                setStatusFilter("all")
              }}
              className="text-xs font-semibold text-[#A65F46] hover:underline"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#F8F6F0] border-b border-[#D8C3A5]/30 text-[11px] font-semibold text-[#302A26]/60 uppercase tracking-wider">
                  <th className="py-3.5 pl-6 pr-3">Produk</th>
                  <th className="py-3.5 px-3">Kategori</th>
                  <th className="py-3.5 px-3">Spesifikasi</th>
                  <th className="py-3.5 px-3">Harga / MOQ</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8C3A5]/20">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-[#F8F6F0]/40 transition-colors"
                  >
                    {/* Column 1: Image & Name */}
                    <td className="py-4 pl-6 pr-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#D8C3A5]/40 flex-shrink-0 border border-[#D8C3A5]/30">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-[#302A26] line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#302A26]/50 line-clamp-1 mt-0.5">
                            {product.description}
                          </p>
                          <span className="text-[10px] text-[#A65F46] font-mono">
                            ID: #{product.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Category */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[#F8F6F0] text-[#7A8065] border border-[#D8C3A5]/40">
                        {product.category}
                      </span>
                    </td>

                    {/* Column 3: Material & Size */}
                    <td className="py-4 px-3 text-xs text-[#302A26]/70">
                      <p className="font-medium text-[#302A26] line-clamp-1">
                        {product.material || "Terracotta"}
                      </p>
                      <p className="text-[#302A26]/50 line-clamp-1">
                        {product.size}
                      </p>
                    </td>

                    {/* Column 4: Price / MOQ */}
                    <td className="py-4 px-3 text-xs text-[#302A26]">
                      <p className="font-semibold text-[#A65F46]">
                        {product.price || "-"}
                      </p>
                      <p className="text-[11px] text-[#302A26]/50">
                        MOQ: {product.moq || "N/A"}
                      </p>
                    </td>

                    {/* Column 5: Status */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(product)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          product.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                        }`}
                        title="Klik untuk mengubah status tayang"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.status === "published"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                        <span>
                          {product.status === "published"
                            ? "Tayang (Live)"
                            : "Draft"}
                        </span>
                      </button>
                    </td>

                    {/* Column 6: Actions */}
                    <td className="py-4 pr-6 pl-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() =>
                            navigate("product-detail", {
                              productId: product.id,
                            })
                          }
                          className="p-2 text-[#302A26]/60 hover:text-[#A65F46] hover:bg-[#F8F6F0] rounded-xl transition-colors"
                          title="Lihat di Halaman Detail Publik"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 text-[#302A26]/60 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          title="Edit Produk"
                        >
                          <FileEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-2 text-[#302A26]/40 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
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
        )}
      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D8C3A5]/40 my-8">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-5 border-b border-[#D8C3A5]/30 flex items-center justify-between z-10">
              <div>
                <h2 className="font-display font-bold text-xl text-[#302A26]">
                  {editingProductId !== null
                    ? "Edit Produk Keramik"
                    : "Tambah Produk Keramik Baru"}
                </h2>
                <p className="text-xs text-[#302A26]/50 mt-0.5">
                  Lengkapi informasi produk untuk ditampilkan di katalog website
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#302A26]/40 hover:text-[#302A26] rounded-xl hover:bg-[#F8F6F0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
              {/* Product Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#302A26] uppercase tracking-wider mb-1.5">
                    Nama Produk *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Terracotta Amphora Vase"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 bg-[#F8F6F0] border border-[#D8C3A5] rounded-xl text-sm text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#302A26] uppercase tracking-wider mb-1.5">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-[#F8F6F0] border border-[#D8C3A5] rounded-xl text-sm text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white transition-colors"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#302A26] uppercase tracking-wider mb-1.5">
                    Harga / Estimasi MOQ
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rp 85.000 atau Inquire MOQ"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-[#F8F6F0] border border-[#D8C3A5] rounded-xl text-sm text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Image Upload / Input */}
              <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#D8C3A5]/60 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#302A26] uppercase tracking-wider">
                    Foto Produk *
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setImageInputMode("upload")}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        imageInputMode === "upload"
                          ? "bg-[#A65F46] text-white"
                          : "bg-white text-[#302A26]/60 hover:text-[#302A26]"
                      }`}
                    >
                      <UploadCloud className="w-3 h-3 inline mr-1" />
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode("url")}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        imageInputMode === "url"
                          ? "bg-[#A65F46] text-white"
                          : "bg-white text-[#302A26]/60 hover:text-[#302A26]"
                      }`}
                    >
                      <Link className="w-3 h-3 inline mr-1" />
                      URL Gambar
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Live Preview */}
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white border border-[#D8C3A5] flex-shrink-0 shadow-xs">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#302A26]/30">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
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
                          className="w-full py-3 px-4 bg-white border-2 border-dashed border-[#D8C3A5] hover:border-[#A65F46] rounded-xl text-xs font-medium text-[#302A26]/80 hover:text-[#A65F46] transition-all flex items-center justify-center gap-2"
                        >
                          <UploadCloud className="w-4 h-4 text-[#A65F46]" />
                          <span>Pilih Foto dari Komputer (PNG, JPG, WebP)</span>
                        </button>
                        <p className="text-[10px] text-[#302A26]/40 mt-1">
                          Foto otomatis di-encode dan disimpan di browser state.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={formData.image}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              image: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 bg-white border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                        />
                      </div>
                    )}

                    {/* Quick sample image picker */}
                    <div className="pt-2">
                      <p className="text-[11px] text-[#302A26]/60 flex items-center gap-1 mb-1.5">
                        <Sparkles className="w-3 h-3 text-[#A65F46]" />
                        <span>Atau gunakan foto contoh:</span>
                      </p>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {SAMPLE_IMAGES.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, image: img }))
                            }
                            className={`w-8 h-8 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-transform ${
                              formData.image === img
                                ? "border-[#A65F46] scale-105"
                                : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={img}
                              alt="sample"
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-semibold text-[#302A26] uppercase tracking-wider mb-1.5">
                  Deskripsi Singkat (Katalog Card) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan fitur produk yang tampil di kartu katalog..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-[#F8F6F0] border border-[#D8C3A5] rounded-xl text-sm text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#302A26] uppercase tracking-wider mb-1.5">
                  Deskripsi Lengkap (Halaman Detail Produk)
                </label>
                <textarea
                  rows={4}
                  placeholder="Cerita proses pembuatan kerajinan tangan, asal bahan, dan keunggulan produk..."
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullDescription: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-[#F8F6F0] border border-[#D8C3A5] rounded-xl text-sm text-[#302A26] focus:outline-none focus:border-[#A65F46] focus:bg-white transition-colors resize-none"
                />
              </div>

              {/* Specifications */}
              <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#D8C3A5]/60 space-y-4">
                <p className="text-xs font-semibold text-[#302A26] uppercase tracking-wider">
                  Spesifikasi Teknis
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#302A26]/70 mb-1 font-medium">
                      Bahan (Material)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Natural Terracotta Clay"
                      value={formData.material}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          material: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#302A26]/70 mb-1 font-medium">
                      Ukuran (Size / Dimensi)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Diameter 25cm, Tinggi 30cm"
                      value={formData.size}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          size: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#302A26]/70 mb-1 font-medium">
                      Berat (Weight)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 2.5 kg"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          weight: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#302A26]/70 mb-1 font-medium">
                      Finishing / Permukaan
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Natural / Unglazed / Terakota Kasar"
                      value={formData.finish}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          finish: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#302A26]/70 mb-1 font-medium">
                      Minimum Order Quantity (MOQ)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 50 pcs atau Contact us for details"
                      value={formData.moq}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          moq: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#D8C3A5] rounded-xl text-xs text-[#302A26] focus:outline-none focus:border-[#A65F46]"
                    />
                  </div>
                </div>
              </div>

              {/* Status toggle */}
              <div className="flex items-center justify-between p-4 bg-[#F8F6F0] rounded-2xl border border-[#D8C3A5]/60">
                <div>
                  <p className="text-xs font-semibold text-[#302A26]">
                    Status Publikasi
                  </p>
                  <p className="text-[11px] text-[#302A26]/50">
                    {formData.status === "published"
                      ? "Produk langsung tampil di halaman depan dan katalog"
                      : "Produk disimpan sebagai draft dan disembunyikan dari pengunjung"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,

                      status:
                        prev.status === "published" ? "draft" : "published",
                    }))
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    formData.status === "published"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-amber-500 text-white shadow-xs"
                  }`}
                >
                  {formData.status === "published"
                    ? "Tayang (Published)"
                    : "Draft"}
                </button>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8C3A5]/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D8C3A5] text-xs font-semibold text-[#302A26]/70 hover:bg-[#F8F6F0] transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#A65F46] hover:bg-[#8f5239] text-white text-xs font-semibold shadow-md shadow-[#A65F46]/20 transition-all hover:shadow-lg"
                >
                  {editingProductId !== null
                    ? "Simpan Perubahan"
                    : "Tambah Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-red-100 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#302A26] mb-2">
              Hapus Produk Ini?
            </h3>
            <p className="text-xs text-[#302A26]/60 leading-relaxed mb-6">
              Produk akan dihapus dari katalog publik dan database lokal.
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#D8C3A5] text-xs font-semibold text-[#302A26]/70 hover:bg-[#F8F6F0] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
