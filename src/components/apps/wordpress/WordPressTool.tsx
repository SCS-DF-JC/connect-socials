import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import CreatePostContent from './CreatePostContent';
import DashboardContent from './DashboardContent';
import AnimatedBackground from './AnimatedBackground';

export default function WordPressTool() {
    const [activeTab, setActiveTab] = useState('create');
    // 'create' or 'dashboard'

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
                                    <CreatePostContent />
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
                                    <DashboardContent />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
