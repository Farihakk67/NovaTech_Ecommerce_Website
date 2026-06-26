import { render, type RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { type ReactElement, type ReactNode } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/context/ToastContext'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext'
import { ToastContainer } from '@/components/common/Toast'
import type { Product } from '@/types'

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                {children}
                <ToastContainer />
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options })
}

export const mockProduct: Product = {
  id: 'test-product-001',
  name: 'NovaTest Pro',
  category: 'laptops',
  price: 999,
  rating: 4.5,
  reviewCount: 100,
  stock: 10,
  description: 'A test product for unit testing purposes.',
  specifications: {
    Processor: 'Test Core M1',
    Memory: '16GB',
    Storage: '512GB SSD',
  },
  images: ['https://images.unsplash.com/photo-1496181133206-8122ed4d25b6?w=400&q=80'],
  tags: ['test', 'premium'],
  featured: true,
  discount: 10,
  badge: 'new',
  reviews: [
    {
      id: 'r1',
      author: 'Test User',
      rating: 5,
      date: 'Jan 1, 2025',
      comment: 'Great product!',
      avatar: 'https://i.pravatar.cc/80?img=1',
    },
  ],
}
