
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft, CreditCard, Lock } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const packageName = searchParams.get("package");
  const packagePrice = packageName === "Starter" ? 49 : packageName === "Pro" ? 99 : 0;

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    business_name: "",
    phone: "",
    billing_address: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
    notes: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!packageName || (packageName !== "Starter" && packageName !== "Pro")) {
      navigate(createPageUrl("Packages"));
    }
  }, [packageName, navigate]);

  const createOrderMutation = useMutation({
    mutationFn: async (data) => {
      const orderData = {
        ...data,
        package_name: packageName,
        package_price: packagePrice,
        payment_status: "pending",
        subscription_status: "inactive",
      };
      
      // Create order in database
      await base44.entities.Order.create(orderData);
      
      // Send email notification
      await base44.integrations.Core.SendEmail({
        from_name: "Smart Content Solutions Website",
        to: "support@smartcontentsolutions.co.uk",
        subject: `New ${packageName} Plan Order from ${data.customer_name}`,
        body: `
          New order received via Checkout page!
          
          Package: ${packageName} Plan (£${packagePrice}/month)
          
          Customer Details:
          Name: ${data.customer_name}
          Business: ${data.business_name}
          Email: ${data.customer_email}
          Phone: ${data.phone || 'Not provided'}
          
          Billing Address:
          ${data.billing_address || 'Not provided'}
          ${data.city || ''} ${data.postcode || ''}
          ${data.country}
          
          Additional Notes:
          ${data.notes || 'None'}
          
          Please contact the customer within 24 hours to complete the setup.
        `
      });
    },
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        navigate(createPageUrl("Home"));
      }, 5000);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createOrderMutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-2xl border-none">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Received Successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for choosing the <span className="font-bold gradient-text">{packageName}</span> package.
              We've received your order and will be in touch within 24 hours to complete your setup.
            </p>
            <p className="text-gray-600 mb-8">
              You'll receive a confirmation email at <span className="font-semibold">{formData.customer_email}</span> with next steps and payment details.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you to the homepage in a few seconds...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(createPageUrl("Packages"))}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Checkout - <span className="gradient-text">{packageName} Package</span>
          </h1>
          <p className="text-xl text-gray-600">
            Complete your details and we'll reach out to finalize your subscription
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-none">
              <CardHeader className="border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Your Information
                    </h2>
                    <p className="text-sm text-gray-600">
                      We'll use this to set up your account
                    </p>
                  </div>
                </div>
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

                  <div>
                    <Label htmlFor="notes" className="mb-2 block">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any specific requirements or questions?"
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={createOrderMutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-lg py-6"
                  >
                    {createOrderMutation.isPending
                      ? "Processing..."
                      : "Complete Order"}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4" />
                    <span>Your information is secure and will not be shared</span>
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
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Package</span>
                    <span className="font-bold text-gray-900">{packageName}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Monthly Price</span>
                    <span className="font-bold text-gray-900">£{packagePrice}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-bold text-gray-900">Total Today</span>
                      <span className="font-bold gradient-text text-2xl">£{packagePrice}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    What happens next?
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>We'll email you within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Schedule your onboarding call</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Complete payment setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Start your content automation</span>
                    </li>
                  </ul>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  By completing this order, you agree to our terms of service and
                  privacy policy. Your subscription will renew monthly.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
