import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Globe } from 'lucide-react';
import WordPressSiteCard, { WordPressSite } from './WordPressSiteCard';

export default function DashboardContent() {
    const [sites, setSites] = useState<WordPressSite[]>([]);

    useEffect(() => {
        // Load from localStorage
        const savedSites = localStorage.getItem('wordpress_sites');
        let loadedSites: WordPressSite[] = [];
        if (savedSites) {
            try {
                loadedSites = JSON.parse(savedSites);
            } catch (e) {
                console.error("Failed to parse sites", e);
            }
        }

        // Migration for old single-site storage
        const oldUrl = localStorage.getItem('wp_url');
        const oldUser = localStorage.getItem('wp_username');
        const oldPass = localStorage.getItem('wp_app_password');

        if (oldUrl && oldUser && oldPass) {
            // Check if already in array
            const exists = loadedSites.find(s => s.site_url === oldUrl && s.username === oldUser);
            if (!exists) {
                const newSite: WordPressSite = {
                    id: Date.now().toString(),
                    site_name: new URL(oldUrl).hostname,
                    site_url: oldUrl,
                    username: oldUser,
                    app_password: oldPass
                };
                loadedSites.push(newSite);
                // We don't delete old keys to stay safe? Or we should?
                // Let's keep them for now, but prioritize the array.
            }
        }

        setSites(loadedSites);
    }, []);

    const saveSites = (newSites: WordPressSite[]) => {
        setSites(newSites);
        localStorage.setItem('wordpress_sites', JSON.stringify(newSites));

        // Also sync the first site to the old keys for backward compatibility/simplicity
        if (newSites.length > 0) {
            localStorage.setItem('wp_url', newSites[0].site_url);
            localStorage.setItem('wp_username', newSites[0].username || '');
            localStorage.setItem('wp_app_password', newSites[0].app_password || '');
        }
    };

    const handleAddSite = (siteData: Omit<WordPressSite, 'id'>) => {
        const newSite: WordPressSite = {
            ...siteData,
            id: Date.now().toString()
        };
        saveSites([...sites, newSite]);
    };

    const handleDisconnect = (id: string) => {
        const newSites = sites.filter(s => s.id !== id);
        saveSites(newSites);
    };

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
                            onDisconnect={handleDisconnect}
                        />
                    </div>
                ))}

                {/* Add New Site Card */}
                <div className="relative z-10">
                    <WordPressSiteCard
                        isNew
                        onAdd={handleAddSite}
                    />
                </div>
            </div>
        </div>
    );
}
