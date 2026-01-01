import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GoldButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: 'solid' | 'outline';
    className?: string;
    disabled?: boolean;
}

export default function GoldButton({ children, onClick, variant = 'solid', className = '', disabled = false, ...props }: GoldButtonProps) {
    const baseStyles = 'relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        solid: `
      bg-gradient-to-r from-[#E1C37A] to-[#B6934C]
      text-[#1A1A1C]
      hover:shadow-[0_0_30px_rgba(225,195,122,0.4)]
    `,
        outline: `
      bg-transparent
      border border-[#E1C37A]/50
      text-[#E1C37A]
      hover:bg-[#E1C37A]/10
      hover:border-[#E1C37A]
    `
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={onClick}
            disabled={disabled}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
}
