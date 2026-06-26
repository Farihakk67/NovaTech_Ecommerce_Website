import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { MainLayout } from '@/layouts/MainLayout'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/context/ToastContext'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext'
import { HomePage, NotFoundPage } from '@/pages/HomePage'
import { ProductGridSkeleton } from '@/components/common/LoadingSkeleton'

const ShopPage = lazy(() => import('@/pages/ShopPage').then((m) => ({ default: m.ShopPage })))
const ProductDetailPage = lazy(() =>
  import('@/pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })),
)
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)

function PageLoader() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <ProductGridSkeleton count={6} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route element={<MainLayout />}>
                      <Route index element={<HomePage />} />
                      <Route
                        path="shop"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            <ShopPage />
                          </Suspense>
                        }
                      />
                      <Route
                        path="product/:id"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            <ProductDetailPage />
                          </Suspense>
                        }
                      />
                      <Route
                        path="about"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            <AboutPage />
                          </Suspense>
                        }
                      />
                      <Route
                        path="contact"
                        element={
                          <Suspense fallback={<PageLoader />}>
                            <ContactPage />
                          </Suspense>
                        }
                      />
                      <Route path="*" element={<NotFoundPage />} />
                    </Route>
                  </Routes>
                </AnimatePresence>
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
