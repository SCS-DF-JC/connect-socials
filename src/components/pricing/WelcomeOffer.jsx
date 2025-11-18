import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WelcomeOffer({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenOffer = localStorage.getItem('hasSeenWelcomeOffer');
    if (!hasSeenOffer) {
      setTimeout(() => setIsVisible(true), 1000);
      localStorage.setItem('hasSeenWelcomeOffer', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-3xl p-1 shadow-2xl max-w-lg mx-4 animate-in zoom-in duration-500">
        <div className="bg-white rounded-3xl p-8">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 Welcome Offer!
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Get special discounts on your first 2 months:
            </p>

            <div className="space-y-3 mb-8">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-blue-900">🩵 Light Plan: 5% OFF</p>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                <p className="font-semibold text-purple-900">💜 Moderate Plan: 10% OFF</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-green-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900">💎 Heavy Plan: 15% OFF</p>
              </div>
            </div>

            <p className="text-red-600 font-semibold mb-4">
              ⏰ Limited time offer - Only 1 hour!
            </p>

            <Button
              onClick={handleClose}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-lg"
            >
              View Plans Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}