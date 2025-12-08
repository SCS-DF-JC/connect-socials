// ------------------------------------------------------
// DashboardStats.tsx
// A small reusable stats display row
// ------------------------------------------------------

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  change?: number; // positive or negative %
}

function StatCard({ label, value, change }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="rounded-2xl bg-[#1A1A1C]/80 border border-white/5 p-5 backdrop-blur-xl shadow-lg hover:shadow-[0_0_20px_rgba(225,195,122,0.2)] transition-all duration-200">
      <p className="text-sm text-[#A9AAAC] font-medium mb-1">{label}</p>

      <p className="text-2xl font-bold text-white">{value}</p>

      {change !== undefined && (
        <div
          className={`flex items-center gap-1 text-sm mt-2 ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}

          <span>{isPositive ? "+" : ""}{change}%</span>
        </div>
      )}
    </div>
  );
}

interface DashboardStatsProps {
  stats: {
    impressions: number;
    engagements: number;
    clicks: number;
    likes: number;
    comments: number;
  };
  previous?: {
    impressions: number;
    engagements: number;
    clicks: number;
    likes: number;
    comments: number;
  };
}

export default function DashboardStats({ stats, previous }: DashboardStatsProps) {
  const calcChange = (current: number, past: number) => {
    if (!past || past === 0) return 0;
    return Math.round(((current - past) / past) * 100);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      <StatCard
        label="Impressions"
        value={stats.impressions}
        change={previous ? calcChange(stats.impressions, previous.impressions) : undefined}
      />
      <StatCard
        label="Engagements"
        value={stats.engagements}
        change={previous ? calcChange(stats.engagements, previous.engagements) : undefined}
      />
      <StatCard
        label="Likes"
        value={stats.likes}
        change={previous ? calcChange(stats.likes, previous.likes) : undefined}
      />
      <StatCard
        label="Comments"
        value={stats.comments}
        change={previous ? calcChange(stats.comments, previous.comments) : undefined}
      />
      <StatCard
        label="Clicks"
        value={stats.clicks}
        change={previous ? calcChange(stats.clicks, previous.clicks) : undefined}
      />
    </div>
  );
}
