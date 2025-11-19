
import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  Send,
  MapPin,
  Loader2,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Removed: const [error, setError] = useState("");

  const sendMessageMutation = useMutation({
    mutationFn: async (data) => {
      // Save to database
      await base44.entities.ContactMessage.create({
        name: data.name,
        business_name: data.businessName,
        email: data.email,
        message: data.message,
        status: "new",
      });

      // Send email notification
      await base44.integrations.Core.SendEmail({
        from_name: "Smart Content Solutions Website",
        to: "support@smartcontentsolutions.co.uk",
        subject: `New Contact Message from ${data.name}`,
        body: `You've received a new message via the website contact form.

Name: ${data.name}
Email: ${data.email}
Business: ${data.businessName}

Message:
${data.message}

--------------------------------
Sent automatically from SmartContentSolutions.co.uk`,
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      // Removed: setError("");
      setFormData({ name: "", businessName: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 8000);
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      // Replaced with: The UI will now check sendMessageMutation.isError directly
      // setError("Failed to send message. Please try again or email us directly at support@smartcontentsolutions.co.uk");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Removed: setError("");
    sendMessageMutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@smartcontentsolutions.co.uk",
      description: "We typically respond within 24 hours",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Friday: 9am - 5pm GMT",
      description: "Weekend enquiries answered Monday",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "United Kingdom",
      description: "Serving businesses worldwide",
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Let's Build Your
            <br />
            <span className="gradient-text">Smart Content System</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to automate your content and scale your business? Get in touch
            and we'll create a custom solution for you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-xl border-none">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Send Us a Message
                    </h2>
                  </div>

                  {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-in fade-in duration-500">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-green-800 font-semibold">
                          ✅ Thank you! Your message has been sent.
                        </p>
                        <p className="text-green-700 text-sm">
                          Our support team will get back to you soon.
                        </p>
                      </div>
                    </div>
                  )}

                  {sendMessageMutation.isError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-semibold">
                        ⚠️ Something went wrong — please try again later.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 mb-2 block">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="h-12"
                        disabled={sendMessageMutation.isPending}
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="businessName"
                        className="text-gray-700 mb-2 block"
                      >
                        Business Name *
                      </Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Your Business Ltd"
                        className="h-12"
                        disabled={sendMessageMutation.isPending}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@yourbusiness.com"
                        className="h-12"
                        disabled={sendMessageMutation.isPending}
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="message"
                        className="text-gray-700 mb-2 block"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your content automation needs..."
                        rows={6}
                        className="resize-none"
                        disabled={sendMessageMutation.isPending}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={sendMessageMutation.isPending}
                      className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-lg py-6 group"
                    >
                      {sendMessageMutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Whether you're ready to start automating or just have questions,
                  we'd love to hear from you. Our team is here to help you build
                  the perfect content automation system.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="p-6 flex gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h3>
                        <p className="text-gray-900 font-medium mb-1">
                          {info.content}
                        </p>
                        <p className="text-sm text-gray-600">
                          {info.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-blue-500 to-green-500 border-none">
                <CardContent className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">
                    Prefer to Chat Directly?
                  </h3>
                  <p className="text-blue-50 mb-6">
                    For quick questions or immediate assistance, email us
                    directly and we'll respond as soon as possible.
                  </p>
                  <a
                    href="mailto:support@smartcontentsolutions.co.uk"
                    className="inline-flex items-center gap-2 text-white font-semibold hover:underline"
                  >
                    <Mail className="w-5 h-5" />
                    support@smartcontentsolutions.co.uk
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers before you reach out
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How quickly can we get started?",
                a: "Most clients are up and running within 3-5 business days after the initial consultation.",
              },
              {
                q: "Can I review content before it's published?",
                a: "Absolutely! You have full control and can review, edit, or approve all content before it goes live.",
              },
              {
                q: "What if I need to pause or cancel?",
                a: "No problem. All our packages are month-to-month with no long-term contracts. Cancel anytime.",
              },
              {
                q: "Do you offer custom solutions?",
                a: "Yes! Our Elite package is fully customizable. Contact us to discuss your specific needs.",
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
    </div>
  );
}
