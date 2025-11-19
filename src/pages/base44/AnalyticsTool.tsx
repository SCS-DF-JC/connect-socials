// src/pages/base44/AnalyticsTool.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

export default function AnalyticsTool(): JSX.Element {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Engagement</h3>
                  <p className="text-sm text-gray-600">Overview of likes & comments</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="mt-6 text-3xl font-bold">+24%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Reach</h3>
                  <p className="text-sm text-gray-600">Total impressions</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <div className="mt-6 text-3xl font-bold">12.4k</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold">Top Post</h3>
              <p className="text-sm text-gray-600">Best performing content</p>
              <div className="mt-4">“How we saved 5 hours/week with automation”</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
