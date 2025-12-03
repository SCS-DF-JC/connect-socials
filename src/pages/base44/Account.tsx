import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User as UserIcon, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Accounts() {
  // NOTE:
  // Your original Base44 project does NOT contain authentication
  // after your cleanup, so this UI is static until you add logic.
  // This matches ALL other Base44 pages in structure and style.

  const user = {
    full_name: "John Doe",
    email: "john@example.com",
    role: "user",
    subscription_plan: "moderate",
    subscription_status: "active",
    subscription_start_date: Date.now(),
    subscription_end_date: Date.now() + 86400000 * 30,
  };

  const getPlanName = () => {
    if (user.subscription_plan === "heavy") return "Heavy Plan";
    if (user.subscription_plan === "moderate") return "Moderate Plan";
    if (user.subscription_plan === "light") return "Light Plan";
    return "No Plan";
  };

  const getPlanColor = () => {
    if (user.subscription_plan === "heavy")
      return "from-blue-500 to-green-500";
    if (user.subscription_plan === "moderate")
      return "from-purple-500 to-pink-500";
    if (user.subscription_plan === "light")
      return "from-blue-400 to-cyan-400";
    return "from-gray-400 to-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your profile and subscription
          </p>
        </div>

        {/* Profile Card */}
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
                <Label className="mb-2 block">Full Name</Label>
                <Input disabled value={user.full_name} className="bg-gray-50" />
              </div>

              <div>
                <Label className="mb-2 block">Email Address</Label>
                <Input disabled value={user.email} className="bg-gray-50" />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Account Role</Label>
              <Input disabled value={user.role} className="bg-gray-50" />
            </div>
          </CardContent>
        </Card>

        {/* Subscription Card */}
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
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                  <p className={`text-2xl font-bold bg-gradient-to-r ${getPlanColor()} bg-clip-text text-transparent`}>
                    {getPlanName()}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    user.subscription_status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.subscription_status === "active" ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(user.subscription_start_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">End Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(user.subscription_end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Link to="/packages" className="flex-1">
                  <Button variant="outline" className="w-full">Change Plan</Button>
                </Link>

                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
