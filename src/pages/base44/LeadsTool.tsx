import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";
import { Loader2, Phone } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function LeadsTool() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeads() {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setLeads(data || []);
      setLoading(false);
    }

    loadLeads();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <DashboardLayout title="Leads & Calls">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mb-2">Leads & Calls Manager</h1>
          <p className="text-gray-600 mb-8">View inquiries and AI scoring</p>

          <Card className="p-6 shadow-xl">
            <CardContent>

              {leads.length === 0 ? (
                <div className="text-center py-10">
                  <Phone className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                  <h3 className="text-xl font-bold mb-2">No Leads Yet</h3>
                  <p>Your contact form is ready — start getting leads!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Company</th>
                        <th className="p-3 border">Score</th>
                        <th className="p-3 border">Intent</th>
                        <th className="p-3 border">Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="p-3 border">{lead.name}</td>
                          <td className="p-3 border">{lead.email}</td>
                          <td className="p-3 border">{lead.company}</td>
                          <td className="p-3 border font-bold text-blue-600">
                            {lead.lead_score ?? "—"}
                          </td>
                          <td className="p-3 border">
                            {lead.intent ?? "—"}
                          </td>
                          <td className="p-3 border text-sm">
                            {new Date(lead.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </CardContent>
          </Card>

        </div>
      </div>
    </DashboardLayout>
  );
}
