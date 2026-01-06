"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOrderById } from "@/services/order-service";
import { enrollUserInCourses } from "@/services/enrollment-service";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { Order, CartItem } from "@/lib/types";

function PaymentSuccessContent() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { user } = useAuthStore();
  const { clearCart } = useCartStore();

  useEffect(() => {
    const processSuccess = async () => {
      if (!orderId || !user) {
        router.push("/");
        return;
      }

      try {
        const orderData = await getOrderById(orderId);
        if (
          !orderData ||
          orderData.userId !== user.id ||
          orderData.status !== "paid"
        ) {
          router.push("/");
          return;
        }

        // Enroll user in courses
        await enrollUserInCourses(user.id, orderData.items);

        // Clear cart
        clearCart();

        setOrder(orderData);
      } catch (error) {
        console.error("Error processing payment success:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    processSuccess();
  }, [orderId, user, router, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Order not found</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your courses are now available in your
            dashboard.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-mono">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Paid:</span>
              <span className="font-bold text-lg">
                ${order.total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Date:</span>
              <span>{order.paidAt?.toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="font-semibold mb-3">Courses Purchased:</h3>
            <div className="space-y-2">
              {order.items.map((item: CartItem) => (
                <div
                  key={item.courseId}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm">{item.course.title}</span>
                  <span className="text-sm font-medium">
                    ${item.course.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/dashboard">
              Go to My Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Button variant="outline" asChild>
              <Link href="/courses">Browse More Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
