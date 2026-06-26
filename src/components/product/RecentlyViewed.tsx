import { useRecentlyViewed } from '@/context/RecentlyViewedContext'
import { ProductCard } from '@/components/product/ProductCard'
import { ScrollReveal, SectionHeading } from '@/components/common/ScrollReveal'

export function RecentlyViewedSection() {
  const { items } = useRecentlyViewed()

  if (items.length === 0) return null

  return (
    <section className="py-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="Recently Viewed" title="Continue Exploring" align="left" />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
