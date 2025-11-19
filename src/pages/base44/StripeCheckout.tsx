
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  ArrowLeft,
  Lock,
  Loader2,
  Tag,
  X,
} from "lucide-react";

export default function StripeCheckout() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const plan = searchParams.get("plan");
  const billing = searchParams.get("billing") || "monthly";
  const urlDiscount = parseInt(searchParams.get("discount") || "0", 10);

  const [user, setUser] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    business_name: "",
    phone: "",
    billing_address: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
  });

  const plans = {
    light: { name: "Light Plan", price: 29.99, yearlyPrice: 287.90, emoji: "🩵" },
    moderate: { name: "Moderate Plan", price: 59.99, yearlyPrice: 575.90, emoji: "💜" },
    heavy: { name: "Heavy Plan", price: 99.99, yearlyPrice: 1019.90, emoji: "💎" },
  };

  const selectedPlan = plans[plan];
  const isYearly = billing === "yearly";
  const basePrice = isYearly ? selectedPlan?.yearlyPrice : selectedPlan?.price;

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
          setFormData((prev) => ({
            ...prev,
            customer_name: userData.full_name || "",
            customer_email: userData.email || "",
          }));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!selectedPlan) {
      navigate(createPageUrl("Packages"));
    }
  }, [selectedPlan, navigate]);

  const verifyCouponMutation = useMutation({
    mutationFn: async (code) => {
      const coupons = await base44.entities.Coupon.filter({
        code: code.toUpperCase(),
        is_active: true,
      });
      
      if (!coupons || coupons.length === 0) {
        throw new Error("Invalid coupon code");
      }

      const coupon = coupons[0];
      
      if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) {
        throw new Error("Coupon has reached maximum uses");
      }

      const now = new Date();
      if (coupon.valid_from && new Date(coupon.valid_from) > now) {
        throw new Error("Coupon is not yet valid");
      }
      if (coupon.valid_until && new Date(coupon.valid_until) < now) {
        throw new Error("Coupon has expired");
      }

      const applicablePlans = coupon.applicable_plans.toLowerCase();
      if (applicablePlans !== "all" && !applicablePlans.includes(plan)) {
        throw new Error("Coupon not valid for this plan");
      }

      return coupon;
    },
    onSuccess: (coupon) => {
      setAppliedCoupon(coupon);
      setCouponError("");
    },
    onError: (error) => {
      setCouponError(error.message);
      setAppliedCoupon(null);
    },
  });

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    verifyCouponMutation.mutate(couponCode);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const calculateFinalPrice = () => {
    let discount = 0;

    if (urlDiscount > 0) {
      discount += (basePrice * urlDiscount) / 100;
    }

    if (appliedCoupon) {
      if (appliedCoupon.discount_type === "percentage") {
        discount += (basePrice * appliedCoupon.discount_value) / 100;
      } else {
        discount += appliedCoupon.discount_value;
      }
    }

    const finalPrice = Math.max(0, basePrice - discount);
    return { finalPrice, discount };
  };

  const { finalPrice, discount } = calculateFinalPrice();

  const createOrderMutation = useMutation({
    mutationFn: async (data) => {
      const orderData = {
        package_name: selectedPlan.name,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        business_name: data.business_name,
        phone: data.phone,
        billing_address: data.billing_address,
        city: data.city,
        postcode: data.postcode,
        country: data.country,
        package_price: basePrice,
        final_price: finalPrice,
        discount_applied: discount,
        coupon_code: appliedCoupon?.code || null,
        billing_cycle: billing,
        payment_status: "pending",
        subscription_status: "inactive",
      };

      const order = await base44.entities.Order.create(orderData);

      if (appliedCoupon) {
        await base44.entities.Coupon.update(appliedCoupon.id, {
          current_uses: (appliedCoupon.current_uses || 0) + 1,
        });
      }

      await base44.integrations.Core.SendEmail({
        from_name: "Smart Content Solutions",
        to: "support@smartcontentsolutions.co.uk",
        subject: `New Order: ${selectedPlan.name} - ${data.customer_name}`,
        body: `
          New order received!
          
          Plan: ${selectedPlan.name}
          Billing: ${billing}
          
          Customer Details:
          Name: ${data.customer_name}
          Email: ${data.customer_email}
          Business: ${data.business_name}
          Phone: ${data.phone}
          
          Pricing:
          Original Price: £${basePrice.toFixed(2)}
          Discount: £${discount.toFixed(2)}
          Final Price: £${finalPrice.toFixed(2)}
          Coupon Used: ${appliedCoupon?.code || "None"}
          
          NOTE: This is a test order. Integrate with Stripe for real payments.
        `,
      });

      return order;
    },
    onSuccess: async () => {
      if (user) {
        // Changed from roleMap[plan] to plan directly
        await base44.auth.updateMe({
          subscription_plan: plan,
          subscription_status: "active",
          subscription_start_date: new Date().toISOString(),
        });
      }
      
      navigate(createPageUrl("Dashboard"));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrderMutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!selectedPlan) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="outline"
          onClick={() => navigate(createPageUrl("Packages"))}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plans
        </Button>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Complete Your Order
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          You're subscribing to the <span className="font-bold gradient-text">{selectedPlan.name}</span>
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-none">
              <CardHeader className="border-b bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">
                  Your Information
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="customer_name" className="mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="customer_name"
                        name="customer_name"
                        type="text"
                        required
                        value={formData.customer_name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customer_email" className="mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="customer_email"
                        name="customer_email"
                        type="email"
                        required
                        value={formData.customer_email}
                        onChange={handleChange}
                        placeholder="john@business.com"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="business_name" className="mb-2 block">
                        Business Name *
                      </Label>
                      <Input
                        id="business_name"
                        name="business_name"
                        type="text"
                        required
                        value={formData.business_name}
                        onChange={handleChange}
                        placeholder="Your Business Ltd"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="mb-2 block">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 7700 900000"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billing_address" className="mb-2 block">
                      Billing Address
                    </Label>
                    <Input
                      id="billing_address"
                      name="billing_address"
                      type="text"
                      value={formData.billing_address}
                      onChange={handleChange}
                      placeholder="Street address"
                      className="h-12"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="city" className="mb-2 block">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="London"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="postcode" className="mb-2 block">
                        Postcode
                      </Label>
                      <Input
                        id="postcode"
                        name="postcode"
                        type="text"
                        value={formData.postcode}
                        onChange={handleChange}
                        placeholder="SW1A 1AA"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="country" className="mb-2 block">
                        Country
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={createOrderMutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-lg py-6"
                  >
                    {createOrderMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Complete Order
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4" />
                    <span>Secure checkout • Cancel anytime</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="shadow-xl border-none sticky top-24">
              <CardHeader className="border-b bg-gray-50">
                <h3 className="font-bold text-lg text-gray-900">
                  Order Summary
                </h3>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{selectedPlan.emoji}</div>
                    <h4 className="font-bold text-xl text-gray-900">
                      {selectedPlan.name}
                    </h4>
                    <p className="text-sm text-gray-600 capitalize">{billing} billing</p>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-gray-700">
                      <span>Base Price:</span>
                      <span>£{basePrice.toFixed(2)}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span>Discount:</span>
                        <span>-£{discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="border-t pt-3 flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="gradient-text text-2xl">
                        £{finalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="border-t pt-6">
                  <Label className="mb-2 block font-semibold">
                    Have a coupon code?
                  </Label>
                  
                  {!appliedCoupon ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Enter code"
                          className="uppercase"
                        />
                        <Button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={verifyCouponMutation.isPending}
                          variant="outline"
                        >
                          {verifyCouponMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Tag className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      {couponError && (
                        <p className="text-sm text-red-600">{couponError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-green-900">
                          {appliedCoupon.code}
                        </p>
                        <p className="text-sm text-green-700">
                          {appliedCoupon.discount_type === "percentage"
                            ? `${appliedCoupon.discount_value}% off`
                            : `£${appliedCoupon.discount_value} off`}
                        </p>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-700 hover:text-green-900"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    What's included:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Instant access to dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>7-day money-back guarantee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Cancel anytime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Dedicated support</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
