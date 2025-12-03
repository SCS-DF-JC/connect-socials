import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Crown } from "lucide-react";

export default function CorporateTools() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState("");

  const handleUnlock = (toolName: string) => {
    setSelectedTool(toolName);
    setShowModal(true);
  };

  const tools = [
    "Enterprise Social Engine",
    "Advanced CRM Integrations",
    "Multi-Brand Publishing",
    "Predictive Analytics",
    "Customer Segmentation AI",
    "Omnichannel Automation",
    "Enterprise SEO Suite",
    "AI Personalization Engine",
    "Advanced Reporting",
    "Dedicated API Access",
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">

      {/* HERO */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E1C37A]/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#B6934C]/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-[#E1C37A]" />
          </div>

          <span className="text-sm uppercase tracking-widest text-[#A9AAAC]">
            Corporate Tools
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Enterprise-grade firepower.
          </h1>

          <p className="text-lg text-[#A9AAAC] max-w-2xl mx-auto">
            For serious operators who need serious results. These tools power
            multi-million dollar brands.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <span className="px-4 py-2 rounded-full text-sm bg-[#E1C37A]/10 text-[#E1C37A] border border-[#E1C37A]/20">
              10 Enterprise Tools
            </span>
            <span className="px-4 py-2 rounded-full text-sm bg-[#E1C37A]/10 text-[#E1C37A] border border-[#E1C37A]/20">
              Priority Support
            </span>
            <span className="px-4 py-2 rounded-full text-sm bg-[#E1C37A]/10 text-[#E1C37A] border border-[#E1C37A]/20">
              Dedicated Manager
            </span>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass-card-gold rounded-2xl p-6 text-center flex flex-col items-center justify-between glow-gold"
            >
              <div>
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl gold-gradient flex items-center justify-center">
                  <Crown className="w-6 h-6 text-[#1A1A1C]" />
                </div>
                <h4 className="font-semibold mb-2">{tool}</h4>
                <p className="text-sm text-[#A9AAAC]">
                  Enterprise AI automation tool.
                </p>
              </div>

              <button
                onClick={() => handleUnlock(tool)}
                className="mt-6 btn-outline px-6 py-3 rounded-full"
              >
                Unlock Tool
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-[#A9AAAC]">
              Core vs Corporate
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-2">
              What's the difference?
            </h2>
            <p className="text-[#A9AAAC]">
              Both tiers automate your marketing. Corporate just goes deeper.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold mb-4 silver-text">
                Core Tools
              </h3>
              <ul className="space-y-3">
                {[
                  "Perfect for growing businesses",
                  "Essential automation suite",
                  "Social, email, SEO, CRM basics",
                  "Weekly performance reports",
                  "Email support",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-[#A9AAAC]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D6D7D8]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#3B3C3E]">
                <span className="text-2xl font-bold text-white">$397</span>
                <span className="text-[#5B5C60] ml-2">/month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card-gold rounded-2xl p-8 glow-gold"
            >
              <h3 className="text-xl font-bold mb-4 gold-text">
                Corporate Tools
              </h3>
              <ul className="space-y-3">
                {[
                  "Built for enterprise operations",
                  "Full Core suite included",
                  "Enterprise CRM integrations",
                  "Advanced analytics & personalization",
                  "Dedicated success manager",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-[#D6D7D8]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E1C37A]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#E1C37A]/20">
                <span className="text-2xl font-bold text-white">$1,197</span>
                <span className="text-[#5B5C60] ml-2">/month</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E1C37A]/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Corporate Tools are built for:
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "E-commerce Brands",
                desc: "Scaling DTC operations across multiple channels and regions.",
              },
              {
                title: "Marketing Agencies",
                desc: "Managing 10+ clients without scaling headcount.",
              },
              {
                title: "Enterprise Teams",
                desc: "Replacing fragmented tools with one unified platform.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <h4 className="font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-[#A9AAAC]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card-gold rounded-3xl p-12 glow-gold">
            <Crown className="w-12 h-12 text-[#E1C37A] mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Ready for the big leagues?
            </h2>
            <p className="text-[#A9AAAC] mb-8 max-w-xl mx-auto">
              Corporate Tools unlock the same stack used by 8-figure brands.
              Your competition is already here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="btn-gold px-8 py-4 rounded-full flex items-center justify-center gap-2 font-semibold"
              >
                Get Corporate Access
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/contact"
                className="btn-outline px-8 py-4 rounded-full flex items-center justify-center gap-2"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="glass-card rounded-2xl p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold mb-4">
              Unlock {selectedTool}
            </h3>
            <p className="text-[#A9AAAC] mb-6">
              This tool is available on a Corporate plan.
            </p>

            <Link
              to="/pricing"
              className="btn-gold w-full py-3 rounded-xl block mb-3"
            >
              View Pricing
            </Link>

            <button
              onClick={() => setShowModal(false)}
              className="btn-outline w-full py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
