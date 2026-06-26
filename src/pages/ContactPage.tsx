import { useState } from 'react'
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { HiMapPin, HiPhone, HiEnvelope, HiClock } from 'react-icons/hi2'
import type { ContactFormData, ContactFormErrors } from '@/types'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { ScrollReveal, SectionHeading } from '@/components/common/ScrollReveal'
import { SEO } from '@/components/common/Toast'
import { useToast } from '@/context/ToastContext'
import { CONTACT_INFO } from '@/constants'
import { validateEmail } from '@/utils'

const initialForm: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactPage() {
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { showToast } = useToast()

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {}

    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!validateEmail(form.email)) newErrors.email = 'Please enter a valid email'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    else if (form.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSuccess(true)
    showToast("Message sent successfully! We'll get back to you soon.", 'success')
    setForm(initialForm)
    setTimeout(() => setIsSuccess(false), 5000)
  }

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with NovaTech. Our team is here to help with product questions, support, and partnerships."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Contact"
              title="We'd Love to Hear From You"
              description="Have a question about our products, need support, or want to explore a partnership? Our team is ready to help."
            />
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <ScrollReveal direction="left">
              <div className="rounded-2xl border border-border bg-surface p-8">
                {isSuccess && (
                  <div
                    className="mb-6 rounded-xl bg-success/10 border border-success/30 px-4 py-3 text-sm text-success"
                    role="status"
                  >
                    Thank you! Your message has been sent. We&apos;ll respond within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <Input
                    label="Name"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    error={errors.name}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    error={errors.email}
                    placeholder="john@example.com"
                    required
                  />
                  <Input
                    label="Subject"
                    value={form.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    error={errors.subject}
                    placeholder="How can we help?"
                    required
                  />
                  <Textarea
                    label="Message"
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    error={errors.message}
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                  <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
                    Send Message
                  </Button>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right">
              <div className="space-y-8">
                <div className="rounded-2xl border border-border bg-surface p-8 space-y-6">
                  <h2 className="text-xl font-bold text-text">Contact Information</h2>
                  {[
                    { icon: HiMapPin, label: 'Address', value: CONTACT_INFO.address },
                    { icon: HiPhone, label: 'Phone', value: CONTACT_INFO.phone },
                    { icon: HiEnvelope, label: 'Email', value: CONTACT_INFO.email },
                    { icon: HiClock, label: 'Hours', value: CONTACT_INFO.hours },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                        <Icon className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{label}</p>
                        <p className="text-sm text-text-muted">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border bg-surface p-8">
                  <h2 className="text-xl font-bold text-text mb-4">Follow Us</h2>
                  <div className="flex gap-3">
                    {[
                      { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
                      { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
                      { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                      { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
                    ].map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-border hover:border-secondary hover:text-secondary transition-colors"
                        aria-label={label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="rounded-2xl border border-border overflow-hidden h-64 bg-border/30 relative">
                  <iframe
                    title="NovaTech office location"
                    src="https://maps.google.com/maps?q=2847+Innovation+Drive+San+Francisco+CA&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
