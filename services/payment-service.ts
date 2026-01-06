import { ApiResponse } from "@/lib/types";

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

export async function processPayment(
  orderId: string,
  paymentData: PaymentData
): Promise<ApiResponse<boolean>> {
  // Simulate payment processing
  // In a real app, this would integrate with a payment gateway like Stripe

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate payment success/failure (90% success rate)
  const isSuccess = Math.random() > 0.1;

  if (isSuccess) {
    return {
      success: true,
      data: true,
    };
  } else {
    return {
      success: false,
      error: "Payment failed. Please check your card details and try again.",
    };
  }
}
