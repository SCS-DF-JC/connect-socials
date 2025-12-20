import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant?: 'default' | 'gold' | 'success' | 'danger' | 'white';
    delay?: number;
}

const variants = {
    default: 'bg-[#1A1A1C] text-white border-none', // Dark grey card
    gold: 'bg-[#1A1A1C] text-white border-none', // Dark grey card with gold accents handled in content
    success: 'bg-[#1F2E25] text-white border-none', // Dark Green card
    danger: 'bg-[#2E1F1F] text-white border-none', // Dark Red card
    white: 'bg-[#1A1A1C] text-white border-none', // Renaming 'white' usage to dark for now to fix legacy
};

const iconVariants = {
    default: 'text-gray-400 bg-white/5',
    gold: 'text-[#F59E0B] bg-[#F59E0B]/10', // Gold icon
    success: 'text-[#10B981] bg-[#10B981]/20', // Green icon on green card
    danger: 'text-[#EF4444] bg-[#EF4444]/20', // Red icon on red card
    white: 'text-gray-400 bg-white/5',
};

export function StatCard({ title, value, icon: Icon, trend, variant = 'default', delay = 0 }: StatCardProps) {
    const isWhite = variant === 'white';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
        >
            <Card className={cn('overflow-hidden border-none transition-all duration-300', variants[variant])}>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className={cn("text-xs font-medium", isWhite ? "text-gray-500" : "text-gray-400")}>
                                {title}
                            </p>
                            <div className="flex items-baseline gap-2">
                                <h2 className={cn("text-3xl font-bold tracking-tight",
                                    variant === 'gold' ? "text-yellow-500" :
                                        variant === 'success' ? "text-green-500" :
                                            variant === 'danger' ? "text-red-500" :
                                                isWhite ? "text-white" : "text-white"
                                )}>
                                    {value}
                                </h2>
                                {trend && (
                                    <span className={cn("text-xs font-medium", trend.isPositive ? "text-green-500" : "text-red-500")}>
                                        {trend.isPositive ? "+" : "-"}{trend.value}%
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={cn("p-2.5 rounded-xl transition-colors duration-300", iconVariants[variant])}>
                            <Icon className="w-5 h-5" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
