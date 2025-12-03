import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode
} from "react";
import { useUser } from "@clerk/clerk-react";
import {
  hasPlan,
  hasAccessToTool,
  isSubscriptionActive,
  getUserPlanDetails,
  UserSubscription
} from "./accessControl";

/* ============================
   ✅ Types
============================ */

interface SubscriptionContextType {
  user: UserSubscription | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;

  hasPlan: (requiredPlan: string) => boolean;
  hasAccessToTool: (toolPlanRequired: string) => boolean;
  isSubscriptionActive: () => boolean;
  getPlanDetails: () => any;

  login: (nextUrl?: string) => void;
  logout: (redirectUrl?: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

/* ============================
   ✅ Provider
============================ */

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();

  const [user, setUser] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  /* ============================
     ✅ Sync Clerk → Subscription User
  ============================ */

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && clerkUser) {
      const subscriptionUser: UserSubscription = {
        subscription_plan:
          (clerkUser.publicMetadata?.subscription_plan as string) || "none",
        subscription_status:
          (clerkUser.publicMetadata?.subscription_status as
            | "active"
            | "past_due"
            | "canceled"
            | "trialing"
            | "none") || "none"
      };

      setUser(subscriptionUser);
    } else {
      setUser(null);
    }

    setLoading(false);
  }, [isLoaded, isSignedIn, clerkUser]);

  /* ============================
     ✅ Refresh User (Clerk Metadata)
  ============================ */

  const refreshUser = async () => {
    if (!clerkUser) return;

    const subscriptionUser: UserSubscription = {
      subscription_plan:
        (clerkUser.publicMetadata?.subscription_plan as string) || "none",
      subscription_status:
        (clerkUser.publicMetadata?.subscription_status as
          | "active"
          | "past_due"
          | "canceled"
          | "trialing"
          | "none") || "none"
    };

    setUser(subscriptionUser);
  };

  /* ============================
     ✅ Context Value
  ============================ */

  const value: SubscriptionContextType = {
    user,
    loading,
    isAuthenticated: isSignedIn,

    refreshUser,

    hasPlan: (requiredPlan: string) => hasPlan(user, requiredPlan),
    hasAccessToTool: (toolPlanRequired: string) =>
      hasAccessToTool(user, toolPlanRequired),
    isSubscriptionActive: () => isSubscriptionActive(user),
    getPlanDetails: () => getUserPlanDetails(user),

    // ✅ Clerk-based auth actions
    login: (nextUrl?: string) => {
      if (nextUrl) {
        window.location.href = `/login?redirect_url=${encodeURIComponent(
          nextUrl
        )}`;
      } else {
        window.location.href = "/login";
      }
    },

    logout: (redirectUrl?: string) => {
      if (redirectUrl) {
        window.location.href = `/logout?redirect_url=${encodeURIComponent(
          redirectUrl
        )}`;
      } else {
        window.location.href = "/logout";
      }
    }
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

/* ============================
   ✅ Hook
============================ */

export function useSubscription(): SubscriptionContextType {
  const context = useContext(SubscriptionContext);

  if (!context) {
    return {
      user: null,
      loading: true,
      isAuthenticated: false,

      hasPlan: () => false,
      hasAccessToTool: () => false,
      isSubscriptionActive: () => false,
      getPlanDetails: () => null,

      login: () => {},
      logout: () => {},
      refreshUser: async () => {}
    };
  }

  return context;
}
