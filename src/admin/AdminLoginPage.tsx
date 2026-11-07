import React, { useState, useEffect } from "react"
import { NavigateFn } from "../App"
import { useAppStore } from "../context/AppContext"
import { checkLoginRateLimit } from "../utils/security"
import { PKJ_LOGO } from "../assets/logo"
import {
  Lock,
  User,
  ArrowLeft,
  Shield,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react"

interface AdminLoginPageProps {
  navigate: NavigateFn
}

export default function AdminLoginPage({ navigate }: AdminLoginPageProps) {
  const { login, isAuthenticated } = useAppStore()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [lockoutSecs, setLockoutSecs] = useState(0)

  // Check rate limit on mount
  useEffect(() => {
    const status = checkLoginRateLimit()
    if (status.isLocked) {
      setLockoutSecs(status.remainingSeconds)
      setError(
        `Terlalu banyak percobaan gagal. Akses login terkunci selama ${status.remainingSeconds} detik demi keamanan.`,
      )
    }
  }, [])

  // Timer countdown if locked out
  useEffect(() => {
    if (lockoutSecs <= 0) return
    const timer = setInterval(() => {
      setLockoutSecs((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setError(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [lockoutSecs])

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("admin-dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (lockoutSecs > 0) return

    setError(null)
    setLoading(true)

    try {
      const res = await login(username, password)
      if (res.success) {
        setSuccess(true)
        setTimeout(() => {
          navigate("admin-dashboard")
        }, 500)
      } else {
        setError(res.error || "Username atau password salah")
        setLoading(false)
        const status = checkLoginRateLimit()
        if (status.isLocked) {
          setLockoutSecs(status.remainingSeconds)
        }
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem saat memverifikasi kredensial.")
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F5F1E8" }}
    >
      <div className="max-w-md w-full">
        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-2 text-sm text-[#302A26]/70 hover:text-[#A65F46] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Website Publik</span>
          </button>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#D8C3A5]/40 overflow-hidden">
          {/* Header */}
          <div className="bg-[#302A26] p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D8C3A5_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white p-3 rounded-2xl shadow-lg border border-white/20 inline-block mb-3.5">
                <img
                  src={PKJ_LOGO}
                  alt="PARJONO KERAMIK JAYA"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <h1 className="font-display font-bold text-xl text-white tracking-wide">
                PARJONO KERAMIK JAYA
              </h1>
              <p className="text-[#D8C3A5] text-xs tracking-widest uppercase mt-1">
                Admin Dashboard CMS Portal
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                <div>
                  <p className="font-semibold text-red-800">
                    {lockoutSecs > 0 ? "Akses Terkunci Sementara" : "Gagal Masuk"}
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed">{error}</p>
                  {lockoutSecs > 0 && (
                    <p className="text-xs font-mono font-bold text-red-800 mt-1.5">
                      Tersisa: {lockoutSecs} detik
                    </p>
                  )}
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                <p className="font-medium text-xs">
                  Autentikasi berhasil! Mengalihkan ke dashboard...
                </p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Username Admin
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#302A26]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    disabled={loading || lockoutSecs > 0}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    className="w-full pl-10 pr-4 py-3 bg-[#F8F6F0] border border-[#D8C3A5] rounded-xl text-sm text-[#302A26] placeholder-[#302A26]/40 focus:outline-none focus:border-[#A65F46] focus:bg-white transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#302A26] mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#302A26]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    disabled={loading || lockoutSecs > 0}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-4 py-3 bg-[#F8F6F0] border border-[#D8C3A5] rounded-xl text-sm text-[#302A26] placeholder-[#302A26]/40 focus:outline-none focus:border-[#A65F46] focus:bg-white transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || lockoutSecs > 0}
                className="w-full bg-[#A65F46] hover:bg-[#8f5239] text-white font-semibold py-3.5 rounded-xl text-sm shadow-md shadow-[#A65F46]/20 transition-all hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memverifikasi Keamanan...</span>
                  </>
                ) : (
                  <span>Masuk ke Admin CMS</span>
                )}
              </button>
            </form>

            {/* Security Badge Footer */}
            <div className="mt-6 pt-5 border-t border-[#D8C3A5]/30 flex items-center justify-center gap-2 text-xs text-[#7A8065]">
              <ShieldCheck className="w-4 h-4 text-[#7A8065]" />
              <span>Dilindungi Enkripsi Kriptografi & Proteksi Brute-Force</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-xs text-[#302A26]/40">
          PARJONO KERAMIK JAYA &bull; Sistem Manajemen Konten Terpadu
        </div>
      </div>
    </div>
  )
}
