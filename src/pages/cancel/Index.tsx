import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const CancelPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-3xl border border-[#2A2A2C] bg-[#111113] px-8 py-10 shadow-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#261112]">
          <XCircle className="h-10 w-10 text-[#f87171]" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Checkout cancelled
        </h1>

        <p className="text-sm md:text-base text-[#A9AAAC] mb-6">
          Your subscription checkout was cancelled before completion. No charges
          have been made and your trial has not started.
        </p>

        <p className="text-xs text-[#7A7B7F] mb-6">
          If this was a mistake or you’d like to try again, you can return to
          the pricing page and restart the 3-day free trial for the SCS Early
          Access Plan.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center rounded-xl px-6 h-11 text-sm font-semibold btn-gold"
          >
            Back to pricing
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl px-6 h-11 text-sm font-semibold border border-[#3B3C3E] text-[#D6D7D8] bg-transparent hover:bg-[#1F1F22] transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
