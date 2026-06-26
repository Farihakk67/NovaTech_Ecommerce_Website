import type { ProductCategory, SortOption } from '@/types'

export const APP_NAME = 'NovaTech'
export const APP_TAGLINE = 'Built for Pakistan'

export const STORAGE_KEYS = {
  CART: 'novatech_cart',
  WISHLIST: 'novatech_wishlist',
  THEME: 'novatech_theme',
  RECENTLY_VIEWED: 'novatech_recently_viewed',
} as const

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'laptops', label: 'Laptops' },
  { id: 'smartphones', label: 'Smartphones' },
  { id: 'headphones', label: 'Headphones' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'smart-watches', label: 'Smart Watches' },
  { id: 'keyboards', label: 'Keyboards' },
  { id: 'monitors', label: 'Monitors' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'cameras', label: 'Cameras' },
  { id: 'tablets', label: 'Tablets' },
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name-asc', label: 'Name: A–Z' },
]

export const PRICE_RANGE = {
  min: 0,
  max: 800000,
  step: 50000,
} as const

export const PAGINATION = {
  defaultPageSize: 9,
  pageSizeOptions: [9, 12, 18],
} as const

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

export const FOOTER_LINKS = {
  quick: [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop All' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ],
  support: [
    { to: '/contact', label: 'Help Center' },
    { to: '/contact', label: 'Shipping Info' },
    { to: '/contact', label: 'Returns' },
    { to: '/contact', label: 'Warranty' },
  ],
} as const

export const SOCIAL_LINKS = [
  { href: 'https://twitter.com', label: 'Twitter', icon: 'FaTwitter' },
  { href: 'https://instagram.com', label: 'Instagram', icon: 'FaInstagram' },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'FaLinkedin' },
  { href: 'https://youtube.com', label: 'YouTube', icon: 'FaYoutube' },
] as const

export const BRAND_LOGOS = [
  'TechCrunch',
  'Wired',
  'The Verge',
  'Engadget',
  'CNET',
  'Digital Trends',
] as const

export const COMPANY_STATS = [
  { value: '85K+', label: 'Happy Customers' },
  { value: '24+', label: 'Cities Served' },
  { value: '98.7%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Expert Support' },
] as const

export const WHY_CHOOSE_US = [
  {
    icon: 'HiOutlineShieldCheck',
    title: 'Certified Quality',
    description: 'Every product undergoes rigorous 47-point quality testing before reaching you.',
  },
  {
    icon: 'HiOutlineTruck',
    title: 'Fast Delivery',
    description: 'Free same-day dispatch in Lahore, Karachi, and Islamabad with live tracking.',
  },
  {
    icon: 'HiOutlineRefresh',
    title: '30-Day Returns',
    description: 'Not satisfied? Return within 30 days for a full refund, no questions asked.',
  },
  {
    icon: 'HiOutlineSupport',
    title: 'Local Support',
    description: 'Our tech specialists are available 24/7 to help you choose and configure.',
  },
] as const

export const CONTACT_INFO = {
  address: 'Suite 12, Gulberg III, Lahore 54000, Pakistan',
  phone: '+92 300 1234567',
  email: 'hello@novatech.pk',
  hours: 'Mon–Sat: 10AM–8PM PKT',
} as const
