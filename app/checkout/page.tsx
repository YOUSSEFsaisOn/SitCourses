"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { createOrder, updateOrderStatus } from "@/services/order-service";
import { processPayment } from "@/services/payment-service";
import { enrollUserInCourses } from "@/services/enrollment-service";

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { items, total, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  if (!user) {
    router.push("/login");
    return null;
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleInputChange = (field: keyof PaymentDetails, value: string) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setError("");

    try {
      // Create order
      const order = await createOrder({
        userId: user.id,
        items,
        total,
      });

      // Process payment
      const paymentResult = await processPayment(order.id, {
        cardNumber: paymentDetails.cardNumber.replace(/\s/g, ""),
        expiryDate: paymentDetails.expiryDate,
        cvv: paymentDetails.cvv,
        name: paymentDetails.name,
      });

      if (paymentResult.success) {
        // Enroll user in courses
        await enrollUserInCourses(user.id, items);
        // Clear cart
        clearCart();
        // Redirect to success page
        router.push(`/payment/success?orderId=${order.id}`);
      } else {
        // Update order status
        await updateOrderStatus(order.id, "failed");
        // Redirect to failure page
        router.push(
          `/payment/failure?error=${paymentResult.error || "Payment failed"}`
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
              <p className="text-muted-foreground mt-2">
                Complete your purchase
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.courseId} className="flex items-center gap-4">
                    <img
                      src={item.course.thumbnail}
                      alt={item.course.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.course.instructor.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.course.price}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Payment Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Card Number
                  </label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "cardNumber",
                        formatCardNumber(e.target.value)
                      )
                    }
                    maxLength={19}
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Expiry Date
                    </label>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={(e) =>
                        handleInputChange(
                          "expiryDate",
                          formatExpiryDate(e.target.value)
                        )
                      }
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CVV
                    </label>
                    <Input
                      type="text"
                      placeholder="123"
                      value={paymentDetails.cvv}
                      onChange={(e) =>
                        handleInputChange(
                          "cvv",
                          e.target.value.replace(/[^0-9]/g, "")
                        )
                      }
                      maxLength={4}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cardholder Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={paymentDetails.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handlePayment}
                  disabled={
                    isProcessing ||
                    !paymentDetails.cardNumber ||
                    !paymentDetails.expiryDate ||
                    !paymentDetails.cvv ||
                    !paymentDetails.name
                  }
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Pay ${total.toFixed(2)}
                    </div>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Your payment information is secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
