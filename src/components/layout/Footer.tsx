import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { HiPaperAirplane } from 'react-icons/hi2'
import { APP_NAME, APP_TAGLINE, FOOTER_LINKS, CATEGORIES, CONTACT_INFO } from '@/constants'
import { useToast } from '@/context/ToastContext'
import { validateEmail } from '@/utils'

export function Footer() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      showToast('Please enter a valid email address', 'error')
      return
    }
    showToast('Thanks for subscribing to our newsletter!', 'success')
    setEmail('')
  }

  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                <span className="text-sm font-bold">N</span>
              </div>
              <span className="text-xl font-bold">{APP_NAME}</span>
            </div>
            <p className="text-sm text-slate-400 mb-6">{APP_TAGLINE}</p>
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
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.quick.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.id}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">
              Get the latest deals and product launches delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-xl bg-white/10 px-4 py-2.5 text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-secondary"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-primary"
                aria-label="Subscribe"
              >
                <HiPaperAirplane className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-6 space-y-1 text-sm text-slate-400">
              <p>{CONTACT_INFO.email}</p>
              <p>{CONTACT_INFO.phone}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link to="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
