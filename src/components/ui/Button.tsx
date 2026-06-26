import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: 'gradient-primary text-white shadow-glow hover:opacity-90 focus-visible:ring-secondary',
  secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-soft',
  outline:
    'border-2 border-border bg-transparent hover:bg-surface hover:border-secondary text-text',
  ghost: 'bg-transparent hover:bg-surface text-text',
  danger: 'bg-error text-white hover:bg-error/90',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-13 px-8 text-base gap-2.5',
  icon: 'h-10 w-10 p-0',
}

type MotionButtonProps = HTMLMotionProps<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const motionProps: MotionButtonProps = {
      whileHover: { scale: disabled || isLoading ? 1 : 1.02 },
      whileTap: { scale: disabled || isLoading ? 1 : 0.98 },
    }

    return (
      <motion.button
        ref={ref}
        {...motionProps}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className,
        )}
        disabled={disabled || isLoading}
        {...(props as MotionButtonProps)}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </motion.button>
    )
  },
)

Button.displayName = 'Button'
