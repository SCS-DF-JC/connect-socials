// src/pages/base44/EmailCampaignTool.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CheckCircle, Mail } from "lucide-react";

export default function EmailCampaignTool(): JSX.Element {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!subject.trim() || !body.trim()) {
      alert("Subject and body are required.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setSubject("");
      setBody("");
      setTimeout(() => setSent(false), 2500);
    }, 1200);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Email Campaigns</h1>

        {sent && (
          <Card className="mb-4">
            <CardContent className="p-4 flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-semibold">Campaign sent (simulated)</div>
                <div className="text-sm text-gray-600">This was a frontend-only demo send.</div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-bold">Compose Campaign</h2>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Campaign subject" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => { setSubject(""); setBody(""); }}>Clear</Button>
              <Button onClick={handleSend} className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                {sending ? "Sending..." : "Send Campaign (simulate)"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
