import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const sendMessageMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const payload = {
        name: data.name,
        company: data.company,
        email: data.email,
        message: data.message,
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
      setSubmitted(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 8000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessageMutation.mutate(formData);
  };

  const benefits = [
    "15-minute strategy call",
    "Live dashboard demo",
    "Custom pricing options",
    "No obligation",
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">

      {/* HERO */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#E1C37A]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#D6D7D8]/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's talk.</h1>
          <p className="text-xl text-[#A9AAAC]">
            Book a call or send a message. We respond within 24 hours.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">Book a Strategy Call</h3>
              <p className="text-[#A9AAAC] mb-8">
                15 minutes. No pitch. Just answers. See exactly how Smart Content
                Solutions can work for your business.
              </p>

              <div className="space-y-4 mb-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-[#1A1A1C]" />
                    </div>
                    <span className="text-[#D6D7D8]">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CALENDAR */}
              <div className="glass-card-gold rounded-2xl p-8 mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#1A1A1C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Schedule Now</h4>
                    <p className="text-sm text-[#A9AAAC]">
                      Pick a time that works for you
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {["9:00 AM", "11:00 AM", "2:00 PM", "3:30 PM", "4:00 PM", "5:30 PM"].map(
                    (time, index) => (
                      <button
                        key={index}
                        className="py-3 px-4 rounded-xl bg-[#1A1A1C] border border-[#3B3C3E] hover:border-[#E1C37A] transition-colors text-sm"
                      >
                        {time}
                      </button>
                    )
                  )}
                </div>

                <button className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  Book Your Call
                </button>
              </div>

              {/* CONTACT DETAILS */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-[#E1C37A]" />
                  <p className="text-[#D6D7D8]">hello@smartcontentsolutions.io</p>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-[#E1C37A]" />
                  <p className="text-[#D6D7D8]">+1 (555) 123-4567</p>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-[#E1C37A]" />
                  <p className="text-[#D6D7D8]">London, UK (Remote-first)</p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-[#E1C37A]" />
                  <h3 className="text-xl font-semibold">Send a Message</h3>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-[#1A1A1C]" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                    <p className="text-[#A9AAAC]">
                      We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                      <Label>Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label>Company</Label>
                      <Input
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label>Message</Label>
                      <Textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Button
                      className="btn-gold w-full py-4 rounded-xl"
                      disabled={sendMessageMutation.isPending}
                    >
                      {sendMessageMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
