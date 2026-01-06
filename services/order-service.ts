import { Order, CartItem } from "@/lib/types";

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

// Mock order storage (in-memory)
let orders: Order[] = [];
let orderIdCounter = 1;

export async function createOrder(data: {
  userId: string;
  items: CartItem[];
  total: number;
}): Promise<Order> {
  const order: Order = {
    id: `order_${orderIdCounter++}`,
    userId: data.userId,
    items: data.items,
    total: data.total,
    status: "pending",
    createdAt: new Date(),
  };

  orders.push(order);
  return order;
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  return orders.find((order) => order.id === orderId) || null;
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<Order | null> {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;

  order.status = status;
  if (status === "paid") {
    order.paidAt = new Date();
  }

  return order;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  return orders.filter((order) => order.userId === userId);
}

// Mock payment processing
export async function processPayment(
  orderId: string,
  paymentDetails: any
): Promise<{ success: boolean; error?: string }> {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate 90% success rate
  const success = Math.random() > 0.1;

  if (success) {
    await updateOrderStatus(orderId, "paid");
    return { success: true };
  } else {
    await updateOrderStatus(orderId, "failed");
    return { success: false, error: "Payment failed. Please try again." };
  }
}
