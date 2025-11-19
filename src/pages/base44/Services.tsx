import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Share2,
  Calendar,
  Mail,
  Globe,
  BarChart3,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: FileText,
      title: "AI Blog Automation",
      description:
        "Automatically generate optimized blog posts tailored to your brand voice. Our AI learns your style, industry, and audience to create engaging content that ranks.",
      features: [
        "SEO-optimized content",
        "Custom brand voice training",
        "2-4 posts per week",
        "Keyword research included",
        "Multi-topic coverage",
      ],
    },
    {
      icon: Share2,
      title: "Social Media Scheduling",
      description:
        "Consistent posts created and published across multiple platforms. Never miss a posting schedule with our intelligent content calendar.",
      features: [
        "Multi-platform posting",
        "Optimal timing automation",
        "Hashtag optimization",
        "Image and caption generation",
        "Platform-specific formatting",
      ],
    },
    {
      icon: Calendar,
      title: "Content Strategy & Planning",
      description:
        "Let AI plan and distribute your monthly content calendar. We analyze trends, audience behavior, and your business goals to create a strategic roadmap.",
      features: [
        "Monthly content calendars",
        "Trend analysis",
        "Audience insights",
        "Campaign planning",
        "Performance tracking",
      ],
    },
    {
      icon: Mail,
      title: "Email Content Automation",
      description:
        "Professional newsletters written and scheduled automatically. Keep your audience engaged with valuable content delivered on schedule.",
      features: [
        "Newsletter creation",
        "Subject line optimization",
        "Personalization tags",
        "A/B testing support",
        "Automated scheduling",
      ],
    },
    {
      icon: Globe,
      title: "Website Development",
      description:
        "Custom websites built to showcase your business and integrate with your content automation systems. Modern, responsive, and conversion-focused.",
      features: [
        "Responsive design",
        "SEO foundation",
        "Content management",
        "Lead capture forms",
        "Analytics integration",
      ],
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description:
        "Track performance with AI-powered insights. Understand what content works and optimize your strategy with data-backed recommendations.",
      features: [
        "Performance dashboards",
        "Content ROI tracking",
        "Engagement metrics",
        "Competitor analysis",
        "Growth recommendations",
      ],
      badge: "Coming Soon",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Discovery Call",
      description:
        "We learn about your business, audience, and content goals to create a tailored automation strategy.",
    },
    {
      number: "02",
      title: "Brand Voice Training",
      description:
        "Our AI learns your unique voice, style, and messaging to ensure authentic content that represents your brand.",
    },
    {
      number: "03",
      title: "System Setup",
      description:
        "We configure your automation systems, content calendars, and publishing schedules based on your preferences.",
    },
    {
      number: "04",
      title: "Launch & Optimize",
      description:
        "Your content automation goes live. We monitor performance and continuously optimize for better results.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Comprehensive Automation Solutions
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What We <span className="gradient-text">Automate</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            End-to-end content solutions powered by AI. From planning to
            publishing, we handle everything so you can focus on growing your
            business.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-none relative overflow-hidden"
              >
                {service.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs font-semibold rounded-full">
                      {service.badge}
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Four simple steps to automated content success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-5xl font-bold gradient-text mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Seamless Integration with Your Workflow
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our automation systems integrate smoothly with your existing tools
                and platforms. No complex setup, no technical headaches.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      Platform Integration
                    </span>
                    <span className="text-gray-600">
                      Works with WordPress, Shopify, social media platforms, and
                      more
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      Custom API Access
                    </span>
                    <span className="text-gray-600">
                      Connect to your existing systems and databases
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      Easy Management
                    </span>
                    <span className="text-gray-600">
                      Simple dashboard to review, edit, and approve content
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl p-8 text-white shadow-2xl">
                <MessageSquare className="w-16 h-16 mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-4">Always in Control</h3>
                <p className="text-blue-50 mb-6">
                  While we automate the heavy lifting, you maintain full control
                  over your content. Review, edit, or approve everything before it
                  goes live.
                </p>

                {/* FIXED LINK */}
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Schedule Demo
                  </Button>
                </Link>
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
            Choose a package that fits your needs or request a custom solution
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* FIXED LINK */}
            <Link to="/packages">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
              >
                View Packages
              </Button>
            </Link>

            {/* FIXED LINK */}
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-2 border-white text-lg px-8 py-6 group"
              >
                Get Custom Quote
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
