import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, Linkedin, LogOut } from 'lucide-react';

import {
  initiateLinkedInAuth,
  getLinkedInAuthData,
  isLinkedInConnected,
  clearLinkedInAuthData,
  type LinkedInAuthData,
} from '@/utils/linkedinOAuth';

import { getUserId } from "@/utils/userIdentity";
import { toast } from 'sonner';

export function LinkedInConnectButton() {
  const [authData, setAuthData] = useState<LinkedInAuthData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load stored auth
  useEffect(() => {
    const saved = getLinkedInAuthData();
    if (saved) setAuthData(saved);
  }, []);

  // Start LinkedIn OAuth
  const handleConnect = async () => {
    setIsLoading(true);

    try {
      const userId = getUserId(); // SaaS user identity
      initiateLinkedInAuth(userId);
    } catch (error) {
      console.error("Failed to start LinkedIn auth:", error);
      toast.error("Failed to start authentication");
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    clearLinkedInAuthData();
    setAuthData(null);
    toast.success("LinkedIn disconnected");
  };

  // ===========================
  // Connected UI
  // ===========================
  if (authData && isLinkedInConnected()) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <h2 className="text-2xl font-bold">LinkedIn Connected</h2>
          </div>

          <Button variant="outline" onClick={handleDisconnect} className="gap-2">
            <LogOut className="h-4 w-4" />
            Disconnect
          </Button>
        </div>

        <div className="flex items-center gap-4 p-6 bg-muted rounded-lg">
          <Avatar className="h-16 w-16">
            <AvatarImage src={authData.profilePicture || undefined} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {authData.firstName?.charAt(0) ?? "?"}
              {authData.lastName?.charAt(0) ?? "?"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="text-lg font-semibold">
              {authData.firstName} {authData.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{authData.emailAddress}</p>

            <p className="text-xs text-muted-foreground mt-1">
              LinkedIn ID: {authData.linkedin_user_id}
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Permissions</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>✓ Profile access</p>
            <p>✓ Email access</p>
            <p>✓ Posting permission</p>
            <p>✓ Synced with automation (n8n)</p>
          </div>
        </div>
      </Card>
    );
  }

  // ===========================
  // Not connected UI
  // ===========================
  return (
    <Card className="p-8 max-w-2xl mx-auto text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Linkedin className="h-8 w-8 text-primary" />
        </div>

        <h2 className="text-3xl font-bold mb-2">Connect Your LinkedIn</h2>
        <p className="text-muted-foreground">
          Enable automated posting & profile sync via LinkedIn API.
        </p>
      </div>

      <Button
        onClick={handleConnect}
        disabled={isLoading}
        size="lg"
        className="gap-2 text-lg px-8 py-6 bg-primary hover:bg-primary/90"
      >
        <Linkedin className="h-6 w-6" />
        {isLoading ? "Connecting…" : "Connect LinkedIn"}
      </Button>

      <div className="mt-8 text-sm text-muted-foreground">
        <p className="mb-2">This app will:</p>
        <ul className="space-y-1">
          <li>• Access your profile</li>
          <li>• Read your email</li>
          <li>• Post on your behalf</li>
        </ul>
      </div>
    </Card>
  );
}
