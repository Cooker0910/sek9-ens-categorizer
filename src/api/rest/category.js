import { jsonQuery, query } from './common'

export async function apiGetCategories(searchParams) {
  return await query('/category/all/', { searchParams })
}

export async function apiGetCategoryById(id) {
  return await query(`/category/${id}/`)
}

export async function apiUpdateCategoryById(id, data) {
  return await jsonQuery(`/category/${id}/`, 'PUT', data)
}

export async function apiCreateCategory(data) {
  return await jsonQuery('/category/create/', 'POST', data)
}

export async function apiDeleteCategory(id) {
  return await jsonQuery(`/category/${id}/`, 'DELETE')
}
