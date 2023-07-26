export interface INewsItem {
  title: string
  description: string
  content: string
  publishedAt: string
  author: string,
  id: string
}

export type Nullable<T> = T | null

export type OrderBy = 'asc' | 'desc'

export type SearchMode = 'default' | 'search'
