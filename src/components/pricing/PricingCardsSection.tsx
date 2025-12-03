import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Zap, Building2, Sparkles, MessageSquare, Loader2 } from "lucide-react";

export interface Plan {
  name: string;
  description: string;
  monthlyPrice?: number;
  annualPrice?: number;
  features: string[];
  color: "gold" | "premium" | "standard";
  popular?: boolean;
  contactSales?: boolean;
  cta: string;
}

interface PricingCardsSectionProps {
  plans: Plan[];
  isAnnual: boolean;
  loadingPlan: string | null;
  hasPlan: (planName: string) => boolean;
  onSubscribe: (planName: string) => void;
}

export default function PricingCardsSection({
  plans,
  isAnnual,
  loadingPlan,
  hasPlan,
  onSubscribe,
}: PricingCardsSectionProps): JSX.Element {
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const gridRef = useRef<HTMLDivElement | null>(null);

  const iconMap: Record<string, React.ElementType> = {
    Starter: Zap,
    Growth: Building2,
    Enterprise: Sparkles,
  };

  const moveHighlightToIndex = (index: number) => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll<HTMLDivElement>("[data-plan-card]");
    const card = cards[index];
    if (!card) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const x = cardRect.left - gridRect.left;
    const y = cardRect.top - gridRect.top;

    setHighlightStyle({
      opacity: 1,
      transform: `translate(${x}px, ${y}px)`,
      width: `${cardRect.width}px`,
      height: `${cardRect.height}px`,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => moveHighlightToIndex(activeIndex), 100);

    const handleResize = () => moveHighlightToIndex(activeIndex);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-80 w-[70rem] rounded-full bg-gradient-to-b from-[#18120A] via-transparent to-transparent opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div
          className="absolute rounded-[2rem] pointer-events-none transition-all duration-300 ease-out"
          style={{
            background:
              "radial-gradient(circle at top, rgba(225, 195, 122, 0.25), rgba(26, 26, 28, 0.8))",
            boxShadow: "0 0 60px rgba(225, 195, 122, 0.4)",
            backdropFilter: "blur(12px)",
            zIndex: 0,
            ...highlightStyle,
          }}
        />

        <div ref={gridRef} className="relative z-10 grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const isActive = index === activeIndex;
            const Icon = iconMap[plan.name] || Zap;

            return (
              <motion.div
                key={plan.name}
                data-plan-card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`relative rounded-[2rem] border px-7 py-8 sm:px-8 sm:py-9 flex flex-col transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-[#E1C37A] bg-gradient-to-b from-[#1A1A1C] via-[#151516] to-[#101011] scale-[1.02] -translate-y-1"
                    : "border-[#3B3C3E] bg-gradient-to-b from-[#1A1A1C]/80 via-[#151516]/80 to-[#101011]/80 opacity-90 hover:opacity-100 hover:-translate-y-1"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 rounded-full gold-gradient text-xs font-semibold text-[#1A1A1C] shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center ${
                    plan.color === "gold"
                      ? "gold-gradient"
                      : plan.color === "premium"
                      ? "bg-gradient-to-br from-[#E1C37A] via-[#D6D7D8] to-[#E1C37A]"
                      : "metallic-gradient"
                  }`}
                >
                  <Icon className="w-7 h-7 text-[#1A1A1C]" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-[#A9AAAC] mb-6">{plan.description}</p>

                <div className="mb-8">
                  {plan.monthlyPrice ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-[#5B5C60]">/month</span>
                      </div>
                      {isAnnual && plan.annualPrice && (
                        <p className="text-xs text-[#E1C37A] mt-1 uppercase tracking-wider">
                          Billed annually (${plan.annualPrice * 12}/year)
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-white">Custom</span>
                  )}
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.color === "gold" || plan.color === "premium"
                            ? "bg-[#1D170C]"
                            : "bg-[#2A2A2C]"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            plan.color === "gold" || plan.color === "premium"
                              ? "text-[#E1C37A]"
                              : "text-[#D6D7D8]"
                          }`}
                        />
                      </div>
                      <span className="text-sm text-[#D6D7D8]">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  {hasPlan(plan.name) ? (
                    <Link
                      to="/account"
                      className={`w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                        isActive ? "btn-gold" : "btn-outline hover:bg-[#3B3C3E]"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      Current Plan
                    </Link>
                  ) : plan.contactSales ? (
                    <Link
                      to="/contact"
                      className="w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 btn-outline hover:border-[#E1C37A] hover:text-[#E1C37A]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {plan.cta}
                    </Link>
                  ) : (
                    <button
                      onClick={() => onSubscribe(plan.name)}
                      disabled={loadingPlan === plan.name}
                      className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        isActive
                          ? "btn-gold"
                          : "bg-[#2A2112] text-[#E1C37A] hover:bg-[#E1C37A] hover:text-[#1A1A1C]"
                      } disabled:opacity-50`}
                    >
                      {loadingPlan === plan.name ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        plan.cta
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
