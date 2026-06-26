import { ScrollReveal, SectionHeading } from '@/components/common/ScrollReveal'
import { SEO } from '@/components/common/Toast'
import { LazyImage } from '@/components/ui/LazyImage'
import { COMPANY_STATS } from '@/constants'
import { teamMembers, timeline, companyValues } from '@/data/company'

export function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about NovaTech's mission to bring premium consumer electronics to Pakistan with local support and dependable quality."
      />

      {/* Hero */}
      <section className="gradient-hero py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent mb-4 block">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-balance max-w-3xl mx-auto">
              Building Technology That Inspires the Next Generation
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
              Founded in Lahore in 2018, NovaTech set out to prove that premium technology
              doesn&apos;t have to come with a premium attitude. We design products for creators,
              innovators, students, and everyday families across Pakistan.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div className="rounded-2xl border border-border bg-surface p-8 h-full">
                <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-3 block">
                  Mission
                </span>
                <h2 className="text-2xl font-bold text-text mb-4">
                  Democratize Premium Technology
                </h2>
                <p className="text-text-muted leading-relaxed">
                  We believe everyone deserves access to beautifully designed, powerfully engineered
                  technology. Our mission is to create products that empower people to do their best
                  work, express their creativity, and connect with what matters most — without
                  compromise.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="rounded-2xl border border-border bg-surface p-8 h-full">
                <span className="text-sm font-semibold uppercase tracking-widest text-accent mb-3 block">
                  Vision
                </span>
                <h2 className="text-2xl font-bold text-text mb-4">
                  A World Powered by Thoughtful Design
                </h2>
                <p className="text-text-muted leading-relaxed">
                  We envision a future where technology seamlessly integrates into daily life —
                  enhancing rather than distracting. Every NovaTech product is a step toward that
                  future: intuitive, sustainable, and built to last.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COMPANY_STATS.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                  <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Our Values"
              title="What We Stand For"
              description="These principles guide every product we design and every decision we make."
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="rounded-2xl border border-border bg-surface p-6 h-full hover:shadow-card transition-shadow">
                  <h3 className="font-semibold text-text mb-2">{value.title}</h3>
                  <p className="text-sm text-text-muted">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Timeline"
              title="Our Journey"
              description="From a Lahore start-up to a growing national brand — the NovaTech story."
            />
          </ScrollReveal>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />
            {timeline.map((event, index) => (
              <ScrollReveal key={event.year} delay={index * 0.08}>
                <div
                  className={`relative flex gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full gradient-primary -translate-x-1/2 mt-1.5 ring-4 ring-surface" />
                  <div className="ml-12 md:ml-0 md:w-1/2">
                    <span className="text-sm font-bold text-secondary">{event.year}</span>
                    <h3 className="text-lg font-semibold text-text mt-1">{event.title}</h3>
                    <p className="text-sm text-text-muted mt-2">{event.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Our Team"
              title="Meet the People Behind NovaTech"
              description="A diverse team of engineers, designers, and dreamers united by a shared passion for great technology in Pakistan."
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 0.1}>
                <div className="group text-center">
                  <div className="relative mx-auto w-48 h-48 rounded-2xl overflow-hidden mb-4">
                    <LazyImage
                      src={member.image}
                      alt={member.name}
                      className="rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-semibold text-text">{member.name}</h3>
                  <p className="text-sm text-secondary mt-0.5">{member.role}</p>
                  <p className="text-sm text-text-muted mt-2">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
