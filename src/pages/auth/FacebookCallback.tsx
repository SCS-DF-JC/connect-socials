// src/pages/auth/FacebookCallback.tsx
import { useEffect, useState } from "react";
import { completeFacebookAuth } from "@/utils/facebookOAuth";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function FacebookCallback() {
  const [status, setStatus] = useState("Connecting your Facebook account...");
  const navigate = useNavigate();
  const { isLoaded } = useUser(); // ⭐ WAIT FOR CLERK

  useEffect(() => {
    if (!isLoaded) return; // ⭐ DO NOT RUN UNTIL CLERK IS READY

    async function finishAuth() {
      try {
        setStatus("Completing Facebook authentication...");

        const auth = await completeFacebookAuth();

        if (!auth) {
          setStatus("Something went wrong. No data returned.");
          return;
        }

        setStatus("Facebook connected! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 800);
      } catch (err) {
        console.error(err);
        setStatus("Authentication failed. Please try again.");
      }
    }

    finishAuth();
  }, [isLoaded]); // ⭐ RUN ONLY AFTER CLERK LOADS

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Facebook Authentication</h1>
      <p className="text-lg opacity-80">{status}</p>
      <div className="mt-6 animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}
