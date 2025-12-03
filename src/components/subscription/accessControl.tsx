import { PLAN_HIERARCHY, PLANS } from "./plansConfig";

/* ============================
   ✅ Types
============================ */

export type SubscriptionStatus = "active" | "past_due" | "canceled" | "trialing" | "none";

export interface UserSubscription {
  subscription_plan?: string;
  subscription_status?: SubscriptionStatus;
}

/* ============================
   ✅ Check if user has a plan or higher
============================ */

export const hasPlan = (
  user: UserSubscription | null | undefined,
  requiredPlan: string
): boolean => {
  if (!user) return false;

  const userPlanLevel = PLAN_HIERARCHY[user.subscription_plan ?? ""] || 0;
  const requiredPlanLevel = PLAN_HIERARCHY[requiredPlan] || 0;

  const isActive =
    user.subscription_status === "active" ||
    user.subscription_status === "past_due";

  return isActive && userPlanLevel >= requiredPlanLevel;
};

/* ============================
   ✅ Check if user has access to a tool
============================ */

export const hasAccessToTool = (
  user: UserSubscription | null | undefined,
  toolPlanRequired: string
): boolean => {
  if (!user) return false;
  return hasPlan(user, toolPlanRequired);
};

/* ============================
   ✅ Get current user plan details
============================ */

export const getUserPlanDetails = (
  user: UserSubscription | null | undefined
) => {
  if (!user || !user.subscription_plan || user.subscription_plan === "none") {
    return null;
  }

  return PLANS[user.subscription_plan] || null;
};

/* ============================
   ✅ Check if subscription is active
============================ */

export const isSubscriptionActive = (
  user: UserSubscription | null | undefined
): boolean => {
  if (!user) return false;

  return (
    user.subscription_status === "active" ||
    user.subscription_status === "past_due"
  );
};

/* ============================
   ✅ Get required plan for a tool
============================ */

export const getRequiredPlanForTool = (toolPlanRequired: string) => {
  return PLANS[toolPlanRequired] || null;
};

/* ============================
   ✅ Get upgrade path
============================ */

export const getUpgradePath = (
  currentPlan: string,
  targetPlan: string
) => {
  const currentLevel = PLAN_HIERARCHY[currentPlan] || 0;
  const targetLevel = PLAN_HIERARCHY[targetPlan] || 0;

  if (targetLevel <= currentLevel) return null;

  return PLANS[targetPlan];
};

/* ============================
   ✅ Get all accessible tool IDs for user
============================ */

export const getAccessibleToolIds = (
  user: UserSubscription | null | undefined
): string[] => {
  if (!user || !isSubscriptionActive(user)) return [];

  const plan = PLANS[user.subscription_plan ?? ""];
  if (!plan) return [];

  return plan.toolIds || [];
};
