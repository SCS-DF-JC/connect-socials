
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowRight, Star, FileText, Share2, BarChart3, Zap, Target, Award, Loader2 } from "lucide-react";

export default function ProPlan() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    business_name: "",
    customer_email: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const submitOrderMutation = useMutation({
    mutationFn: async (data) => {
      const orderData = {
        customer_name: data.customer_name,
        business_name: data.business_name,
        customer_email: data.customer_email,
        notes: data.notes,
        package_name: "Pro",
        package_price: 99,
        payment_status: "pending",
        subscription_status: "inactive",
      };
      
      const orderResult = await base44.entities.Order.create(orderData);
      
      const emailResult = await base44.integrations.Core.SendEmail({
        from_name: "Smart Content Solutions Website",
        to: "support@smartcontentsolutions.co.uk",
        subject: `New Pro Plan Order from ${data.customer_name}`,
        body: `New Pro Plan order received!

          Package: Pro Plan (£99/month)
          
          Customer Details:
          Name: ${data.customer_name}
          Business: ${data.business_name}
          Email: ${data.customer_email}
          
          Additional Notes:
          ${data.notes || 'None'}
          
          Please contact the customer within 24 hours to complete the setup.`
      });
      
      return { orderResult, emailResult };
    },
    onSuccess: () => {
      setTimeout(() => {
        setShowForm(false);
        setTimeout(() => {
          setIsSubmitted(true);
        }, 300); // Small delay to allow fade out to start
      }, 1000); // Delay for form fade-out transition
      setFormData({ customer_name: "", business_name: "", customer_email: "", notes: "" });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitOrderMutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const features = [
    {
      icon: FileText,
      title: "4 AI-Generated Blog Posts per Week",
      description: "Fully optimized, high-quality content that maintains your unique brand tone and drives engagement"
    },
    {
      icon: Share2,
      title: "Social Media Content Automation",
      description: "Automated posts for Facebook, LinkedIn, and Instagram with platform-specific optimization"
    },
    {
      icon: Zap,
      title: "Branded AI Prompts & Templates",
      description: "Custom-trained AI models that perfectly match your brand voice and messaging style"
    },
    {
      icon: BarChart3,
      title: "Monthly Content Analytics Report",
      description: "Detailed insights on engagement, reach, and performance across all your content channels"
    },
    {
      icon: Target,
      title: "Automated Keyword Optimization",
      description: "SEO tagging and keyword integration to boost your search engine rankings"
    },
    {
      icon: Award,
      title: "Priority Support & Monthly Review",
      description: "Dedicated support team and monthly optimization sessions to maximize your results"
    },
  ];

  const includedItems = [
    "4 blog posts per week (16+ per month)",
    "Social media automation (3 platforms)",
    "Custom brand voice training",
    "Weekly performance reports",
    "Priority email support",
    "Content calendar planning",
    "SEO optimization & keyword research",
    "Monthly strategy review call",
    "Content topic suggestions",
    "Performance analytics dashboard",
    "Cancel anytime - no contracts"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full mb-6">
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Most Popular Choice
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Pro Plan
            </h1>
            <p className="text-2xl text-gray-600 mb-4">
              Full-Scale Content & Social Automation
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              For growing businesses ready to automate more channels, publish more often, 
              and receive complete AI content management
            </p>

            <div className="inline-flex items-baseline gap-2 mb-8">
              <span className="text-6xl font-bold gradient-text">£99</span>
              <span className="text-2xl text-gray-600">/month</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-xl px-12 py-8 group"
              >
                Get Started with Pro Plan
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              7-day trial period • No setup fees • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What's Included
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for complete content automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-none shadow-xl">
            <CardHeader className="text-center pb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Complete Package Includes
              </h3>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparison with Starter */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Pro Over Starter?
            </h2>
            <p className="text-xl text-gray-600">
              More content, more platforms, more results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-xl">
              <CardHeader className="bg-gray-50 border-b">
                <h3 className="text-xl font-bold text-gray-900">Starter Plan</h3>
                <p className="text-gray-600">£49/month</p>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600">✓ 2 blog posts/week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600">✓ Basic scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600">✓ Monthly reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-600">✓ Email support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-2 border-blue-500">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Pro Plan</h3>
                    <p className="text-gray-600">£99/month</p>
                  </div>
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">4 blog posts/week (2x more)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Social media automation (3 platforms)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Weekly analytics + monthly reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Priority support + strategy calls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Custom brand voice training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Advanced SEO optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Perfect For
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Established businesses, agencies, or marketing teams that need regular 
            high-quality content across multiple platforms
          </p>

          <Card className="text-left shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      Growing Businesses
                    </h4>
                    <p className="text-gray-600">
                      Companies scaling their marketing efforts and need consistent multi-channel presence
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      Marketing Agencies
                    </h4>
                    <p className="text-gray-600">
                      Agencies managing multiple clients who need reliable, scalable content production
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      E-commerce & Online Brands
                    </h4>
                    <p className="text-gray-600">
                      Online businesses that need to maintain active social presence and SEO content
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Order Form Section */}
      <section ref={formRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
              You've selected the <span className="font-bold gradient-text">Pro Plan (£99 / month)</span>
            </p>
            <p className="text-lg text-gray-600">
              Fill in your details below and we'll contact you within 24 hours to complete setup.
            </p>
          </div>

          <div className="relative min-h-[600px]">
            {showForm && !isSubmitted && (
              <div className={`transition-all duration-500 ${submitOrderMutation.isSuccess ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <Card className="border-none shadow-2xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="customer_name" className="mb-2 block">
                            Name *
                          </Label>
                          <Input
                            id="customer_name"
                            name="customer_name"
                            type="text"
                            required
                            value={formData.customer_name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="h-12"
                            disabled={submitOrderMutation.isPending}
                          />
                        </div>

                        <div>
                          <Label htmlFor="business_name" className="mb-2 block">
                            Business Name *
                          </Label>
                          <Input
                            id="business_name"
                            name="business_name"
                            type="text"
                            required
                            value={formData.business_name}
                            onChange={handleChange}
                            placeholder="Your Business Ltd"
                            className="h-12"
                            disabled={submitOrderMutation.isPending}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="customer_email" className="mb-2 block">
                          Email Address *
                        </Label>
                        <Input
                          id="customer_email"
                          name="customer_email"
                          type="email"
                          required
                          value={formData.customer_email}
                          onChange={handleChange}
                          placeholder="john@yourbusiness.com"
                          className="h-12"
                          disabled={submitOrderMutation.isPending}
                        />
                      </div>

                      <div>
                        <Label htmlFor="notes" className="mb-2 block">
                          Anything specific you'd like automated? (Optional)
                        </Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Tell us about any specific content needs..."
                          rows={4}
                          className="resize-none"
                          disabled={submitOrderMutation.isPending}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitOrderMutation.isPending}
                        className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-xl py-8 group relative overflow-hidden"
                      >
                        {submitOrderMutation.isPending ? (
                          <span className="flex items-center justify-center">
                            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                            Processing...
                          </span>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Confirm & Get Started
                          </>
                        )}
                      </Button>

                      <p className="text-center text-sm text-gray-500">
                        By submitting, you agree to our terms of service. We'll contact you to finalize payment details.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {isSubmitted && (
              <div className="absolute inset-0 flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Card className="border-none shadow-2xl bg-gradient-to-br from-white via-blue-50 to-green-50 max-w-2xl w-full">
                  <CardContent className="p-12 text-center">
                    <div className="relative mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-500 shadow-lg">
                        <CheckCircle className="w-14 h-14 text-white animate-in zoom-in duration-700 delay-200" />
                      </div>
                      <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto animate-ping opacity-20" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
                      Thank you for choosing Smart Content Solutions!
                    </h3>
                    
                    <p className="text-lg text-gray-600 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-400">
                      Our team will contact you within 24 hours to finalize your setup and payment details.
                    </p>

                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-500">
                      <Link to={createPageUrl("Home")}>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-6 group"
                        >
                          Back to Home
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      
                      <p className="text-sm text-gray-500">
                        Check your email for confirmation details
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {!isSubmitted && (
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Have questions? <Link to={createPageUrl("Contact")} className="text-blue-600 font-semibold hover:underline">Contact us</Link> or view <Link to={createPageUrl("Packages")} className="text-blue-600 font-semibold hover:underline">other packages</Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
