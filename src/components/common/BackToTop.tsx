import { motion } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi2'
import { useScrollPosition } from '@/hooks/useScrollPosition'

export function BackToTop() {
  const isVisible = useScrollPosition(400)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-white shadow-glow"
      aria-label="Back to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <HiArrowUp className="h-5 w-5" />
    </motion.button>
  )
}
