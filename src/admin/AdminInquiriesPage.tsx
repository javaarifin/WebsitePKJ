import { useState } from "react"

import { NavigateFn } from "../App"

import { useAppStore, Inquiry } from "../context/AppContext"

import AdminLayout from "./AdminLayout"

import {
  MessageSquare,
  Search,
  CheckCircle,
  Archive,
  Trash2,
  Mail,
  Phone,
  Building,
  Globe,
  Clock,
  Package,
} from "lucide-react"

interface AdminInquiriesPageProps {
  navigate: NavigateFn
}

export default function AdminInquiriesPage({
  navigate,
}: AdminInquiriesPageProps) {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useAppStore()

  const [search, setSearch] = useState("")

  const [statusFilter, setStatusFilter] =
    useState<"all" | "new" | "contacted" | "archived">("all")

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  const filteredInquiries = inquiries.filter((inq) => {
    const matchStatus = statusFilter === "all" || inq.status === statusFilter

    const matchSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.company &&
        inq.company.toLowerCase().includes(search.toLowerCase())) ||
      inq.message.toLowerCase().includes(search.toLowerCase())

    return matchStatus && matchSearch
  })

  return (
    <AdminLayout
      currentPage="admin-inquiries"
      navigate={navigate}
      title="Manajemen Pesan & Inquiry"
      subtitle="Kelola pesan pelanggan dan permintaan pesanan B2B dari website publik"
    >
      {/* Filter & Search */}
      <div className="bg-white p-4 lg:p-5 rounded-2xl border border-[#D8C3A5]/40 shadow-xs mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#302A26]/40" />
          <input
            type="text"
            placeholder="Cari pesan berdasarkan nama, email, perusahaan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6F0] border border-[#D8C3A5]/60 rounded-xl text-xs sm:text-sm text-[#302A26] placeholder-[#302A26]/40 focus:outline-none focus:border-[#A65F46] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-[#F8F6F0] p-1 rounded-xl border border-[#D8C3A5]/40 self-start md:self-auto">
          {(["all", "new", "contacted", "archived"] as const).map((status) => {
            const count =
              status === "all"
                ? inquiries.length
                : inquiries.filter((i) => i.status === status).length

            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  statusFilter === status
                    ? "bg-white text-[#302A26] shadow-xs font-semibold"
                    : "text-[#302A26]/60 hover:text-[#302A26]"
                }`}
              >
                {status === "all" ? "Semua" : status} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Inquiry List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List Column */}
        <div className="lg:col-span-2 space-y-3.5">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#D8C3A5]/40">
              <MessageSquare className="w-10 h-10 mx-auto text-[#302A26]/30 mb-2" />
              <p className="font-display font-semibold text-base text-[#302A26]">
                Tidak ada pesan yang ditemukan
              </p>
              <p className="text-xs text-[#302A26]/50 mt-1">
                Pesan dari formulir kontak dan permintaan produk akan muncul di
                sini.
              </p>
            </div>
          ) : (
            filteredInquiries.map((inq) => {
              const isSelected = selectedInquiry?.id === inq.id

              return (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#A65F46] shadow-md ring-1 ring-[#A65F46]/30"
                      : "border-[#D8C3A5]/40 hover:border-[#A65F46]/50 shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-[#302A26]">
                        {inq.name}
                      </h4>
                      {inq.status === "new" && (
                        <span className="bg-[#A65F46] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          Baru
                        </span>
                      )}
                      {inq.status === "contacted" && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                          Sudah Dihubungi
                        </span>
                      )}
                      {inq.status === "archived" && (
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                          Arsip
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#302A26]/40 flex items-center gap-1 whitespace-nowrap">
                      <Clock className="w-3 h-3" />
                      {new Date(inq.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",

                        month: "short",

                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#302A26]/60 mb-3">
                    {inq.company && (
                      <span className="flex items-center gap-1 font-medium text-[#A65F46]">
                        <Building className="w-3.5 h-3.5" />
                        {inq.company}
                      </span>
                    )}
                    {inq.country && (
                      <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        {inq.country}
                      </span>
                    )}
                    {inq.productName && (
                      <span className="flex items-center gap-1 bg-[#F8F6F0] px-2 py-0.5 rounded-md text-[#7A8065]">
                        <Package className="w-3.5 h-3.5" />
                        Produk: {inq.productName}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#302A26]/80 line-clamp-2 leading-relaxed mb-3">
                    {inq.message}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#D8C3A5]/30">
                    <div className="flex items-center gap-2 text-xs">
                      {inq.phone && (
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#25D366] font-medium hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      <a
                        href={`mailto:${inq.email}?subject=Balasan Inquiry Parjono Keramik Jaya`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#A65F46] font-medium hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-1">
                      {inq.status !== "contacted" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()

                            updateInquiryStatus(inq.id, "contacted")
                          }}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          title="Tandai Sudah Dihubungi"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {inq.status !== "archived" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()

                            updateInquiryStatus(inq.id, "archived")
                          }}
                          className="p-1.5 text-[#302A26]/50 hover:bg-[#F8F6F0] rounded-lg"
                          title="Arsipkan"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()

                          if (confirm("Hapus inquiry ini?")) {
                            deleteInquiry(inq.id)

                            if (selectedInquiry?.id === inq.id)
                              setSelectedInquiry(null)
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Detail Panel */}
        <div className="bg-white p-6 rounded-2xl border border-[#D8C3A5]/40 shadow-xs h-fit sticky top-24">
          {selectedInquiry ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-[#A65F46] tracking-widest">
                    Detail Pesan
                  </span>
                  <span className="text-xs text-[#302A26]/40">
                    ID: {selectedInquiry.id}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#302A26]">
                  {selectedInquiry.name}
                </h3>
                {selectedInquiry.company && (
                  <p className="text-xs text-[#A65F46] font-medium">
                    {selectedInquiry.company}
                  </p>
                )}
              </div>

              <div className="space-y-2 text-xs bg-[#F8F6F0] p-4 rounded-xl border border-[#D8C3A5]/30">
                <div className="flex items-center justify-between">
                  <span className="text-[#302A26]/50">Email:</span>
                  <span className="font-medium text-[#302A26] select-all">
                    {selectedInquiry.email}
                  </span>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#302A26]/50">Telepon / WA:</span>
                    <span className="font-medium text-[#302A26] select-all">
                      {selectedInquiry.phone}
                    </span>
                  </div>
                )}
                {selectedInquiry.country && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#302A26]/50">Negara:</span>
                    <span className="font-medium text-[#302A26]">
                      {selectedInquiry.country}
                    </span>
                  </div>
                )}
                {selectedInquiry.productName && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#302A26]/50">Produk Diminati:</span>
                    <span className="font-medium text-[#A65F46]">
                      {selectedInquiry.productName}
                    </span>
                  </div>
                )}
                {selectedInquiry.quantity && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#302A26]/50">Jumlah Kuantitas:</span>
                    <span className="font-medium text-[#302A26]">
                      {selectedInquiry.quantity}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-[#302A26] mb-1.5">
                  Isi Pesan / Pertanyaan:
                </p>
                <div className="p-4 rounded-xl bg-[#F8F6F0] border border-[#D8C3A5]/30 text-xs text-[#302A26]/80 leading-relaxed whitespace-pre-line">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-semibold text-[#302A26]/50 uppercase tracking-wider">
                  Tindakan Cepat:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Inquiry Balasan Parjono Keramik Jaya`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#A65F46] hover:bg-[#8f5239] text-white text-xs font-medium transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Balas Email</span>
                  </a>
                  {selectedInquiry.phone ? (
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1fb854] text-white text-xs font-medium transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Chat WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        updateInquiryStatus(selectedInquiry.id, "contacted")
                      }
                      className="py-2.5 px-3 rounded-xl border border-[#D8C3A5] hover:bg-[#F8F6F0] text-xs font-medium text-[#302A26]"
                    >
                      Tandai Selesai
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#302A26]/40">
              <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-xs">
                Klik salah satu pesan di daftar sebelah kiri untuk melihat
                rincian lengkap.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
