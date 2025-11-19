import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, ArrowRight } from "lucide-react";

export default function LockedToolOverlay({ toolName, requiredPlan = "moderate" }) {
  const getPlanName = () => {
    if (requiredPlan === "heavy") return "Heavy";
    if (requiredPlan === "moderate") return "Moderate";
    return "Light";
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Card className="max-w-md shadow-2xl border-2 border-blue-200">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {toolName} Tool Locked
          </h3>

          <p className="text-gray-600 mb-6">
            Upgrade to the{" "}
            <span className="font-bold gradient-text">{getPlanName()} Plan</span>{" "}
            or higher to unlock this powerful automation tool.
          </p>

          {/* 🚀 Frontend Only: Simple Link to Packages Page */}
          <Link to="/packages">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white group"
            >
              Upgrade Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
