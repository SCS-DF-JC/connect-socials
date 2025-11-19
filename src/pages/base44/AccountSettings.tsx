import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as UserIcon, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AccountSettings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          base44.auth.redirectToLogin(createPageUrl("AccountSettings"));
          return;
        }
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (error) {
        base44.auth.redirectToLogin(createPageUrl("AccountSettings"));
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

  const getPlanName = () => {
    if (user?.subscription_plan === "heavy") return "Heavy Plan";
    if (user?.subscription_plan === "moderate") return "Moderate Plan";
    if (user?.subscription_plan === "light") return "Light Plan";
    return "No Plan";
  };

  const getPlanColor = () => {
    if (user?.subscription_plan === "heavy") return "from-blue-500 to-green-500";
    if (user?.subscription_plan === "moderate") return "from-purple-500 to-pink-500";
    if (user?.subscription_plan === "light") return "from-blue-400 to-cyan-400";
    return "from-gray-400 to-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your profile and subscription
          </p>
        </div>

        {/* Profile Information */}
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Profile Information
              </h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="full_name" className="mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  value={user?.full_name || ""}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="email" className="mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="role" className="mb-2 block">
                Account Role
              </Label>
              <Input
                id="role"
                value={user?.role || "user"}
                disabled
                className="bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Subscription Information */}
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Subscription Details
              </h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {user?.subscription_plan && user?.subscription_plan !== "none" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                    <p className={`text-2xl font-bold bg-gradient-to-r ${getPlanColor()} bg-clip-text text-transparent`}>
                      {getPlanName()}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        user?.subscription_status === "active"
                          ? "bg-green-100 text-green-800"
                          : user?.subscription_status === "expired"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user?.subscription_status === "active" ? "Active" : user?.subscription_status === "expired" ? "Expired" : "Inactive"}
                    </span>
                  </div>
                </div>

                {user?.subscription_start_date && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Start Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(user.subscription_start_date).toLocaleDateString()}
                      </p>
                    </div>
                    {user?.subscription_end_date && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">End Date</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(user.subscription_end_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-4">
                  <Link to={createPageUrl("Packages")} className="flex-1">
                    <Button className="w-full" variant="outline">
                      Change Plan
                    </Button>
                  </Link>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  You don't have an active subscription
                </p>
                <Link to={createPageUrl("Packages")}>
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                    Choose a Plan
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}