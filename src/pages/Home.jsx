
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContentDemo from "../components/ContentDemo";
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
      description: "Automatically generate optimized blog posts tailored to your brand voice",
    },
    {
      icon: Share2,
      title: "Social Media Scheduling",
      description: "Consistent posts created and published across multiple platforms",
    },
    {
      icon: Calendar,
      title: "Content Planning",
      description: "Let AI plan and distribute your monthly content calendar",
    },
    {
      icon: Mail,
      title: "Email Automation",
      description: "Professional newsletters written and scheduled automatically",
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
      {/* Hero Section with Enhanced Animations */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" 
               style={{ animationDuration: "3s" }} />
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" 
               style={{ animationDuration: "4s", animationDelay: "1s" }} />
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" 
               style={{ animationDuration: "5s", animationDelay: "2s" }} />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping" 
               style={{ animationDuration: "3s" }} />
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-green-500 rounded-full animate-ping" 
               style={{ animationDuration: "4s", animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" 
               style={{ animationDuration: "3.5s", animationDelay: "0.5s" }} />
        </div>

        <div
          className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-gray-700">
              AI-Powered Content Automation
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Scale Your Business With
            <br />
            <span className="gradient-text">Smart AI-Powered</span>
            <br />
            Content Systems
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Automation that saves hours, increases visibility, and keeps your brand consistent, without the stress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Link to={createPageUrl("Packages")}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-lg px-8 py-6 group transform hover:scale-105 transition-all duration-300"
              >
                View Packages
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl("Contact")}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-2 border-transparent text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300"
              >
                Book Strategy Call
              </Button>
            </Link>
          </div>

          {/* Trust Points */}
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-600 animate-in fade-in duration-1000 delay-500">
            {trustPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2 transform hover:scale-110 transition-transform duration-300">
                <point.icon className="w-5 h-5 text-blue-600" />
                <span>{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for Busy Business Owners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
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

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience how our AI generates high-quality content in seconds
            </p>
          </div>

          <ContentDemo />

          <div className="text-center mt-8">
            <Link to={createPageUrl("Packages")}>
              <Button size="lg" variant="outline" className="border-2 hover:border-blue-500 group">
                Start Creating Your Content
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What We Automate
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive content solutions powered by AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-none"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to={createPageUrl("Services")}>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 hover:border-blue-500"
              >
                See All Services
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Smart Content Solutions?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Smart Content Solutions bridges the gap between human creativity
                and automation. We help business owners and marketing teams save
                hours each week by using smart content automation systems that
                deliver consistent, engaging material — without sacrificing quality.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to={createPageUrl("About")} className="inline-block mt-8">
                <Button variant="outline" className="group">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <BarChart3 className="w-16 h-16 mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-4">
                  Results You Can Measure
                </h3>
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">5+</span>
                    <span className="text-xl">hours saved weekly</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">40%</span>
                    <span className="text-xl">content output increase</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">100%</span>
                    <span className="text-xl">consistent brand voice</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Automate Your Content?
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            Join businesses that are saving time and scaling their content with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Packages")}>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300"
              >
                Start Automating Today
              </Button>
            </Link>
            <Link to={createPageUrl("Contact")}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-2 border-white text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300"
              >
                Book Strategy Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
