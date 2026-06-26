import { Link } from 'react-router-dom'
import { HeroSection, BrandLogos, CTASection } from '@/components/home/HeroSection'
import {
  CategoriesSection,
  WhyChooseUs,
  NewsletterSection,
} from '@/components/home/CategoriesSection'
import {
  FeaturedProducts,
  TrendingProducts,
  TestimonialsSection,
} from '@/components/home/ProductSections'
import { RecentlyViewedSection } from '@/components/product/RecentlyViewed'
import { SEO } from '@/components/common/Toast'
import { getFeaturedProducts, getTrendingProducts } from '@/data/products'

export function HomePage() {
  const featured = getFeaturedProducts()
  const trending = getTrendingProducts()

  return (
    <>
      <SEO
        title="Home"
        description="NovaTech — Premium consumer electronics crafted for the future. Discover laptops, smartphones, wearables, and more."
      />
      <HeroSection />
      <BrandLogos />
      <FeaturedProducts products={featured} />
      <CategoriesSection />
      <WhyChooseUs />
      <TrendingProducts products={trending} />
      <TestimonialsSection />
      <RecentlyViewedSection />
      <NewsletterSection />
      <CTASection />
    </>
  )
}

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-8xl font-bold gradient-text">404</p>
      <h1 className="mt-4 text-2xl font-bold text-text">Page not found</h1>
      <p className="mt-2 text-text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        to="/"
        className="mt-8 inline-flex h-11 items-center px-6 rounded-xl gradient-primary text-white font-medium text-sm"
      >
        Back to Home
      </Link>
    </div>
  )
}
