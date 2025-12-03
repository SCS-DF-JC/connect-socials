import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Sparkles,
  ArrowRight,
  Eye,
  Zap,
  Share2,
  Globe,
  Mail,
  FileText,
  BarChart3,
  Users,
  TrendingUp,
  Link2,
  Star,
  Clock,
  Activity,
  Bot,
  Database,
  Target,
  Languages,
  Calendar,
  Megaphone,
  Shield,
  Play,
  Check,
  Crown,
} from "lucide-react";

export default function DashboardPreview() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 21);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const coreTools = [
    { icon: Share2, name: "Social Media Post Automation", whisper: "Posts write themselves. Schedules fill up overnight.", status: "12 posts queued" },
    { icon: Globe, name: "WordPress SEO Optimisation", whisper: "Every article ranks. Every meta tag optimized.", status: "Score: 98/100" },
    { icon: Mail, name: "AI Email Marketing Engine", whisper: "Subject lines that get opened. Copy that converts.", status: "47% open rate" },
    { icon: FileText, name: "Blog & SEO Content Engine", whisper: "Feed it keywords. Get back articles that rank.", status: "Generating..." },
    { icon: BarChart3, name: "AI Ads Analytics Tool", whisper: "See what's burning money. See what's printing it.", status: "3.2x ROAS" },
    { icon: Users, name: "Lead Capture & CRM Automation", whisper: "Leads flow in. Get tagged. Get nurtured. Automatically.", status: "892 captured" },
    { icon: TrendingUp, name: "Performance Reports", whisper: "Weekly insights. No spreadsheets. Just answers.", status: "Report ready" },
    { icon: Link2, name: "Backlink Outreach Automation", whisper: "AI pitches. Links land. Domain authority climbs.", status: "234 acquired" },
    { icon: Star, name: "Review Generation Manager", whisper: "Happy customers leave reviews. On autopilot.", status: "4.9 rating" },
    { icon: Clock, name: "Client Onboarding Automation", whisper: "New clients get welcomed. Zero manual work.", status: "2 min setup" },
    { icon: Activity, name: "Competitor Monitoring & Alerts", whisper: "Know when they move. Before they know you know.", status: "12 tracked" },
  ];

  const corporateTools = [
    { icon: BarChart3, name: "MMM Analytics Edge", whisper: "Marketing mix modeling that actually predicts.", status: "Forecasting..." },
    { icon: Database, name: "CRM Integration Suite", whisper: "Listrak. Attentive. Your entire stack. Connected.", status: "Syncing" },
    { icon: Star, name: "Review Syndication", whisper: "Bazaarvoice integration. Reviews everywhere.", status: "Distributing" },
    { icon: Sparkles, name: "Website Personalisation", whisper: "Dynamic Yield powered.", status: "Adapting" },
    { icon: Bot, name: "AI Chatbot & Analysis", whisper: "Custom AI trained on your brand.", status: "Online 24/7" },
    { icon: Target, name: "PPC Management Suite", whisper: "Google Ads control panel.", status: "Optimizing" },
    { icon: Languages, name: "Multi-Language Engine", whisper: "42 native languages.", status: "42 languages" },
    { icon: Calendar, name: "Advanced Social Scheduling", whisper: "Multi-brand scheduling.", status: "Scheduled" },
    { icon: Eye, name: "Site Optimisation", whisper: "Heatmap analytics.", status: "Analyzing" },
    { icon: Megaphone, name: "Paid Social Command", whisper: "All paid media channels.", status: "Live" },
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "CMO, TechScale", quote: "I cancelled 7 tool subscriptions the week I got access.", avatar: "SC" },
    { name: "Marcus Webb", role: "Founder, GrowthHQ", quote: "My team of 3 now outproduces agencies with 30 people.", avatar: "MW" },
    { name: "Lisa Park", role: "Marketing Director", quote: "The ROI hit in the first month. Everything else is profit.", avatar: "LP" },
  ];

  const unlockBenefits = [
    "Every automation unlocked instantly",
    "Unlimited content generation",
    "Real-time analytics dashboard",
    "Priority AI processing",
    "Dedicated success manager",
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#1A1A1C] overflow-hidden">

      {/* HERO */}
      <section className="relative py-20 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-[#1A1A1C] border border-[#E1C37A]/30 flex items-center justify-center">
            <Lock className="w-10 h-10 text-[#E1C37A]" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          You can see it.
          <span className="block gold-text">You just can't use it. Yet.</span>
        </h1>

        <p className="text-xl text-[#A9AAAC] max-w-2xl mx-auto mb-10">
          Every tool below is already running for someone else.
        </p>

        <div className="flex gap-4 justify-center">
          <Link to="/pricing" className="btn-gold px-8 py-4 rounded-full flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Unlock Everything
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link to="/pricing" className="btn-outline px-8 py-4 rounded-full">
            See Pricing
          </Link>
        </div>
      </section>

      {/* CORE TOOLS */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <h3 className="text-xl font-semibold text-white mb-6">Core Automation Suite</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreTools.map((tool, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredTool(`core-${index}`)}
              onMouseLeave={() => setHoveredTool(null)}
              className="relative glass-card p-5 rounded-2xl"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl metallic-gradient flex items-center justify-center">
                  <tool.icon className="w-5 h-5 text-[#1A1A1C]" />
                </div>
                <div>
                  <h4 className="font-medium">{tool.name}</h4>
                  <p className="text-xs text-[#5B5C60] italic">"{tool.whisper}"</p>
                </div>
              </div>

              <AnimatePresence>
                {hoveredTool === `core-${index}` && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-2xl"
                  >
                    <span className="text-sm text-[#E1C37A] flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Locked
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="glass-card-gold p-8 rounded-2xl max-w-md text-center">
              <h3 className="text-xl font-bold mb-4">Unlock the Dashboard</h3>
              <p className="text-[#A9AAAC] mb-6">
                Subscribe to access all 21 automation tools.
              </p>
              <Link to="/pricing" className="btn-gold w-full py-3 rounded-xl block">
                View Pricing
              </Link>
              <button onClick={() => setShowModal(false)} className="btn-outline w-full mt-3 py-3 rounded-xl">
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
