import React from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import { getToolBySlug } from "@/components/tools/toolsConfig";
import ToolPageTemplate from "@/components/tools/ToolPageTemplate";

export default function Tool() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");

  // ✅ LOADING STATE
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  // ✅ MUST BE LOGGED IN
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // ✅ FETCH TOOL
  const tool = getToolBySlug(slug);

  // ✅ INVALID TOOL → GO BACK TO DASHBOARD
  if (!tool) {
    return <Navigate to="/dashboard-preview" replace />;
  }

  // ✅ ADMIN BYPASS
  const isAdmin = user?.publicMetadata?.role === "admin";

  // ✅ TOOL LOCK CHECK
  const isLocked = tool.planRequired !== "free";

  // ✅ NON-ADMIN + LOCKED → SEND TO PRICING (THIS FIXES YOUR BUG)
  if (isLocked && !isAdmin) {
    return <Navigate to="/pricing" replace />;
  }

  // ✅ ALLOWED → RENDER TOOL
  return <ToolPageTemplate tool={tool} />;
}
