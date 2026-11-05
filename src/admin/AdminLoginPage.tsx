import React, { useState, useEffect } from "react"

import { NavigateFn } from "../App"

import { useAppStore } from "../context/AppContext"

import {
  Lock,
  User,
  ArrowLeft,
  Shield,
  AlertCircle,
  CheckCircle2,
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

  // If already logged in, redirect to dashboard

  useEffect(() => {
    if (isAuthenticated) {
      navigate("admin-dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    setError(null)

    setLoading(true)

    setTimeout(() => {
      const res = login(username, password)

      if (res.success) {
        setSuccess(true)

        setTimeout(() => {
          navigate("admin-dashboard")
        }, 500)
      } else {
        setError(res.error || "Username atau password salah")

        setLoading(false)
      }
    }, 400)
  }

  const fillDemoCredentials = () => {
    setUsername("admin")

    setPassword("admin123")

    setError(null)
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
            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#A65F46] text-white flex items-center justify-center shadow-lg shadow-[#A65F46]/30">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="font-display font-bold text-2xl text-white tracking-wide">
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
                  <p className="font-semibold text-red-800">Gagal Masuk</p>
                  <p className="text-xs mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                <span className="font-medium">
                  Berhasil masuk! Membuka dashboard...
                </span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#302A26] uppercase tracking-wider mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#302A26]/40">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    className="w-full pl-10 pr-4 py-3 bg-[#F8F6F0] border border-[#D8C3A5] rounded-xl text-sm text-[#302A26] placeholder-[#302A26]/40 focus:outline-none focus:border-[#A65F46] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#302A26] uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#302A26]/40">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-4 py-3 bg-[#F8F6F0] border border-[#D8C3A5] rounded-xl text-sm text-[#302A26] placeholder-[#302A26]/40 focus:outline-none focus:border-[#A65F46] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#A65F46] hover:bg-[#8f5239] text-white font-semibold py-3.5 rounded-xl text-sm shadow-md shadow-[#A65F46]/20 transition-all hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <span>Masuk ke Admin CMS</span>
                )}
              </button>
            </form>

            {/* Demo Credentials Quick Fill */}
            <div className="mt-6 pt-6 border-t border-[#D8C3A5]/30 text-center">
              <p className="text-xs text-[#302A26]/60 mb-2.5">
                Kredensial Demo:{" "}
                <code className="bg-[#F8F6F0] px-1.5 py-0.5 rounded text-[#A65F46] font-mono">
                  admin
                </code>{" "}
                /{" "}
                <code className="bg-[#F8F6F0] px-1.5 py-0.5 rounded text-[#A65F46] font-mono">
                  admin123
                </code>
              </p>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-xs font-medium text-[#A65F46] hover:text-[#8f5239] hover:underline inline-flex items-center gap-1.5 py-1 px-3 bg-[#A65F46]/10 rounded-lg"
              >
                <span>Isi Otomatis Akun Demo</span>
              </button>
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
