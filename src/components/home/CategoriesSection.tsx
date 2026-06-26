import { Link } from 'react-router-dom'
import {
  HiOutlineComputerDesktop,
  HiOutlineDevicePhoneMobile,
  HiOutlineSpeakerWave,
  HiOutlinePuzzlePiece,
  HiOutlineClock,
  HiOutlineCommandLine,
  HiOutlineTv,
  HiOutlineMusicalNote,
  HiOutlineCamera,
  HiOutlineDeviceTablet,
} from 'react-icons/hi2'
import { categories } from '@/data/categories'
import { ScrollReveal, SectionHeading } from '@/components/common/ScrollReveal'
import { LazyImage } from '@/components/ui/LazyImage'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlineComputerDesktop,
  HiOutlineDevicePhoneMobile,
  HiOutlineSpeakerWave,
  HiOutlinePuzzlePiece,
  HiOutlineClock,
  HiOutlineCommandLine,
  HiOutlineTv,
  HiOutlineMusicalNote,
  HiOutlineCamera,
  HiOutlineDeviceTablet,
}

export function CategoriesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Categories"
            title="Explore Our Collections"
            description="Find the perfect device for every aspect of your digital life."
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] ?? HiOutlineComputerDesktop
            return (
              <ScrollReveal key={category.id} delay={index * 0.05}>
                <Link
                  to={`/shop?category=${category.id}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 hover:border-secondary hover:shadow-card transition-all duration-300"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                    <LazyImage
                      src={category.image}
                      alt={category.name}
                      className="rounded-xl group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-text text-sm">{category.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{category.productCount} items</p>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function WhyChooseUs() {
  const features = [
    {
      icon: '🛡️',
      title: 'Certified Quality',
      description: 'Every product undergoes rigorous 47-point quality testing before reaching you.',
    },
    {
      icon: '🚀',
      title: 'Express Delivery',
      description: 'Free next-day shipping on orders over $99. Track every step in real time.',
    },
    {
      icon: '↩️',
      title: '30-Day Returns',
      description: 'Not satisfied? Return within 30 days for a full refund, no questions asked.',
    },
    {
      icon: '💬',
      title: 'Expert Support',
      description: 'Our tech specialists are available 24/7 to help you choose and configure.',
    },
  ]

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why NovaTech"
            title="The NovaTech Difference"
            description="We're not just selling products — we're delivering experiences that elevate your digital life."
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <div className="rounded-2xl border border-border bg-surface p-6 hover:shadow-card transition-shadow duration-300 h-full">
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-sm text-text-muted">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function NewsletterSection() {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading
              eyebrow="Stay Connected"
              title="Get Exclusive Deals"
              description="Subscribe to our newsletter for early access to new products, exclusive discounts, and tech insights."
            />
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="h-12 px-8 rounded-xl gradient-primary text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
