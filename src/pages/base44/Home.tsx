import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Clock,
  TrendingUp,
  Zap,
  CheckCircle,
  Sparkles,
  BarChart3,
  Calendar,
  Mail,
  FileText,
  Share2,
} from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const trustPoints = [
    { icon: Clock, text: "Save Time" },
    { icon: TrendingUp, text: "Boost Consistency" },
    { icon: Zap, text: "Automate Growth" },
  ];

  const services = [
    {
      icon: FileText,
      title: "AI Blog Automation",
      description:
        "Automatically generate optimized blog posts tailored to your brand voice",
    },
    {
      icon: Share2,
      title: "Social Media Scheduling",
      description:
        "Consistent posts created and published across multiple platforms",
    },
    {
      icon: Calendar,
      title: "Content Planning",
      description: "Let AI plan and distribute your monthly content calendar",
    },
    {
      icon: Mail,
      title: "Email Automation",
      description:
        "Professional newsletters written and scheduled automatically",
    },
  ];

  const benefits = [
    "Save 5+ hours every week",
    "Maintain consistent brand voice",
    "Boost online visibility by 40%",
    "Never miss a posting deadline",
    "Data-backed content strategy",
    "Scale without hiring",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">

        <div
          className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              AI-Powered Content Automation
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Scale Your Business With
            <br />
            <span className="gradient-text">Smart AI-Powered</span>
            <br />
            Content Systems
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Automation that saves hours, increases visibility, and keeps your
            brand consistent — without the stress.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/packages">
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-6 text-lg hover:scale-105 transition">
                View Packages
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link to="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-6 text-lg hover:scale-105 transition">
                Book Strategy Call
              </Button>
            </Link>
          </div>

          {/* Trust Points */}
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-600">
            {trustPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-2 hover:scale-110 transition-transform"
              >
                <point.icon className="w-5 h-5 text-blue-600" />
                <span>{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Built for Busy Business Owners
            </h2>
            <p className="text-xl text-gray-600">
              We help businesses save time and grow their digital presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Small Business Owners",
              "Freelancers & Trades",
              "Marketing Agencies",
              "Coaches & Consultants",
            ].map((audience, index) => (
              <Card key={index} className="hover:-translate-y-1 transition">
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
                  <h3 className="font-semibold text-lg text-gray-900">
                    {audience}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Placeholder */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            See It In Action
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            (Demo component removed – add your own preview here)
          </p>

          <Link to="/packages">
            <Button variant="outline" className="border-2 hover:border-blue-500">
              Start Creating Your Content
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">What We Automate</h2>
            <p className="text-xl text-gray-600">
              Comprehensive content solutions powered by AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:-translate-y-2 transition">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" className="group border-2">
                See All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Why Smart Content Solutions?
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Smart Content Solutions bridges the gap between human creativity
              and automation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Link to="/about" className="inline-block mt-8">
              <Button variant="outline">
                Learn More About Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl p-8 text-white shadow-xl">
              <BarChart3 className="w-16 h-16 mb-6" />

              <h3 className="text-2xl font-bold mb-4">Results You Can Measure</h3>

              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">5+</span>
                  <span>hours saved weekly</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">40%</span>
                  <span>content output increase</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">100%</span>
                  <span>consistent brand voice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Automate Your Content?
          </h2>

          <p className="text-xl mb-8">
            Join businesses saving time and scaling their content with AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages">
              <Button className="bg-white text-blue-600 px-8 py-6 text-lg hover:bg-gray-200">
                Start Automating Today
              </Button>
            </Link>

            <Link to="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 px-8 py-6 text-lg">
                Book Strategy Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
