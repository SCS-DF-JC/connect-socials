import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useSubscription } from "@/components/subscription/useSubscription";

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, isLoaded } = useUser();
  const { refreshUser } = useSubscription(); // Need to refresh context after update
  const navigate = useNavigate();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Wait until user is loaded. If no session ID, just show success static state.
    if (!isLoaded) return;

    if (!sessionId) {
      setStatus("success");
      return;
    }

    if (!user) {
      // Not signed in? redirect to login
      return;
    }

    const syncRole = async () => {
      try {
        console.log("Syncing role for session:", sessionId);
        const res = await fetch("/api/sync-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            userId: user.id
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to confirm payment");
        }

        console.log("Role synced successfully!");
        await refreshUser(); // Update the global subscription context
        setStatus("success");
      } catch (err: any) {
        console.error("Sync failed:", err);
        setErrorMessage(err.message);
        setStatus("error");
      }
    };

    syncRole();
  }, [sessionId, isLoaded, user, refreshUser]);

  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-3xl border border-[#2A2A2C] bg-[#111113] px-8 py-10 shadow-xl text-center">

        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-[#E1C37A] animate-spin mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Activating Access...</h1>
            <p className="text-[#A9AAAC]">Please wait while we confirm your payment.</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Activation Issue</h1>
            <p className="text-[#A9AAAC] mb-6">{errorMessage || "We couldn't confirm the payment automatically."}</p>
            <p className="text-sm text-[#5B5C60] mb-6">Don't worry, if you were charged, our support can help you.</p>
            <Link to="/contact" className="btn-outline px-6 py-3 rounded-xl">Contact Support</Link>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F1510]">
              <CheckCircle2 className="h-10 w-10 text-[#4ade80]" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
              You're In! Access Granted.
            </h1>

            <p className="text-sm md:text-base text-[#A9AAAC] mb-6">
              Your <strong>Early Access Plan</strong> is now active.
              You have full access to the WordPress Automation Engine.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/apps/wordpress-seo")}
                className="inline-flex items-center justify-center rounded-xl px-6 h-11 text-sm font-semibold btn-gold gap-2"
              >
                Go to WordPress Tool
              </button>

              <Link
                to="/account"
                className="inline-flex items-center justify-center rounded-xl px-6 h-11 text-sm font-semibold border border-[#3B3C3E] text-[#D6D7D8] bg-transparent hover:bg-[#1F1F22] transition-colors"
              >
                View Account
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
