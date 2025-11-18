import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
// import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Mail,
  BarChart3,
  Phone,
  TrendingUp,
  Clock,
  CheckCircle,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ConnectedAccounts from "../components/dashboard/ConnectedAccounts";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          base44.auth.redirectToLogin(createPageUrl("Dashboard"));
          return;
        }
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (error) {
        console.error("Error loading user:", error);
        base44.auth.redirectToLogin(createPageUrl("Dashboard"));
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

  const hasActivePlan = user?.subscription_plan && user?.subscription_plan !== "none" && user?.subscription_status === "active";
  const isHeavy = user?.subscription_plan === "heavy";
  const isModerate = user?.subscription_plan === "moderate";
  const isLight = user?.subscription_plan === "light";

  const getPlanName = () => {
    if (isHeavy) return "Heavy";
    if (isModerate) return "Moderate";
    if (isLight) return "Light";
    return null;
  };

  const tools = [
    {
      name: "Social Media Tool",
      description: "Create and schedule posts across all platforms",
      icon: Share2,
      path: "SocialMediaTool",
      unlocked: hasActivePlan,
      requiredPlan: "light",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Email Campaigns",
      description: "Compose, schedule and track email campaigns",
      icon: Mail,
      path: "EmailCampaignTool",
      unlocked: isModerate || isHeavy,
      requiredPlan: "moderate",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Analytics",
      description: "Track performance with detailed insights",
      icon: BarChart3,
      path: "AnalyticsTool",
      unlocked: isModerate || isHeavy,
      requiredPlan: "moderate",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "Leads & Calls",
      description: "Manage inquiries and track conversions",
      icon: Phone,
      path: "LeadsTool",
      unlocked: isHeavy,
      requiredPlan: "heavy",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    {
      label: "Posts Scheduled",
      value: hasActivePlan ? "12" : "—",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      label: "Engagement Rate",
      value: hasActivePlan ? "4.2%" : "—",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Active Campaigns",
      value: isModerate || isHeavy ? "3" : "—",
      icon: CheckCircle,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.full_name || "User"}!
              </h1>
              <p className="text-gray-600 text-lg">
                {hasActivePlan
                  ? `You're on the ${getPlanName()} plan. Access your automation tools below.`
                  : "Get started by subscribing to a plan to unlock powerful automation tools."}
              </p>
            </div>
            {!hasActivePlan && (
              <Link to={createPageUrl("Packages")}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white group"
                >
                  Choose a Plan
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
          </div>

          {user?.subscription_status === "expired" && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold">
                ⚠️ Your subscription has expired. Please renew to continue accessing tools.
              </p>
              <Link to={createPageUrl("Packages")}>
                <Button className="mt-3 bg-red-600 hover:bg-red-700 text-white">
                  Renew Subscription
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connected Accounts */}
        <ConnectedAccounts user={user} />

        {/* Tools Grid */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  tool.unlocked ? "hover:-translate-y-1" : "opacity-75"
                }`}
              >
                <CardHeader className={`bg-gradient-to-r ${tool.gradient} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    {!tool.unlocked && (
                      <Lock className="w-6 h-6 text-white/80" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  {tool.unlocked ? (
                    <Link to={createPageUrl(tool.path)}>
                      <Button className="w-full group">
                        Open Tool
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500 mb-3">
                        Requires {tool.requiredPlan === "heavy" ? "Heavy" : tool.requiredPlan === "moderate" ? "Moderate" : "Light"} Plan or higher
                      </p>
                      <Link to={createPageUrl("Packages")}>
                        <Button variant="outline" className="w-full">
                          Upgrade to Unlock
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {hasActivePlan && (
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Social post scheduled</p>
                    <p className="text-sm text-gray-600">Instagram • 2 hours ago</p>
                  </div>
                </div>
                {(isModerate || isHeavy) && (
                  <>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Email campaign sent</p>
                        <p className="text-sm text-gray-600">Newsletter • Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Analytics updated</p>
                        <p className="text-sm text-gray-600">Weekly report • 3 days ago</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}