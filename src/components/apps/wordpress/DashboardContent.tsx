import React from 'react';
import { LayoutDashboard, Globe } from 'lucide-react';
import WordPressSiteCard, { WordPressSite } from './WordPressSiteCard';

interface DashboardContentProps {
    sites: WordPressSite[];
    onAddSite: (siteData: Omit<WordPressSite, 'id'>) => void;
    onRemoveSite: (id: string) => void;
}

export default function DashboardContent({ sites, onAddSite, onRemoveSite }: DashboardContentProps) {

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E1C37A] to-[#B6934C] flex items-center justify-center">
                        <LayoutDashboard className="w-6 h-6 text-[#1A1A1C]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[#D6D7D8]">Dashboard</h2>
                        <p className="text-[#A9AAAC] text-sm">Manage your WordPress sites</p>
                    </div>
                </div>
            </div>

            {/* WordPress Sites */}
            <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-[#E1C37A]" />
                <h3 className="text-lg font-semibold text-[#D6D7D8]">WordPress Sites</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#E1C37A]/10 text-[#E1C37A] text-sm">
                    {sites.length} connected
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sites.map((site) => (
                    <div key={site.id} className="relative z-10">
                        <WordPressSiteCard
                            site={site}
                            onDisconnect={onRemoveSite}
                        />
                    </div>
                ))}

                {/* Add New Site Card */}
                <div className="relative z-10">
                    <WordPressSiteCard
                        isNew
                        onAdd={onAddSite}
                    />
                </div>
            </div>
        </div>
    );
}
