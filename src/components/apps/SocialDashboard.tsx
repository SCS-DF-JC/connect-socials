// ------------------------------------------------------
// SocialDashboard.tsx
// FULL BASE44-STYLE DASHBOARD (ALL SECTIONS)
// Uses ONLY user-uploaded components (legal)
// ------------------------------------------------------

import React from "react";
import { Calendar } from "lucide-react";

// === IMPORTS FROM USER-UPLOADED FILES ===
import StatsOverview from "./StatsOverview";
import DateFilter from "./DateFilter";
import PerformanceChart from "./PerformanceChart";
import PlatformBreakdown from "./PlatformBreakdown";
import RecentPosts from "./RecentPosts";
import AIInsights from "./AIInsights";

// === OPTIONAL: STUB DATA (replace with backend later) ===
const mockStats = {
  impressions: 0,
  engagements: 0,
  likes: 0,
  comments: 0,
  shares: 0,
  clicks: 0,
};

const mockPreviousStats = {
  impressions: 0,
  engagements: 0,
  likes: 0,
  comments: 0,
  shares: 0,
  clicks: 0,
};

const mockPlatformData = [
  { platform: "facebook", engagements: 0 },
  { platform: "instagram", engagements: 0 },
  { platform: "linkedin", engagements: 0 },
  { platform: "tiktok", engagements: 0 },
];

const mockPosts = [];

export default function SocialDashboard() {
  return (
    <div className="space-y-10">

      {/* =====================================================
           DASHBOARD HEADER
         ===================================================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#E1C37A] to-[#B6934C] rounded-xl flex items-center justify-center">
            <div className="text-black font-bold text-xl">📊</div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Dashboard</h2>
            <p className="text-sm text-[#A9AAAC]">
              Track your growth and performance across platforms.
            </p>
          </div>
        </div>

        {/* DATE FILTER — user uploaded file */}
        <DateFilter />
      </div>

      {/* =====================================================
           STATS ROW (user uploaded StatsOverview.jsx)
         ===================================================== */}
      <StatsOverview
        stats={mockStats}
        previousStats={mockPreviousStats}
        isLoading={false}
      />

      {/* =====================================================
           PERFORMANCE CHART + PLATFORM BREAKDOWN
         ===================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance chart (2/3 width) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#1C1C20]/80 border border-white/5 p-6">
          <PerformanceChart data={[]} isLoading={false} />
        </div>

        {/* Platform performance (1/3 width) */}
        <div className="rounded-2xl bg-[#1C1C20]/80 border border-white/5 p-6">
          <PlatformBreakdown data={mockPlatformData} isLoading={false} />
        </div>
      </div>

      {/* =====================================================
           AI INSIGHTS (user uploaded AIInsights.jsx)
         ===================================================== */}
      <AIInsights insights={[]} isLoading={false} />

      {/* =====================================================
           RECENT POSTS (user uploaded RecentPosts.jsx)
         ===================================================== */}
      <RecentPosts posts={mockPosts} isLoading={false} />

      {/* =====================================================
           CONNECTED ACCOUNTS (custom-built from your logic)
         ===================================================== */}
      <div className="rounded-2xl bg-[#1C1C20]/80 border border-white/5 p-8">
        <h3 className="text-xl font-semibold text-white mb-6">
          Connected Accounts
        </h3>

        {/* 3-column responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            { id: "facebook", name: "Facebook" },
            { id: "instagram", name: "Instagram" },
            { id: "linkedin", name: "LinkedIn" },
            { id: "tiktok", name: "TikTok" },
            { id: "youtube", name: "YouTube" },
            { id: "pinterest", name: "Pinterest" },
            { id: "reddit", name: "Reddit" },
            { id: "threads", name: "Threads" },
            { id: "bluesky", name: "Bluesky" },
          ].map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-[#18181B] border border-white/5 p-5 hover:bg-[#202023] transition-all duration-200 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#E1C37A]/15 flex items-center justify-center">
                  <span className="text-2xl">🔗</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{p.name}</p>
                  <p className="text-xs text-[#A9AAAC]">@connected_user</p>
                </div>
              </div>

              <button className="w-full py-2 rounded-xl bg-gradient-to-r from-[#E1C37A] to-[#B6934C] text-black font-semibold hover:shadow-[0_0_15px_rgba(225,195,122,0.5)] transition-all">
                Connect
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
