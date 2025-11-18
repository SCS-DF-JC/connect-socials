
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
// import { base44 } from "@/api/base44Client";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import LockedToolOverlay from "../components/dashboard/LockedToolOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function EmailCampaignTool() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          base44.auth.redirectToLogin(createPageUrl("EmailCampaignTool"));
          return;
        }
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (error) {
        base44.auth.redirectToLogin(createPageUrl("EmailCampaignTool"));
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const hasAccess = (user?.subscription_plan === "moderate" || user?.subscription_plan === "heavy") && user?.subscription_status === "active";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {!hasAccess && <LockedToolOverlay toolName="Email Campaign" requiredPlan="moderate" />}
          
          <div className={!hasAccess ? "filter blur-sm pointer-events-none" : ""}>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Campaign Manager</h1>
            <p className="text-gray-600 text-lg mb-8">Compose, schedule and track email campaigns</p>

            <Card className="shadow-xl p-8 text-center">
              <Mail className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-600">Email campaign tool is under development</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
