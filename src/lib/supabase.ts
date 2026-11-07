import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project')
  )
}

// Fallback dummy client if credentials aren't set yet to avoid runtime crashes
export const supabase = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)

/**
 * Upload an image file to Supabase Storage bucket 'pkj-media'
 * Returns the permanent public CDN URL of the uploaded image.
 */
export async function uploadMediaToSupabase(
  file: File,
  folder: 'products' | 'gallery' | 'news' | 'awards' | 'exhibitions' | 'branding' = 'products'
): Promise<{ url: string | null; error?: string }> {
  if (!isSupabaseConfigured()) {
    // Fallback to Base64 data URL if Supabase is not yet connected
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve({ url: reader.result as string })
      reader.onerror = () => resolve({ url: null, error: 'Gagal membaca file gambar' })
      reader.readAsDataURL(file)
    })
  }

  try {
    const fileExt = file.name.split('.').pop() || 'jpg'
    const cleanFileName = file.name
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase()
      .substring(0, 30)
    const filePath = `${folder}/${Date.now()}-${cleanFileName}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('pkj-media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError)
      // Fallback to base64 if bucket fails
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve({ url: reader.result as string, error: uploadError.message })
        reader.onerror = () => resolve({ url: null, error: uploadError.message })
        reader.readAsDataURL(file)
      })
    }

    const { data } = supabase.storage.from('pkj-media').getPublicUrl(filePath)
    return { url: data.publicUrl }
  } catch (err: any) {
    console.error('Upload exception:', err)
    return { url: null, error: err.message || 'Terjadi kesalahan saat mengunggah foto' }
  }
}

