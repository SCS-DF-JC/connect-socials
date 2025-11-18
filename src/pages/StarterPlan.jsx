import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
// import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowRight, Sparkles, FileText, Calendar, BarChart3, Mail, Loader2 } from "lucide-react";

export default function StarterPlan() {
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
        package_name: "Starter",
        package_price: 49,
        payment_status: "pending",
        subscription_status: "inactive",
      };
      
      const orderResult = await base44.entities.Order.create(orderData);
      
      const emailResult = await base44.integrations.Core.SendEmail({
        from_name: "Smart Content Solutions Website",
        to: "support@smartcontentsolutions.co.uk",
        subject: `New Starter Plan Order from ${data.customer_name}`,
        body: `New Starter Plan order received!\n\nPackage: Starter Plan (£49/month)\n\nCustomer Details:\nName: ${data.customer_name}\nBusiness: ${data.business_name}\nEmail: ${data.customer_email}\n\nAdditional Notes:\n${data.notes || 'None'}\n\nPlease contact the customer within 24 hours to complete the setup.`
      });
      
      return { orderResult, emailResult };
    },
    onSuccess: () => {
      setTimeout(() => {
        setShowForm(false);
        setTimeout(() => {
          setIsSubmitted(true);
        }, 300);
      }, 1000);
      setFormData({ customer_name: "", business_name: "", customer_email: "", notes: "" });
    },
  });

  const handleSubmit = (e) => {
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
      title: "2 AI-Generated Blog Posts per Week",
      description: "Professionally written, SEO-optimized content tailored to your brand voice and industry keywords"
    },
    {
      icon: Calendar,
      title: "Monthly Content Calendar",
      description: "Automatically created based on your business goals, seasonal trends, and audience interests"
    },
    {
      icon: BarChart3,
      title: "Automatic Website Posting",
      description: "Content published directly to your website with optimized headlines, tags, and summaries for SEO"
    },
    {
      icon: Mail,
      title: "Monthly Performance Summary",
      description: "Detailed report delivered to your inbox showing content performance and engagement metrics"
    },
  ];

  const includedItems = [
    "AI-optimized headlines and meta descriptions",
    "Keyword research and SEO optimization",
    "Custom brand voice training",
    "Automatic posting to your website",
    "Email support for setup and adjustments",
    "No long-term contracts",
    "Cancel anytime"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Perfect for Small Businesses
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Starter Plan
            </h1>
            <p className="text-2xl text-gray-600 mb-4">
              Smart Content Automation for Small Businesses
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Perfect for small businesses that want to start automating their online 
              presence quickly and affordably
            </p>

            <div className="inline-flex items-baseline gap-2 mb-8">
              <span className="text-6xl font-bold gradient-text">£49</span>
              <span className="text-2xl text-gray-600">/month</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-xl px-12 py-8 group"
              >
                Get Started with Starter Plan
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              7-day trial period • No setup fees • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What's Included
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to automate your content creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
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

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Perfect For
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Small business owners and local companies who want to maintain a consistent 
            blog presence without hiring a content team
          </p>

          <Card className="text-left shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      Local Service Businesses
                    </h4>
                    <p className="text-gray-600">
                      Tradespeople, consultants, and service providers who need consistent online content
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      Startups & Solo Entrepreneurs
                    </h4>
                    <p className="text-gray-600">
                      Business owners who need to establish credibility without spending hours on content
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      E-commerce Stores
                    </h4>
                    <p className="text-gray-600">
                      Online retailers looking to improve SEO and drive organic traffic
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section ref={formRef} className="py-20 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
              You've selected the <span className="font-bold gradient-text">Starter Plan (£49 / month)</span>
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
                        className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-xl py-8 group"
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