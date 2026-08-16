import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-boutique-400',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-boutique-900 text-gold-100 hover:bg-boutique-800': variant === 'primary',
            'bg-gold-500 text-boutique-900 hover:bg-gold-600': variant === 'secondary',
            'border-2 border-boutique-900 text-boutique-900 hover:bg-boutique-900 hover:text-gold-100': variant === 'outline',
            'text-boutique-700 hover:text-boutique-900 hover:bg-boutique-100': variant === 'ghost',
          },
          {
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-6 py-3 text-sm uppercase tracking-wider': size === 'md',
            'px-10 py-4 text-base uppercase tracking-widest': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
