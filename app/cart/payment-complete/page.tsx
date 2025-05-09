"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/app/Context/CartContext";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: string | number;
  quantity: number;
  // Add other properties as needed
}

interface PendingOrder {
  items: CartItem[];
  shippingRate: {
    cost: number;
    pricingTier: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    country: string;
    state: string;
    city: string;
    countryCode: string;
  };
  total: number;
  // Add other properties as needed
}

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
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  console.log(orderItems)
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    reference: string;
    total: number;
    trackingId?: string;
  } | null>(null);

  const reference = searchParams.get("reference");

  useEffect(() => {
    const pendingOrder: PendingOrder = JSON.parse(
      sessionStorage.getItem("pendingOrder") || "{}"
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
          `/api/verify-paystack?reference=${reference}`
        );
        const verifyData = await verifyResponse.json();
        console.log("Paystack Verification Response:", verifyData);

        if (verifyData.status && verifyData.data.status === "success") {
          // First create database order
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
            }
          );

          const orderData = await orderResponse.json();
          console.log("Order Submission Response:", orderData);

          if (orderData.success) {
            // Now create Topship shipment
            try {
              // Map cart items to Topship format with proper typing
              const topshipItems = pendingOrder.items.map((item: CartItem) => ({
                category: "ClothingAndTextile",
                description: item.name,
                weight: 0.5,
                quantity: item.quantity,
                value: Number(item.price),
              }));
              
              const shipmentCharge = Math.round(pendingOrder.shippingRate.cost * 100);
              const totalCharge = shipmentCharge;
              const valueAddedTaxCharge = Math.round(totalCharge * 0.075);
              
              const topshipPayload = {
                shipment: [
                  {
                    items: topshipItems,
                    itemCollectionMode: "DropOff",
                    pricingTier: pendingOrder.shippingRate.pricingTier,
                    insuranceType: "None",
                    insuranceCharge: 0,
                    discount: 0,
                    shipmentRoute: pendingOrder.shipping.countryCode === "NG" ? "Domestic" : "Export",
                    shipmentCharge: shipmentCharge,
                    pickupCharge: 0,
                    valueAddedTaxCharge: valueAddedTaxCharge,
                    senderDetail: {
                      name: "Royal Gang Chambers",
                      email: "manonfireeverytime@gmail.com",
                      phoneNumber: "09099346124",
                      addressLine1: "268, Herbert Macauly way",
                      addressLine2: "",
                      addressLine3: "",
                      country: "Nigeria",
                      state: "Lagos",
                      city: "Yaba",
                      countryCode: "NG",
                      postalCode: ""
                    },
                    receiverDetail: {
                      name: `${pendingOrder.shipping.firstName} ${pendingOrder.shipping.lastName}`,
                      email: pendingOrder.shipping.email,
                      phoneNumber: pendingOrder.shipping.phoneNumber,
                      addressLine1: pendingOrder.shipping.address,
                      addressLine2: "",
                      addressLine3: "",
                      country: pendingOrder.shipping.country,
                      state: pendingOrder.shipping.state,
                      city: pendingOrder.shipping.city,
                      countryCode: pendingOrder.shipping.countryCode,
                      postalCode: ""
                    }
                  }
                ]
              };
              
              const shipmentResponse = await fetch('/api/topship/book-shipment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(topshipPayload)
              });
              
              const shipmentData = await shipmentResponse.json();
              console.log("Topship Booking Response:", shipmentData);
              
              if (shipmentData.trackingId) {
                setOrderDetails({
                  orderId: orderData.order_id,
                  reference,
                  total: pendingOrder.total,
                  trackingId: shipmentData.trackingId
                });
                setMessage("Your order is completed and your shipment has been booked!");
              } else {
                setOrderDetails({
                  orderId: orderData.order_id,
                  reference,
                  total: pendingOrder.total
                });
                setMessage("Your order is completed, but there was an issue with booking your shipment.");
              }
            } catch (shipmentError) {
              console.error("Error booking shipment:", shipmentError);
              setOrderDetails({
                orderId: orderData.order_id,
                reference,
                total: pendingOrder.total
              });
              setMessage("Your order is completed, but there was an error booking your shipment.");
            }
            
            setStatus("success");
            clearCart();
            sessionStorage.removeItem("pendingOrder");
          } else {
            setStatus("warning");
            setMessage("Payment successful, but we could not process your order.");
          }
        } else {
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
            <h1 className="mb-4 text-2xl font-bold">Verifying your payment...</h1>
            <p>Please wait while we confirm your transaction.</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-green-600">Payment Successful!</h1>
            <p className="mb-4">{message}</p>

            {orderDetails && (
              <div className="mt-6 text-left">
                <h2 className="mb-2 text-xl font-semibold">Order Summary</h2>
                <p className="mb-1 text-gray-600">Order ID: {orderDetails.orderId}</p>
                <p className="mb-1 text-gray-600">Reference: {orderDetails.reference}</p>
                {orderDetails.trackingId && (
                  <p className="mb-1 text-gray-600">Shipping Tracking ID: {orderDetails.trackingId}</p>
                )}
                <p className="mb-4 text-gray-600">Total Amount: ₦{orderDetails.total?.toLocaleString()}</p>

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
            <h1 className="mb-4 text-2xl font-bold text-yellow-600">Payment Processed</h1>
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
            <h1 className="mb-4 text-2xl font-bold text-red-600">Payment Failed</h1>
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