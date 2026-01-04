import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  CreditCard,
  LogOut,
  Sparkles,
  ArrowRight,
  Shield,
  Calendar,
  Settings,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export default function Account() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E1C37A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return null;
  }

  // Get user details from metadata
  const role = (user.publicMetadata?.role as string) || "user";
  const planName = (user.publicMetadata?.planName as string) || "Early Access Plan";
  const subscriptionStatus = (user.publicMetadata?.subscriptionStatus as string) || "active";
  const hasSubscription = role === "early_access" || role === "admin";
  const isActive = subscriptionStatus === "active" || subscriptionStatus === "trialing";
  const stripeCustomerId = user.publicMetadata?.stripeCustomerId;

  const handleManageSubscription = async () => {
    try {
      setLoadingPortal(true);
      setError(null);

      const res = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load portal");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* ✅ HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">
            Account Settings
          </h1>
          <p className="text-[#A9AAAC]">
            Manage your subscription and account details
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ✅ PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center">
                <User className="w-8 h-8 text-[#1A1A1C]" />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  {user.fullName}
                </h2>
                <p className="text-sm text-[#A9AAAC]">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
                <span className="inline-block mt-2 px-3 py-1 bg-[#3B3C3E] rounded-full text-xs text-[#E1C37A] capitalize border border-[#E1C37A]/20">
                  {role.replace("_", " ")}
                </span>
              </div>
            </div>

            <button
              onClick={() => signOut()}
              className="w-full btn-outline py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </motion.div>

          {/* ✅ SUBSCRIPTION DETAILS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Subscription
                </h3>
                <p className="text-sm text-[#A9AAAC]">
                  Your current plan and billing
                </p>
              </div>
            </div>

            {hasSubscription ? (
              // ✅ ACTIVE SUBSCRIPTION STATE
              <div className="space-y-6">
                <div className="bg-[#1A1A1C]/50 rounded-xl p-6 border border-[#3B3C3E]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-[#1A1A1C]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">
                          {planName}
                        </h4>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`flex items-center gap-1 ${isActive ? "text-green-400" : "text-yellow-400"}`}>
                            {isActive ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                            <span className="capitalize">{subscriptionStatus.replace("_", " ")}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm text-[#A9AAAC] border-t border-[#3B3C3E] pt-4 mt-4">
                    <div>
                      <p className="mb-1 text-[#5B5C60]">Next billing date</p>
                      <p className="text-white">Managed in Stripe Portal</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[#5B5C60]">Plan Amount</p>
                      <p className="text-white">Managed in Stripe Portal</p>
                    </div>
                  </div>
                </div>

                {role === "admin" ? (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-blue-400 text-sm">
                    You have full Admin access. No subscription management needed.
                  </div>
                ) : (
                  <div>
                    {stripeCustomerId ? (
                      <Button
                        onClick={handleManageSubscription}
                        disabled={loadingPortal}
                        className="btn-outline w-full sm:w-auto hover:bg-[#3B3C3E] hover:text-white hover:border-[#E1C37A]/50 transition-all border-[#3B3C3E]"
                      >
                        {loadingPortal ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Loading Portal...
                          </>
                        ) : (
                          <>
                            <Settings className="w-4 h-4 mr-2" />
                            Manage Subscription & Billing
                          </>
                        )}
                      </Button>
                    ) : (
                      <div className="text-amber-400 text-sm bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        Info: Subscription managed externally or manual role assignment.
                      </div>
                    )}
                    {error && (
                      <p className="text-red-400 text-sm mt-2">{error}</p>
                    )}
                    <p className="text-xs text-[#5B5C60] mt-3">
                      Click above to cancel subscription, update payment method, or view invoice history securely via Stripe.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // ✅ NO SUBSCRIPTION STATE
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#3B3C3E]/50 flex items-center justify-center mb-4">
                  <CreditCard className="w-8 h-8 text-[#5B5C60]" />
                </div>

                <h4 className="font-semibold text-white mb-2">
                  No Active Subscription
                </h4>

                <p className="text-sm text-[#A9AAAC] mb-6">
                  Subscribe to unlock powerful AI automation tools
                </p>

                <Link
                  to="/pricing"
                  className="btn-gold px-6 py-3 rounded-xl inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  View Plans
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* ✅ SECURITY NOTE */}
        <div className="mt-10 flex items-center gap-3 text-sm text-[#5B5C60]">
          <Shield className="w-4 h-4" />
          <span>
            Payments are securely processed. We never store card details.
          </span>
        </div>

        {/* ✅ PLANNER SECTION - ADMIN ONLY */}
        {user?.publicMetadata?.role === "admin" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 glass-card rounded-2xl p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#1A1A1C]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Planner</h3>
                <p className="text-sm text-[#A9AAAC]">
                  Access the admin planner dashboard
                </p>
              </div>
            </div>

            <Link
              to="/planner"
              className="btn-gold px-6 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
            >
              Go <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
