import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Sparkles, Zap } from "lucide-react";
import CountdownTimer from "../components/pricing/CountdownTimer";
import WelcomeOffer from "../components/pricing/WelcomeOffer";

export default function Packages() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [discounts, setDiscounts] = useState({
    light: true,
    moderate: true,
    heavy: true,
  });

  const handleTimerExpire = (plan) => {
    setDiscounts((prev) => ({ ...prev, [plan]: false }));
  };

  const packages = [
    {
      id: "light",
      name: "Light Plan",
      emoji: "🩵",
      price: 29.99,
      yearlyPrice: 287.90,
      discount: 5,
      description: "Perfect for light content needs",
      gradient: "from-blue-400 to-cyan-400",
      features: [
        "Access to Social Media Posting Tool",
        "Up to 10 posts per month",
        "AI Caption Assistant",
        "Email Support",
        "Basic Analytics Overview",
      ],
    },
    {
      id: "moderate",
      name: "Moderate Plan",
      emoji: "💜",
      price: 59.99,
      yearlyPrice: 575.90,
      discount: 10,
      description: "For regular business users",
      gradient: "from-purple-500 to-pink-500",
      popular: true,
      features: [
        "Everything in Light Plan",
        "Up to 30 posts per month",
        "Multi-platform Scheduling",
        "Email Campaign Automation",
        "Advanced Analytics Dashboard",
        "Priority Email + Chat Support",
      ],
    },
    {
      id: "heavy",
      name: "Heavy Plan",
      emoji: "💎",
      price: 99.99,
      yearlyPrice: 1019.90,
      discount: 15,
      description: "For agencies & power users",
      gradient: "from-blue-500 to-green-500",
      features: [
        "Everything in Moderate Plan",
        "Unlimited posts per month",
        "Custom scheduling frequencies",
        "All integrations (Buffer, Zapier, Analytics)",
        "Dedicated Account Manager",
        "Phone & Chat Priority Support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <WelcomeOffer onClose={() => setShowWelcome(false)} />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Flexible Pricing Options
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose the plan that
            <br />
            <span className="gradient-text">fits your workflow</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From light to full automation, scale your content systems effortlessly.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => {
              const hasDiscount = discounts[pkg.id];
              const discountedPrice = hasDiscount
                ? pkg.price * (1 - pkg.discount / 100)
                : pkg.price;
              const discountedYearlyPrice = hasDiscount
                ? pkg.yearlyPrice * (1 - pkg.discount / 100)
                : pkg.yearlyPrice;

              return (
                <Card
                  key={index}
                  className={`relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in-50 slide-in-from-bottom-4 ${
                    pkg.popular
                      ? "border-2 border-purple-500 shadow-xl scale-105 lg:scale-110"
                      : "border-none"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
                        <Zap className="w-4 h-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {hasDiscount && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <span className="text-white font-bold text-sm">
                          -{pkg.discount}%
                        </span>
                      </div>
                    </div>
                  )}

                  <CardHeader className={`text-center p-8 pb-6 bg-gradient-to-r ${pkg.gradient} text-white rounded-t-xl`}>
                    <div className="text-5xl mb-4">{pkg.emoji}</div>
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-white/90">{pkg.description}</p>
                  </CardHeader>

                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      {hasDiscount && (
                        <div className="text-gray-400 line-through text-xl mb-2">
                          £{pkg.price.toFixed(2)}
                        </div>
                      )}
                      <div className="mb-2">
                        <span className="text-5xl font-bold gradient-text">
                          £{discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-gray-600 text-lg">/month</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        or £{discountedYearlyPrice.toFixed(2)}/year
                        <span className="text-green-600 font-semibold ml-1">
                          (Save £{((discountedPrice * 12) - discountedYearlyPrice).toFixed(2)})
                        </span>
                      </div>

                      {hasDiscount && (
                        <CountdownTimer
                          planName={pkg.id}
                          onExpire={() => handleTimerExpire(pkg.id)}
                        />
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`${createPageUrl("StripeCheckout")}?plan=${pkg.id}&billing=monthly${hasDiscount ? `&discount=${pkg.discount}` : ''}`}
                      className="block"
                    >
                      <Button
                        className={`w-full text-lg py-6 group ${
                          pkg.popular
                            ? `bg-gradient-to-r ${pkg.gradient} hover:opacity-90 text-white shadow-lg`
                            : ""
                        }`}
                        variant={pkg.popular ? "default" : "outline"}
                      >
                        Start {pkg.name}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link
                      to={`${createPageUrl("StripeCheckout")}?plan=${pkg.id}&billing=yearly${hasDiscount ? `&discount=${pkg.discount}` : ''}`}
                      className="block mt-3"
                    >
                      <Button
                        variant="ghost"
                        className="w-full text-sm text-gray-600 hover:text-gray-900"
                      >
                        Or pay yearly and save more
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All plans include 7-day money-back guarantee
            </p>
            <p className="text-sm text-gray-500">
              No setup fees • Cancel anytime • Secure payment
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and digital wallets through Stripe's secure payment system.",
              },
              {
                q: "Is there a long-term contract?",
                a: "No contracts! All plans are month-to-month or yearly. Cancel anytime with no penalties.",
              },
              {
                q: "Can I use discount codes?",
                a: "Yes! You can apply discount codes at checkout. We regularly offer promotions and special deals.",
              },
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            Our team is here to help you find the perfect plan
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}