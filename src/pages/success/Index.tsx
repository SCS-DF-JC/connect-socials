import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-3xl border border-[#2A2A2C] bg-[#111113] px-8 py-10 shadow-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F1510]">
          <CheckCircle2 className="h-10 w-10 text-[#4ade80]" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Trial started successfully
        </h1>

        <p className="text-sm md:text-base text-[#A9AAAC] mb-6">
          Your 3-day free trial for the{" "}
          <span className="font-semibold text-[#E1C37A]">
            SCS Early Access Plan
          </span>{" "}
          has started. You’ll only be charged £20/month after your trial ends,
          unless you cancel before then.
        </p>

        <p className="text-xs text-[#7A7B7F] mb-6">
          We’re now activating your WordPress Automation Engine access. This can
          take up to a few minutes. You’ll receive an email with details as soon
          as everything is ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl px-6 h-11 text-sm font-semibold border border-[#3B3C3E] text-[#D6D7D8] bg-transparent hover:bg-[#1F1F22] transition-colors"
          >
            Back to home
          </Link>

          <Link
            to="/pricing"
            className="inline-flex items-center justify-center rounded-xl px-6 h-11 text-sm font-semibold btn-gold"
          >
            Go to dashboard / pricing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
