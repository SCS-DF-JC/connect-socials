// src/pages/base44/Contact.tsx

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, CheckCircle, Mail, Clock, MapPin, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    message: "",
    budget: "",
    timeline: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendMessageMutation = useMutation({
    mutationFn: async (data) => {
      const payload = {
        name: data.name,
        company: data.businessName,
        email: data.email,
        message: data.message,
        budget: data.budget,
        timeline: data.timeline,
        source: "contact_page",
      };

      const res = await fetch(
        "https://scs-ltd.app.n8n.cloud/webhook/lead-capture",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed");

      return json;
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({
        name: "",
        businessName: "",
        email: "",
        message: "",
        budget: "",
        timeline: "",
      });
      setTimeout(() => setIsSubmitted(false), 8000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@smartcontentsolutions.co.uk",
      description: "We respond within 24 hours",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon - Fri: 9am - 5pm GMT",
      description: "Weekend replies go out Monday",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "United Kingdom",
      description: "Serving clients worldwide",
    },
  ];

  return (
    <div className="min-h-screen">

      {/* MAIN CONTACT FORM SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">

          {/* FORM */}
          <div>
            <Card className="shadow-xl border-none">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex gap-3 items-center">
                  <MessageSquare className="text-blue-600" />
                  Contact Us
                </h2>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
                    <CheckCircle className="text-green-600" />
                    <p className="text-green-800 font-semibold">Your message has been sent!</p>
                  </div>
                )}

                {sendMessageMutation.isError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-semibold">Error sending message. Try again.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div>
                    <Label>Your Name *</Label>
                    <Input
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Business Name *</Label>
                    <Input
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Email *</Label>
                    <Input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Message *</Label>
                    <Textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Budget</Label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full p-3 border rounded-md"
                    >
                      <option value="">Select Budget</option>
                      <option value="<500">Less than £500</option>
                      <option value="500-1500">£500 – £1500</option>
                      <option value="1500-5000">£1500 – £5000</option>
                      <option value="5000+">£5000+</option>
                    </select>
                  </div>

                  <div>
                    <Label>Timeline</Label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full p-3 border rounded-md"
                    >
                      <option value="">Timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="1-2 weeks">1–2 weeks</option>
                      <option value="1 month">1 month</option>
                    </select>
                  </div>

                  <Button className="w-full py-6" disabled={sendMessageMutation.isPending}>
                    {sendMessageMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>

                </form>
              </CardContent>
            </Card>
          </div>

          {/* CONTACT INFO COLUMN */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <Card key={i} className="p-6 flex gap-4 items-center">
                <info.icon className="w-10 h-10 text-blue-600" />
                <div>
                  <h3 className="font-bold">{info.title}</h3>
                  <p>{info.content}</p>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
