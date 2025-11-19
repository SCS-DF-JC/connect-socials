// src/pages/base44/Dashboard.tsx
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ConnectedAccounts from "@/components/dashboard/ConnectedAccounts";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, CheckCircle } from "lucide-react";

const demoUser = {
  full_name: "Demo User",
  email: "demo@example.com",
  subscription_plan: "pro",
  subscription_status: "active",
  facebook_connected: false,
  linkedin_connected: false,
};

export default function Dashboard(): JSX.Element {
  return (
    <DashboardLayout user={demoUser}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Overview</h3>
                  <p className="text-sm text-gray-600">Quick snapshot of recent activity</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-xs text-gray-500">Hours Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">40%</div>
                  <div className="text-xs text-gray-500">Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs text-gray-500">Consistency</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Recent Posts</h3>
              <p className="text-sm text-gray-600">No posts yet — use the Social Media tool to create your first post.</p>
            </CardContent>
          </Card>
        </div>

        <ConnectedAccounts user={demoUser} />
      </div>
    </DashboardLayout>
  );
}
