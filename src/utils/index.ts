export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function calculateDiscountedPrice(price: number, discount: number): number {
  if (discount <= 0) return price
  return Math.round(price * (1 - discount / 100) * 100) / 100
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function getStockStatus(stock: number): {
  label: string
  variant: 'success' | 'warning' | 'error'
} {
  if (stock > 10) return { label: 'In Stock', variant: 'success' }
  if (stock > 0) return { label: `Only ${stock} left`, variant: 'warning' }
  return { label: 'Out of Stock', variant: 'error' }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    laptops: 'Laptops',
    smartphones: 'Smartphones',
    headphones: 'Headphones',
    gaming: 'Gaming Accessories',
    'smart-watches': 'Smart Watches',
    keyboards: 'Keyboards',
    monitors: 'Monitors',
    speakers: 'Speakers',
    cameras: 'Cameras',
    tablets: 'Tablets',
  }
  return labels[category] ?? category
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
): (number | 'ellipsis')[] {
  const range: (number | 'ellipsis')[] = []
  const left = Math.max(1, currentPage - siblingCount)
  const right = Math.min(totalPages, currentPage + siblingCount)

  if (left > 1) {
    range.push(1)
    if (left > 2) range.push('ellipsis')
  }

  for (let i = left; i <= right; i++) {
    range.push(i)
  }

  if (right < totalPages) {
    if (right < totalPages - 1) range.push('ellipsis')
    range.push(totalPages)
  }

  return range
}
