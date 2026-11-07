import React, { useState, useEffect } from "react"
import { NavigateFn } from "../App"
import { useAppStore, CompanyInfo, formatWhatsAppLink } from "../context/AppContext"
import { isSupabaseConfigured } from "../lib/supabase"
import AdminLayout from "./AdminLayout"
import {
  Save,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Building,
  MessageCircle,
  Sparkles,
} from "lucide-react"

interface AdminSettingsPageProps {
  navigate: NavigateFn
}

export default function AdminSettingsPage({ navigate }: AdminSettingsPageProps) {
  const { companyInfo, updateCompanyInfo, resetCompanyInfoToDefault } = useAppStore()

  const [form, setForm] = useState<CompanyInfo>(companyInfo)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  // Sync form if companyInfo updates externally
  useEffect(() => {
    setForm(companyInfo)
  }, [companyInfo])

  const handleChange = (field: keyof CompanyInfo, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSavedSuccess(false)
    setResetSuccess(false)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateCompanyInfo(form)
    setSavedSuccess(true)
    setTimeout(() => {
      setSavedSuccess(false)
    }, 3500)
  }

  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin mengembalikan semua kontak & profil ke pengaturan default pabrik?")) {
      resetCompanyInfoToDefault()
      setResetSuccess(true)
      setTimeout(() => {
        setResetSuccess(false)
      }, 3500)
    }
  }

  const testWaUrl = formatWhatsAppLink(
    form.whatsapp,
    "Halo Admin Parjono Keramik Jaya, ini pesan tes dari dashboard admin."
  )

  return (
    <AdminLayout
      currentPage="admin-settings"
      navigate={navigate}
      title="Pengaturan Kontak & Profil"
      subtitle="Ubah nomor WhatsApp, telepon, email, alamat workshop, dan media sosial secara fleksibel tanpa harus merubah kode program."
      actions={
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 hover:text-stone-800 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset ke Default
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#A65F46] rounded-lg hover:bg-[#8e4f3a] transition-colors shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            Simpan Perubahan
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Cloud Database Status */}
        {isSupabaseConfigured() ? (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl shadow-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold">Cloud Database (Supabase) Aktif:</span> Setiap perubahan kontak & profil yang Anda simpan di sini otomatis tersimpan permanen di cloud dan langsung sinkron ke seluruh dunia!
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm space-y-1">
              <p className="font-bold">Status: Mode Penyimpanan Lokal (Belum Terhubung ke Supabase)</p>
              <p className="text-amber-800 text-xs">
                Perubahan saat ini disimpan di penyimpanan lokal browser Anda. Hubungkan kredensial Supabase (URL & Anon Key) di file <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">.env</code> atau Vercel Environment Variables agar perubahan langsung tersimpan permanen di cloud untuk semua pengunjung dan HP.
              </p>
            </div>
          </div>
        )}

        {/* Notifications */}
        {savedSuccess && (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl shadow-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-sm">
              <span className="font-semibold">Berhasil disimpan!</span> Semua nomor telepon, email, WhatsApp, dan alamat di seluruh website publik telah diperbarui secara langsung.
            </div>
          </div>
        )}

        {resetSuccess && (
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl shadow-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-sm">
              <span className="font-semibold">Kontak dikembalikan ke pengaturan default asli.</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Kontak Komunikasi Langsung */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <div className="p-2 bg-[#A65F46]/10 text-[#A65F46] rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#302A26]">Kontak Komunikasi Langsung</h3>
                  <p className="text-xs text-stone-500">Nomor ini terhubung ke tombol WhatsApp mengambang, footer, dan form kontak.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.whatsapp}
                      onChange={e => handleChange("whatsapp", e.target.value)}
                      placeholder="Contoh: +62 812-3456-7890 atau 081234567890"
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Sistem otomatis mengonversi nomor ke format standar internasional wa.me.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Nomor Telepon Kantor / Workshop
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={e => handleChange("phone", e.target.value)}
                    placeholder="Contoh: +62 812-3456-7890 atau (0274) 123456"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                  />
                  <p className="text-[11px] text-stone-400 mt-1">
                    Ditampilkan pada teks halaman kontak dan footer.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Alamat Email Resmi <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => handleChange("email", e.target.value)}
                      placeholder="Contoh: info@parjonokeramikjaya.com"
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Email yang menerima pengajuan konsultasi atau pertanyaan dari pengunjung.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Alamat Workshop & Jam Operasional */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <div className="p-2 bg-[#A65F46]/10 text-[#A65F46] rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#302A26]">Lokasi Workshop & Jam Kerja</h3>
                  <p className="text-xs text-stone-500">Alamat fisik workshop di Kasongan dan waktu kunjungan operasional.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Alamat Workshop (Baris 1)
                  </label>
                  <input
                    type="text"
                    value={form.addressLine1}
                    onChange={e => handleChange("addressLine1", e.target.value)}
                    placeholder="Contoh: Klisat, Srihardono, Pundong"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Alamat Workshop (Baris 2 - Kota & Kode Pos)
                  </label>
                  <input
                    type="text"
                    value={form.addressLine2}
                    onChange={e => handleChange("addressLine2", e.target.value)}
                    placeholder="Contoh: Bantul, D.I. Yogyakarta 55771, Indonesia"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Jam Operasional
                    </label>
                    <input
                      type="text"
                      value={form.operatingHours}
                      onChange={e => handleChange("operatingHours", e.target.value)}
                      placeholder="Contoh: Senin - Sabtu: 08:00 - 17:00 WIB"
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Link Google Maps
                    </label>
                    <input
                      type="text"
                      value={form.googleMapsUrl}
                      onChange={e => handleChange("googleMapsUrl", e.target.value)}
                      placeholder="https://maps.google.com/..."
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Profil Usaha & Media Sosial */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <div className="p-2 bg-[#A65F46]/10 text-[#A65F46] rounded-lg">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#302A26]">Identitas Usaha & Media Sosial</h3>
                  <p className="text-xs text-stone-500">Nama brand, slogan, dan tautan sosial media resmi.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Nama Usaha / Perusahaan
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => handleChange("name", e.target.value)}
                    placeholder="Contoh: PARJONO KERAMIK JAYA"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Slogan / Tagline
                  </label>
                  <input
                    type="text"
                    value={form.tagline}
                    onChange={e => handleChange("tagline", e.target.value)}
                    placeholder="Contoh: Produsen Gerabah & Terakota Kasongan, Bantul"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Username / Link Instagram
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.instagram}
                      onChange={e => handleChange("instagram", e.target.value)}
                      placeholder="@parjonokeramikjaya"
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Nama / Link Halaman Facebook
                  </label>
                  <input
                    type="text"
                    value={form.facebook}
                    onChange={e => handleChange("facebook", e.target.value)}
                    placeholder="Parjono Keramik Jaya"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A65F46] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-600 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 hover:text-stone-800 transition-colors shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Semua ke Default Pabrik
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#A65F46] hover:bg-[#8e4f3a] rounded-xl shadow transition-all hover:scale-[1.01]"
              >
                <Save className="w-4 h-4" />
                Simpan Perubahan Kontak
              </button>
            </div>
          </div>

          {/* Right Column: Live Preview & Testing (1 col) */}
          <div className="space-y-6">
            {/* Live WhatsApp Tester */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-bold">Uji Coba Tautan WhatsApp</h4>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Pastikan nomor WhatsApp yang Anda masukkan valid dan dapat langsung membuka obrolan ke customer service Anda:
              </p>
              <div className="bg-white p-3 rounded-lg border border-emerald-200 text-xs font-mono text-emerald-900 break-all">
                {testWaUrl}
              </div>
              <a
                href={testWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Buka & Tes WhatsApp Sekarang
              </a>
            </div>

            {/* Live Preview Card */}
            <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Pratinjau Langsung (Preview)
                </span>
                <span className="text-[11px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-medium">
                  Tampilan Publik
                </span>
              </div>

              {/* Mock Footer / Contact Box */}
              <div className="bg-[#302A26] text-white p-4 rounded-xl space-y-3.5 text-xs">
                <div>
                  <h5 className="font-serif font-bold text-sm tracking-wide text-[#EAD7C5]">
                    {form.name || "PARJONO KERAMIK JAYA"}
                  </h5>
                  <p className="text-[11px] text-stone-400">
                    {form.tagline || "Produsen Gerabah & Terakota Kasongan, Bantul"}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-700 text-stone-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D8C3A5] shrink-0 mt-0.5" />
                    <span>
                      {form.addressLine1 || "Klisat, Srihardono"}, {form.addressLine2 || "Bantul, DIY"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#D8C3A5] shrink-0" />
                    <span>{form.phone || form.whatsapp || "+62 ..."}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#D8C3A5] shrink-0" />
                    <span className="truncate">{form.email || "info@..."}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#D8C3A5] shrink-0" />
                    <span>{form.operatingHours || "08:00 - 17:00 WIB"}</span>
                  </div>
                </div>

                {(form.instagram || form.facebook) && (
                  <div className="pt-2 border-t border-stone-700 flex items-center gap-3 text-stone-400">
                    {form.instagram && (
                      <span className="flex items-center gap-1.5 hover:text-white">
                        <svg className="w-3.5 h-3.5 text-[#D8C3A5]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        <span className="text-[11px]">{form.instagram}</span>
                      </span>
                    )}
                    {form.facebook && (
                      <span className="flex items-center gap-1.5 hover:text-white">
                        <svg className="w-3.5 h-3.5 text-[#D8C3A5]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span className="text-[11px] truncate max-w-[120px]">{form.facebook}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-stone-100 text-xs text-stone-500">
                <span className="font-semibold text-stone-700">Fleksibilitas Penuh:</span> Kapan pun Anda mengganti nomor WhatsApp atau email baru di halaman ini, perubahan akan langsung aktif seketika di seluruh halaman website tanpa perlu deploy ulang atau mengedit kode.
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
