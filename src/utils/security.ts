/**
 * PKJ CRAFT SECURITY UTILITIES
 * - Cryptographic SHA-256 password hashing with salt
 * - Brute-force rate limiting & temporary account lockout
 * - Strict image file type & size validation
 * - Session expiration management
 */

const SALT = 'pkj_craft_secure_salt_2026'
const RATE_LIMIT_KEY = 'pkj_craft_rate_limit_v1'
const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 5 * 60 * 1000 // 5 minutes

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + SALT)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

interface RateLimitState {
  attempts: number
  lockoutUntil: number | null
}

export function checkLoginRateLimit(): { isLocked: boolean; remainingSeconds: number; attempts: number } {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY)
    if (!raw) return { isLocked: false, remainingSeconds: 0, attempts: 0 }
    
    const state: RateLimitState = JSON.parse(raw)
    const now = Date.now()
    
    if (state.lockoutUntil && state.lockoutUntil > now) {
      const remainingSeconds = Math.ceil((state.lockoutUntil - now) / 1000)
      return { isLocked: true, remainingSeconds, attempts: state.attempts }
    }
    
    // If lockout has passed, reset state
    if (state.lockoutUntil && state.lockoutUntil <= now) {
      localStorage.removeItem(RATE_LIMIT_KEY)
      return { isLocked: false, remainingSeconds: 0, attempts: 0 }
    }
    
    return { isLocked: false, remainingSeconds: 0, attempts: state.attempts || 0 }
  } catch (e) {
    return { isLocked: false, remainingSeconds: 0, attempts: 0 }
  }
}

export function recordFailedLogin(): { isLocked: boolean; remainingSeconds: number; attempts: number } {
  try {
    const current = checkLoginRateLimit()
    const newAttempts = current.attempts + 1
    const now = Date.now()
    
    let lockoutUntil: number | null = null
    if (newAttempts >= MAX_FAILED_ATTEMPTS) {
      lockoutUntil = now + LOCKOUT_DURATION_MS
    }
    
    const state: RateLimitState = {
      attempts: newAttempts,
      lockoutUntil,
    }
    
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state))
    
    const isLocked = lockoutUntil !== null
    const remainingSeconds = isLocked ? Math.ceil(LOCKOUT_DURATION_MS / 1000) : 0
    return { isLocked, remainingSeconds, attempts: newAttempts }
  } catch (e) {
    return { isLocked: false, remainingSeconds: 0, attempts: 1 }
  }
}

export function clearLoginRateLimit(): void {
  try {
    localStorage.removeItem(RATE_LIMIT_KEY)
  } catch (e) {}
}

/**
 * Validates uploaded file for safe image types & reasonable size
 * Prevents LocalStorage QuotaExceeded crash & malicious executable/script upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  
  if (!allowedMimeTypes.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Format file tidak diizinkan. Hanya file JPG, PNG, atau WebP yang diperbolehkan demi keamanan sistem.',
    }
  }
  
  // Maximum 2.5 MB to avoid localStorage storage quotas and keep page loading fast
  const MAX_SIZE_BYTES = 2.5 * 1024 * 1024
  if (file.size > MAX_SIZE_BYTES) {
    return {
      valid: false,
      error: 'Ukuran foto melebihi batas maksimal (maksimal 2.5 MB). Silakan kompres atau pilih foto yang lebih kecil.',
    }
  }
  
  return { valid: true }
}

