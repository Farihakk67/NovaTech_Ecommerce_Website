export type ProductCategory =
  | 'laptops'
  | 'smartphones'
  | 'headphones'
  | 'gaming'
  | 'smart-watches'
  | 'keyboards'
  | 'monitors'
  | 'speakers'
  | 'cameras'
  | 'tablets'

export interface ProductSpecifications {
  [key: string]: string
}

export interface ProductReview {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  avatar: string
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number
  rating: number
  reviewCount: number
  stock: number
  description: string
  specifications: ProductSpecifications
  images: string[]
  tags: string[]
  featured: boolean
  discount: number
  reviews: ProductReview[]
  badge?: 'new' | 'bestseller' | 'limited'
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name-asc'

export interface ProductFilters {
  search: string
  categories: ProductCategory[]
  minPrice: number
  maxPrice: number
  minRating: number
  sort: SortOption
  page: number
  pageSize: number
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export interface CategoryInfo {
  id: ProductCategory
  name: string
  description: string
  image: string
  icon: string
  productCount: number
}
