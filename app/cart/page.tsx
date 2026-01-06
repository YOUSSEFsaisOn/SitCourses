"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";

export default function CartPage() {
  const { items, total, removeItem, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Shopping Cart
          </h1>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => router.push("/courses")}>
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.courseId}
                className="flex gap-4 p-4 border border-border rounded-lg"
              >
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.course.thumbnail || "/placeholder.svg"}
                    alt={item.course.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {item.course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    by {item.course.instructor.name}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-lg">
                      ${item.course.price}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.courseId)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full mb-2"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              <Button variant="outline" onClick={clearCart} className="w-full">
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
