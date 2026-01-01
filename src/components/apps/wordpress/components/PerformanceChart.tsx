import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import GlassCard from '../GlassCard';
import { SiteStats } from '../utils/wpApi';
import { subDays, format } from 'date-fns';

interface PerformanceChartProps {
    stats: SiteStats;
    isLoading: boolean;
}

export default function PerformanceChart({ stats, isLoading }: PerformanceChartProps) {
    const data = useMemo(() => {
        const days = 7;
        const chartData = [];
        for (let i = days - 1; i >= 0; i--) {
            const date = subDays(new Date(), i);
            const dateKey = format(date, 'yyyy-MM-dd');
            chartData.push({
                date: format(date, 'MMM dd'),
                posts: stats.postsByDate[dateKey] || 0
            });
        }
        return chartData;
    }, [stats]);

    return (
        <GlassCard className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#D6D7D8] font-semibold text-lg">Publishing Activity</h3>
                <select className="bg-[#1A1A1C] border border-[#333] text-xs text-[#A9AAAC] rounded-lg px-2 py-1 outline-none">
                    <option>Last 7 Days</option>
                </select>
            </div>

            <div className="flex-1 min-h-[200px] w-full">
                {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-[#E1C37A] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#5B5C60"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                                stroke="#5B5C60"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1A1A1C', borderColor: '#333', borderRadius: '8px' }}
                                itemStyle={{ color: '#E1C37A' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="posts"
                                stroke="#E1C37A"
                                strokeWidth={2}
                                dot={{ fill: '#E1C37A', strokeWidth: 0 }}
                                activeDot={{ r: 6, fill: '#E1C37A' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </GlassCard>
    );
}
