"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function PaymentFailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Payment failed";

  useEffect(() => {
    // Auto redirect to cart after 10 seconds
    const timer = setTimeout(() => {
      router.push("/cart");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Payment Failed
          </h1>
          <p className="text-muted-foreground">{error}</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push("/cart")}
            className="w-full"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Cart
          </Button>

          <Button
            onClick={() => router.push("/checkout")}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Try Again
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          You will be redirected to your cart in 10 seconds...
        </p>
      </div>
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentFailureContent />
    </Suspense>
  );
}
