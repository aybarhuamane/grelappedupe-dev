import { apiUrl } from '@/config'
import { importStudenst } from '@/types'

const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_PROD
const urlLocal = process.env.API_URL_DEV

const urlBase = isProduction ? urlProd : urlLocal

const apiBase = apiUrl.educativa

export async function importStudentsData(data: importStudenst.IStudentImport) {
  const method = 'POST'

  const formData = new FormData()

  formData.append('course_assigned_id', data.course_assigned_id.toString())
  formData.append('level_id', data.level_id.toString())
  formData.append('degree_number', data.degree_number.toString())
  if (data.file.length > 0) {
    formData.append('file', data.file[0])
  }
  const url = `${urlBase}${apiBase.importstudents}`
  const response = await fetch(url, {
    method,
    body: formData,
  })
  return response
}

export async function importTeachersData(data: importStudenst.ITeacherImport) {
  const method = 'POST'

  const formData = new FormData()

  if (data.file.length > 0) {
    formData.append('file', data.file[0])
  }
  if (data.detail_institution_id) {
    formData.append('detail_institution_id', data.detail_institution_id.toString())
  }
  const url = `${urlBase}${apiBase.importTeachers}`
  const response = await fetch(url, {
    method,
    body: formData,
  })
  return response
}
