import React from 'react';
import GlassCard from '../GlassCard';
import { FileText, MessageSquare, Files, BarChart3, TrendingUp, Users } from 'lucide-react';
import { SiteStats } from '../utils/wpApi';

interface StatsOverviewProps {
    stats: SiteStats;
    isLoading: boolean;
}

export default function StatsOverview({ stats, isLoading }: StatsOverviewProps) {
    const items = [
        { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Comments', value: stats.totalComments, icon: MessageSquare, color: 'text-green-400', bg: 'bg-green-400/10' },
        { label: 'Total Pages', value: stats.totalPages, icon: Files, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        // Placeholders for data we can't easily fetch from standard API without plugins
        // using "0" as per "no fake data" rule, but maybe labeling them as N/A or hiding?
        // User requested "Impressions", "Engagements" etc. We'll map what we have and keep others as 0 for now.
        { label: 'Avg. Daily Posts', value: (Object.values(stats.postsByDate).reduce((a, b) => a + b, 0) / 7).toFixed(1), icon: BarChart3, color: 'text-[#E1C37A]', bg: 'bg-[#E1C37A]/10' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {items.map((item, i) => {
                const Icon = item.icon;
                return (
                    <GlassCard key={i} className="p-5 flex flex-col justify-between">
                        <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mb-3`}>
                            <Icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-[#D6D7D8]">
                                {isLoading ? '-' : item.value}
                            </h4>
                            <p className="text-xs text-[#A9AAAC] mt-1">{item.label}</p>
                        </div>
                    </GlassCard>
                );
            })}
        </div>
    );
}
