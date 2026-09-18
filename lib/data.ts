import fs from 'node:fs'
import path from 'node:path'
import type { ProductPage, SearchPage } from './types'

const PRODUCTS_DIR = path.join(process.cwd(), 'data', 'products')
const SEARCH_DIR = path.join(process.cwd(), 'data', 'search')

export function getAllProductSlugs(): string[] {
  return fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
}

export function getProductData(slug: string): ProductPage {
  const file = path.join(PRODUCTS_DIR, `${slug}.json`)
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as ProductPage
}

export function getAllSearchSlugs(): string[] {
  return fs
    .readdirSync(SEARCH_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
}

export function getSearchData(slug: string): SearchPage {
  const file = path.join(SEARCH_DIR, `${slug}.json`)
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as SearchPage
}
