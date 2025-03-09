"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/app/Context/CartContext";
import Link from "next/link";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentComplete />
    </Suspense>
  );
}

function PaymentComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems, clearCart } = useCart();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your payment...");
  const [orderItems, setOrderItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    reference: string;
    total: number;
  } | null>(null);

  console.log(orderItems);

  const reference = searchParams.get("reference");

  useEffect(() => {
    const pendingOrder = JSON.parse(
      sessionStorage.getItem("pendingOrder") || "{}",
    );
    setOrderItems(pendingOrder.items || [...cartItems]);

    const timeoutId = setTimeout(() => {
      router.push("/");
    }, 30000);

    if (!reference) {
      console.error("No reference found in URL");
      setStatus("failed");
      setMessage("Invalid payment reference");
      return () => clearTimeout(timeoutId);
    }

    const verifyPayment = async () => {
      try {
        const verifyResponse = await fetch(
          `/api/verify-paystack?reference=${reference}`,
        );
        const verifyData = await verifyResponse.json();
        console.log("Paystack Verification Response:", verifyData);

        if (verifyData.status && verifyData.data.status === "success") {
          const orderResponse = await fetch(
            "https://backend.royalgangchambers.com/create-order.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...pendingOrder,
                paymentReference: reference,
                paymentStatus: "paid",
              }),
            },
          );

          const orderData = await orderResponse.json();
          console.log("Order Submission Response:", orderData);

          if (orderData.success) {
            console.log("Order successful. Updating state to 'success'.");
            setStatus("success");
            setMessage(
              "Your order is completed and it is on the way for delivery!",
            );
            setOrderDetails({
              orderId: orderData.order_id,
              reference,
              ...pendingOrder,
            });

            // Clear cart after successful order
            clearCart();
            sessionStorage.removeItem("pendingOrder");
          } else {
            console.log(
              "Order submission failed. Updating state to 'warning'.",
            );
            setStatus("warning");
            setMessage(
              "Payment successful, but we could not process your order. Our team will contact you shortly.",
            );
          }
        } else {
          console.error("Payment verification failed.");
          setStatus("failed");
          setMessage("Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        setStatus("failed");
        setMessage("An error occurred while processing your payment.");
      }
    };

    verifyPayment();

    return () => clearTimeout(timeoutId);
  }, [reference, clearCart, cartItems, router]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow-md">
        {status === "verifying" && (
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">
              Verifying your payment...
            </h1>
            <p>Please wait while we confirm your transaction.</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-green-600">
              Payment Successful!
            </h1>
            <p className="mb-4">{message}</p>

            {orderDetails && (
              <div className="mt-6 text-left">
                <h2 className="mb-2 text-xl font-semibold">Order Summary</h2>
                <p className="mb-1 text-gray-600">
                  Order ID: {orderDetails.orderId}
                </p>
                <p className="mb-1 text-gray-600">
                  Reference: {orderDetails.reference}
                </p>
                <p className="mb-4 text-gray-600">
                  Total Amount: ₦{orderDetails.total?.toLocaleString()}
                </p>

                <Link
                  href="/"
                  className="mt-4 inline-block rounded bg-saddleBrown px-6 py-2 text-white"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        )}

        {status === "warning" && (
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-yellow-600">
              Payment Processed
            </h1>
            <p className="mb-4">{message}</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded bg-saddleBrown px-6 py-2 text-white"
            >
              Back to Home
            </Link>
          </div>
        )}

        {status === "failed" && (
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-red-600">
              Payment Failed
            </h1>
            <p className="mb-4">{message}</p>
            <Link
              href="/cart"
              className="mt-4 inline-block rounded bg-saddleBrown px-6 py-2 text-white"
            >
              Return to Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
