// src/pages/base44/Packages.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, Zap, ArrowRight } from "lucide-react";

type Package = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  yearlyPrice: number;
  discount: number;
  description: string;
  gradient: string;
  popular?: boolean;
  features: string[];
};

const packagesData: Package[] = [
  {
    id: "light",
    name: "Light Plan",
    emoji: "🩵",
    price: 29.99,
    yearlyPrice: 287.9,
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
    yearlyPrice: 575.9,
    discount: 10,
    popular: true,
    description: "For regular business users",
    gradient: "from-purple-500 to-pink-500",
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
    yearlyPrice: 1019.9,
    discount: 15,
    description: "For agencies & power users",
    gradient: "from-blue-500 to-green-500",
    features: [
      "Everything in Moderate Plan",
      "Unlimited posts per month",
      "Custom scheduling frequencies",
      "All integrations",
      "Dedicated Account Manager",
      "Phone & Chat Priority Support",
    ],
  },
];

export default function Packages(): JSX.Element {
  const [discounts, setDiscounts] = useState({
    light: true,
    moderate: true,
    heavy: true,
  });

  const handleStart = (pkgId: string) => {
    // Simulate navigating to a checkout — real integration belongs in backend
    alert(`Starting checkout (frontend demo) for ${pkgId}`);
    // For real checkout: navigate(`/checkout?plan=${pkgId}`)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-6">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Flexible Pricing Options
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Choose the plan that fits your workflow
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From light to full automation, scale your content systems effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packagesData.map((pkg) => {
            const hasDiscount = discounts[pkg.id as keyof typeof discounts];
            const discountedPrice = hasDiscount
              ? pkg.price * (1 - pkg.discount / 100)
              : pkg.price;
            const discountedYearlyPrice = hasDiscount
              ? pkg.yearlyPrice * (1 - pkg.discount / 100)
              : pkg.yearlyPrice;

            return (
              <Card
                key={pkg.id}
                className={`relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  pkg.popular ? "border-2 border-purple-500 shadow-xl scale-105" : "border-none"
                }`}
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
                      <span className="text-white font-bold text-sm">-{pkg.discount}%</span>
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
                    {hasDiscount && <div className="text-gray-400 line-through text-xl mb-2">£{pkg.price.toFixed(2)}</div>}
                    <div className="mb-2">
                      <span className="text-5xl font-bold gradient-text">£{discountedPrice.toFixed(2)}</span>
                      <span className="text-gray-600 text-lg">/month</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      or £{discountedYearlyPrice.toFixed(2)}/year
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                        <span className="text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2">
                    <Button className="w-full text-lg py-6 bg-gradient-to-r from-blue-500 to-green-500 text-white" onClick={() => handleStart(pkg.id)}>
                      Start {pkg.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="ghost" className="w-full text-sm text-gray-600 hover:text-gray-900" onClick={() => alert("Yearly checkout simulated (frontend).")}>
                      Or pay yearly and save more
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">All plans include 7-day money-back guarantee</p>
          <p className="text-sm text-gray-500">No setup fees • Cancel anytime • Secure payment</p>
        </div>
      </div>
    </div>
  );
}
