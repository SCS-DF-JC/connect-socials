import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            socialButtonsBlockButton: "bg-white shadow-md p-3 rounded-lg",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          },
          layout: {
            socialButtonsVariant: "iconButton", // icon only
          },
        }}
        // Use Clerk's recommended redirect prop(s)
        // fallbackRedirectUrl is used when a redirect target isn't otherwise present.
        // You can also use `forceRedirectUrl` if you always want to force a destination.
        fallbackRedirectUrl="/dashboard"
        // If you prefer to *always* redirect to dashboard after sign-in/up:
        // forceRedirectUrl="/dashboard"
      />
    </div>
  );
}
