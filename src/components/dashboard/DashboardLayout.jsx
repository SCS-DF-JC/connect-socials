import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
// import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Share2,
  Mail,
  BarChart3,
  Phone,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";

export default function DashboardLayout({ children, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    base44.auth.logout(createPageUrl("Home"));
  };

  const navItems = [
    { name: "Dashboard", path: "Dashboard", icon: LayoutDashboard },
    { name: "Social Posts", path: "SocialMediaTool", icon: Share2 },
    { name: "Email Campaigns", path: "EmailCampaignTool", icon: Mail },
    { name: "Analytics", path: "AnalyticsTool", icon: BarChart3 },
    { name: "Leads & Calls", path: "LeadsTool", icon: Phone },
    { name: "Account Settings", path: "AccountSettings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === createPageUrl(path);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Bar - Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b073eda37c031e7cfdae1c/ffd16f891_logo.jpg"
              alt="Smart Content Solutions"
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold gradient-text">SCS Dashboard</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r shadow-lg transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b073eda37c031e7cfdae1c/ffd16f891_logo.jpg"
                alt="Smart Content Solutions"
                className="h-12 w-12 object-contain"
              />
              <div>
                <span className="font-bold gradient-text block">Smart Content</span>
                <span className="text-xs text-gray-500">Dashboard</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-gray-900">
                {user?.full_name || "User"}
              </div>
              <div className="text-xs text-gray-600">{user?.email}</div>
              <div className="mt-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    user?.subscription_plan === "pro"
                      ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                      : user?.subscription_plan === "starter"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user?.subscription_plan === "pro"
                    ? "Pro Plan"
                    : user?.subscription_plan === "starter"
                    ? "Starter Plan"
                    : "No Plan"}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={createPageUrl(item.path)}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-2">
            <Link
              to={createPageUrl("Home")}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Back to Website</span>
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}