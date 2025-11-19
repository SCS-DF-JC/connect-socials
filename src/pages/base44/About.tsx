import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Users,
  Lightbulb,
  Award,
  ArrowRight,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Zap,
      title: "Efficiency First",
      description:
        "We believe your time should be spent growing your business, not creating content manually",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description:
        "AI-powered doesn't mean impersonal. We ensure every piece maintains your brand voice",
    },
    {
      icon: Rocket,
      title: "Scalable Solutions",
      description:
        "From startups to established businesses, our systems grow with you",
    },
    {
      icon: Users,
      title: "Customer Success",
      description:
        "Your success is our success. We're here to support you every step of the way",
    },
  ];

  const stats = [
    { number: "500+", label: "Hours Saved Monthly" },
    { number: "50+", label: "Businesses Served" },
    { number: "10K+", label: "Content Pieces Created" },
    { number: "98%", label: "Client Satisfaction" },
  ];

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Built for Businesses
              <br />
              <span className="gradient-text">Ready to Scale with AI</span>
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Smart Content Solutions bridges the gap between human creativity and automation.
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-full">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800">
                Founded by marketing & automation specialists Jason & Dominik
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Our Mission</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Making Content Creation Effortless
            </h2>

            <p className="text-lg text-gray-600 mb-6">
              We understand the challenge of staying consistent online while running a business.
            </p>

            <p className="text-lg text-gray-600">
              Our AI learns your brand voice, your audience, and crafts content that works.
            </p>
          </div>

          <div className="relative">
            <div className="relative z-10 p-12 rounded-3xl bg-gradient-to-br from-blue-100 to-green-100">
              <Lightbulb className="w-20 h-20 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                The Problem We Solve
              </h3>

              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  10+ hours wasted weekly on content creation
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  Inconsistent posting hurts visibility
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  Hard to maintain brand voice across platforms
                </li>
              </ul>
            </div>

            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-40" />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all bg-white border-none">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>

                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Content?
          </h2>

          <p className="text-xl text-blue-50 mb-8">
            See how automation can scale your business
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            {/* FIX: No createPageUrl → normal router path */}
            <Link to="/packages">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6">
                View Our Packages
              </Button>
            </Link>

            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-6 group">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
