import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Share2 } from "lucide-react";

export default function CoreTools() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState("");

  const handleUnlock = (toolName: string) => {
    setSelectedTool(toolName);
    setShowModal(true);
  };

  const tools = [
    "AI Blog Generator",
    "Social Media Engine",
    "Email Campaign Builder",
    "SEO Optimizer",
    "Content Planner",
    "Hashtag Generator",
    "Post Scheduler",
    "Analytics Dashboard",
    "Brand Voice Trainer",
    "Repurposing Engine",
    "Trend Scanner",
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">

      {/* HERO */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D6D7D8]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-[#A9AAAC]/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-sm uppercase tracking-widest text-[#A9AAAC]">
            Core Tools
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            The essentials. Automated.
          </h1>

          <p className="text-lg text-[#A9AAAC] max-w-2xl mx-auto">
            Everything you need to run a lean, mean content machine. Perfect for
            growing businesses ready to scale.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <span className="px-4 py-2 rounded-full text-sm bg-[#D6D7D8]/10 text-[#D6D7D8] border border-[#D6D7D8]/20">
              11 Powerful Tools
            </span>
            <span className="px-4 py-2 rounded-full text-sm bg-[#D6D7D8]/10 text-[#D6D7D8] border border-[#D6D7D8]/20">
              Unlimited Usage
            </span>
            <span className="px-4 py-2 rounded-full text-sm bg-[#D6D7D8]/10 text-[#D6D7D8] border border-[#D6D7D8]/20">
              24/7 Automation
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
              className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-between"
            >
              <div>
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl gold-gradient flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-[#1A1A1C]" />
                </div>
                <h4 className="font-semibold mb-2">{tool}</h4>
                <p className="text-sm text-[#A9AAAC]">
                  Fully automated AI content tool.
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

      {/* PREVIEW SECTION */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#D6D7D8] text-sm font-medium uppercase tracking-wider">
                  Tool Preview
                </span>

                <h3 className="text-2xl md:text-3xl font-bold mt-4 mb-4">
                  See the Social Media Engine in action
                </h3>

                <p className="text-[#A9AAAC] mb-6">
                  Watch how a single click generates a week's worth of posts,
                  perfectly tailored to each platform.
                </p>

                <button
                  onClick={() => handleUnlock("Social Media Engine Demo")}
                  className="btn-gold px-6 py-3 rounded-full flex items-center gap-2"
                >
                  Watch Demo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <div className="aspect-video rounded-2xl bg-[#1A1A1C] locked-blur">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full metallic-gradient flex items-center justify-center">
                      <Share2 className="w-8 h-8 text-[#1A1A1C]" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1C]/50 rounded-2xl">
                  <button
                    onClick={() => handleUnlock("Demo Video")}
                    className="btn-outline px-6 py-3 rounded-full"
                  >
                    Unlock to Watch
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to automate the basics?
          </h2>

          <p className="text-[#A9AAAC] mb-8 max-w-xl mx-auto">
            Core Tools start at $397/month. That's less than a junior marketer's
            weekly salary.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="btn-gold px-8 py-4 rounded-full flex items-center justify-center gap-2 font-semibold"
            >
              View Pricing
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/corporate-tools"
              className="btn-outline px-8 py-4 rounded-full flex items-center justify-center gap-2"
            >
              See Corporate Tools
            </Link>
          </div>
        </div>
      </section>

      {/* SIMPLE MODAL (LOCAL REPLACEMENT) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="glass-card rounded-2xl p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold mb-4">Unlock {selectedTool}</h3>
            <p className="text-[#A9AAAC] mb-6">
              This tool is available on a paid plan.
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
