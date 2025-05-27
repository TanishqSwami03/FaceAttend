import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const uploadStudentImage = async (file, organization, studentName) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${organization}/${studentName}_${Date.now()}.${fileExt}`
  const filePath = `students/${fileName}`

  const { error } = await supabase.storage
    .from('student-images')
    .upload(filePath, file, { cacheControl: '3600', upsert: true })

  if (error) throw error

  const { data } = supabase.storage.from('student-images').getPublicUrl(filePath)
  return data.publicUrl
}
