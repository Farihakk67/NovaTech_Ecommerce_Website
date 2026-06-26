import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi2'
import type { Product } from '@/types'
import { ProductCard } from '@/components/product/ProductCard'
import { QuickViewModal } from '@/components/product/QuickViewModal'
import { ScrollReveal, SectionHeading } from '@/components/common/ScrollReveal'
import { Button } from '@/components/ui/Button'

interface ProductSectionProps {
  title: string
  description?: string
  eyebrow?: string
  products: Product[]
}

function ProductSection({ title, description, eyebrow, products }: ProductSectionProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
              align="left"
            />
            <Link to="/shop">
              <Button variant="outline">
                View All
                <HiArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  )
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <ProductSection
      eyebrow="Featured"
      title="Handpicked Excellence"
      description="Our most celebrated products, chosen for their innovation and customer love."
      products={products}
    />
  )
}

export function TrendingProducts({ products }: { products: Product[] }) {
  return (
    <ProductSection
      eyebrow="Trending"
      title="What Everyone's Buying"
      description="The products our community can't stop talking about."
      products={products}
    />
  )
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ali Raza',
      role: 'Architect, Karachi',
      content:
        'NovaTech has become my go-to for all things tech. The quality is unmatched, and their delivery support feels genuinely personal and reliable.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/80?img=47',
    },
    {
      name: 'Hamza Siddiqui',
      role: 'Business Owner, Lahore',
      content:
        'The NovaBook Pro 16 changed how I work. Battery life is incredible, the display is gorgeous, and it handles everything I throw at it.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/80?img=12',
    },
    {
      name: 'Ayesha Malik',
      role: 'Content Creator, Islamabad',
      content:
        'As a creator, I need reliable gear. NovaCam and NovaSound have exceeded every expectation. Remarkable attention to detail.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/80?img=32',
    },
  ]

  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by Innovators"
            description="Hear from the people who make NovaTech part of their daily workflow."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <ScrollReveal key={t.name} delay={index * 0.1}>
              <blockquote className="rounded-2xl border border-border bg-background p-6 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <span key={i} className="text-warning text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-text-muted flex-1 mb-6">&ldquo;{t.content}&rdquo;</p>
                <footer className="flex items-center gap-3">
                  <img src={t.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <cite className="not-italic font-semibold text-text text-sm">{t.name}</cite>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
