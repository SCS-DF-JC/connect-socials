import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import GoldButton from './GoldButton';
import { Check, Globe, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface WordPressSite {
    id: string;
    site_name: string;
    site_url: string;
    username?: string;
    app_password?: string;
}

interface WordPressSiteCardProps {
    site?: WordPressSite;
    onDisconnect?: (id: string) => void;
    isNew?: boolean;
    onAdd?: (site: Omit<WordPressSite, 'id'>) => void;
}

export default function WordPressSiteCard({ site, onDisconnect, isNew = false, onAdd }: WordPressSiteCardProps) {
    const [siteName, setSiteName] = useState('');
    const [siteUrl, setSiteUrl] = useState('');
    const [username, setUsername] = useState('');
    const [appPassword, setAppPassword] = useState('');

    if (isNew) {
        return (
            <GlassCard className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#E1C37A]/10"
                    >
                        <Globe className="w-6 h-6 text-[#E1C37A]" />
                    </div>
                </div>

                <h3 className="text-[#D6D7D8] font-semibold text-lg mb-4">Add WordPress Site</h3>

                <div className="space-y-3 mb-4">
                    <Input
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder="Site name"
                        className="bg-[#3B3C3E]/30 border-white/10 text-[#D6D7D8] placeholder:text-[#5B5C60] rounded-lg focus-visible:ring-[#E1C37A]"
                    />
                    <Input
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        placeholder="https://yoursite.com"
                        className="bg-[#3B3C3E]/30 border-white/10 text-[#D6D7D8] placeholder:text-[#5B5C60] rounded-lg focus-visible:ring-[#E1C37A]"
                    />
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="bg-[#3B3C3E]/30 border-white/10 text-[#D6D7D8] placeholder:text-[#5B5C60] rounded-lg focus-visible:ring-[#E1C37A]"
                    />
                    <Input
                        type="password"
                        value={appPassword}
                        onChange={(e) => setAppPassword(e.target.value)}
                        placeholder="App Password"
                        className="bg-[#3B3C3E]/30 border-white/10 text-[#D6D7D8] placeholder:text-[#5B5C60] rounded-lg focus-visible:ring-[#E1C37A]"
                    />
                </div>

                <GoldButton
                    onClick={() => {
                        if (siteUrl.trim() && siteName.trim() && username.trim() && appPassword.trim()) {
                            onAdd?.({ site_name: siteName, site_url: siteUrl, username, app_password: appPassword });
                            setSiteName('');
                            setSiteUrl('');
                            setUsername('');
                            setAppPassword('');
                        }
                    }}
                    disabled={!siteUrl.trim() || !siteName.trim() || !username.trim() || !appPassword.trim()}
                    className="w-full py-2 text-xs"
                >
                    Connect Site
                </GoldButton>
            </GlassCard>
        );
    }

    if (!site) return null;

    return (
        <GlassCard goldGlow className="p-6">
            <div className="flex items-start justify-between mb-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#E1C37A]/20"
                >
                    <Globe className="w-6 h-6 text-[#E1C37A]" />
                </div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-[#E1C37A] to-[#B6934C] flex items-center justify-center"
                >
                    <Check className="w-4 h-4 text-[#1A1A1C]" />
                </motion.div>
            </div>

            <h3 className="text-[#D6D7D8] font-semibold text-lg mb-1">
                {site.site_name || 'WordPress Site'}
            </h3>
            <p className="text-[#A9AAAC] text-sm mb-4 truncate">{site.site_url}</p>

            <GoldButton
                variant="outline"
                onClick={() => onDisconnect?.(site.id)}
                className="w-full py-2 text-xs flex items-center justify-center gap-2"
            >
                <Trash2 className="w-3 h-3" />
                Remove
            </GoldButton>
        </GlassCard>
    );
}
