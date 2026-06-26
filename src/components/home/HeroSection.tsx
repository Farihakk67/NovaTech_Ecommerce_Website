import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiSparkles } from 'react-icons/hi2'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/common/ScrollReveal'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero min-h-[90vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 mb-6">
                <HiSparkles className="h-4 w-4 text-accent" />
                New NovaPhone Fold — Now Available
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight text-balance"
            >
              Technology{' '}
              <span className="gradient-text bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Reimagined
              </span>{' '}
              for Tomorrow
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-slate-300 max-w-lg text-balance"
            >
              Discover premium consumer electronics crafted with precision, designed for innovators,
              and built to inspire your next breakthrough.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/shop">
                <Button size="lg">
                  Explore Collection
                  <HiArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex gap-8"
            >
              {[
                { value: '30+', label: 'Products' },
                { value: '2M+', label: 'Customers' },
                { value: '4.8★', label: 'Avg Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-secondary/30 to-accent/30 blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80"
                alt="NovaTech premium electronics showcase"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-full"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-card border border-white/20"
              >
                <p className="text-sm font-semibold text-white">NovaBook Pro 16</p>
                <p className="text-xs text-slate-300">From $1,709</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function BrandLogos() {
  const logos = ['TechCrunch', 'Wired', 'The Verge', 'Engadget', 'CNET', 'Digital Trends']

  return (
    <section className="py-12 border-y border-border bg-surface/50">
      <ScrollReveal>
        <p className="text-center text-sm font-medium text-text-muted mb-8 uppercase tracking-widest">
          As featured in
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 px-4">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-lg md:text-xl font-bold text-text-muted/40 hover:text-text-muted transition-colors"
            >
              {logo}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                }}
              />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
                Ready to Upgrade Your Tech?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Join over 2 million customers who trust NovaTech for premium electronics. Free
                shipping on orders over $99.
              </p>
              <Link to="/shop" className="inline-block mt-8">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Shop Now
                  <HiArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
