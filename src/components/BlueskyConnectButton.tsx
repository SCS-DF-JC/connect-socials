import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  getBlueskyAuthData,
  initiateBlueskyAuth,
  clearBlueskyAuthData,
  isBlueskyConnected,
} from "@/utils/blueskyOAuth";
import { useUser } from "@clerk/clerk-react";
import { Bird } from "lucide-react";

export function BlueskyConnectButton() {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authData = getBlueskyAuthData();

  const handleConnect = async () => {
    if (!username || !appPassword) {
      toast.error("Enter Bluesky username and App Password");
      return;
    }

    setIsLoading(true);
    try {
      await initiateBlueskyAuth(username, appPassword, user.id);
      toast.success("Bluesky connected!");
    } catch (err: any) {
      toast.error(err.message || "Bluesky connection failed");
    }
    setIsLoading(false);
  };

  const handleDisconnect = () => {
    clearBlueskyAuthData();
    toast.success("Bluesky disconnected");
  };

  if (authData && isBlueskyConnected()) {
    return (
      <Card className="p-6 bg-white shadow-md max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Bird className="h-8 w-8 text-blue-500" />
          <h2 className="text-2xl font-bold">Bluesky Connected</h2>
        </div>

        <p className="text-gray-600 mb-2">
          Handle: <strong>{authData.handle}</strong>
        </p>

        <p className="text-gray-600 mb-4">
          DID: <strong>{authData.did}</strong>
        </p>

        <Button variant="outline" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white shadow-md max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Bird className="h-8 w-8 text-blue-500" />
        <h2 className="text-2xl font-bold">Connect Bluesky</h2>
      </div>

      <Input
        placeholder="Bluesky Username (e.g. name.bsky.social)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-3"
      />

      <Input
        placeholder="Bluesky App Password"
        type="password"
        value={appPassword}
        onChange={(e) => setAppPassword(e.target.value)}
        className="mb-4"
      />

      <Button disabled={isLoading} className="w-full" onClick={handleConnect}>
        {isLoading ? "Connecting…" : "Connect Bluesky"}
      </Button>
    </Card>
  );
}
