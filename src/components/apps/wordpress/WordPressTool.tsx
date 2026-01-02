import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import CreatePostContent from './CreatePostContent';
import DashboardContent from './DashboardContent';
import AnimatedBackground from './AnimatedBackground';
import { WordPressSite } from './WordPressSiteCard';
import { toast } from "sonner";

export default function WordPressTool() {
    const [activeTab, setActiveTab] = useState('create');
    const [sites, setSites] = useState<WordPressSite[]>([]);

    useEffect(() => {
        // Load from localStorage
        const savedSites = localStorage.getItem('wordpress_sites');
        let loadedSites: WordPressSite[] = [];
        let hasMigration = false;

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
                hasMigration = true;
            }
        }

        setSites(loadedSites);

        // If we migrated data, save it back to LS immediately so it persists properly
        if (hasMigration) {
            localStorage.setItem('wordpress_sites', JSON.stringify(loadedSites));
        }
    }, []);

    const saveSites = (newSites: WordPressSite[]) => {
        setSites(newSites);
        localStorage.setItem('wordpress_sites', JSON.stringify(newSites));

        // Also sync the first site to the old keys for backward compatibility
        if (newSites.length > 0) {
            localStorage.setItem('wp_url', newSites[0].site_url);
            localStorage.setItem('wp_username', newSites[0].username || '');
            localStorage.setItem('wp_app_password', newSites[0].app_password || '');
        } else {
            localStorage.removeItem('wp_url');
            localStorage.removeItem('wp_username');
            localStorage.removeItem('wp_app_password');
        }
    };

    const handleAddSite = (siteData: Omit<WordPressSite, 'id'>) => {
        const newSite: WordPressSite = {
            ...siteData,
            id: Date.now().toString()
        };
        saveSites([...sites, newSite]);
        toast.success("WordPress site connected successfully!");
    };

    const handleDisconnect = (id: string) => {
        const newSites = sites.filter(s => s.id !== id);
        saveSites(newSites);
        toast.success("WordPress site disconnected.");
    };

    return (
        <div className="min-h-screen bg-[#1A1A1C] overflow-hidden relative font-sans text-slate-200">
            {/* Animated Background */}
            <AnimatedBackground />

            <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main Content Container */}
            <div className="pt-24 pb-12 px-6 relative z-10 h-full">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl bg-[#3B3C3E]/20 backdrop-blur-[10px] border border-white/5 overflow-hidden min-h-[600px]"
                    >
                        <AnimatePresence mode="wait">
                            {activeTab === 'create' ? (
                                <motion.div
                                    key="create"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="p-6 md:p-8"
                                >
                                    <CreatePostContent sites={sites} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="dashboard"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                    className="p-6 md:p-8"
                                >
                                    <DashboardContent
                                        sites={sites}
                                        onAddSite={handleAddSite}
                                        onRemoveSite={handleDisconnect}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
