"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { ArrowLeft } from "lucide-react";

import Payments from "../_components/payments";
import CartSubTotal from "../_components/cartSubTotal";
import CartOverview from "../_components/cartOverview";

import { CartItems, useCart } from "@/app/Context/CartContext";

export type Inputs = {
  cardNumber: string;
  cardHolderName: string;
  cardCvv: string;
  cardExpiry: string;

  billingTown: string;
  billingEmail: string;
  billingPhone: string;
  billingState: string;
  billingCountry: string;
  billingAddress: string;
  billingLastName: string;
  billingFirstName: string;
  termsAndConditions: true;

  rememberMe: boolean;
};

export default function CartPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [proceedToCheckout, setProceedToCheckout] = useState(false);

  // Using the cartItems from useCart hook
  const { cartItems } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  function goBack() {
    router.back();
  }

  // Calculate totals using cartItems
  const calculateSubtotal = (items: CartItems[]) =>
    items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  const deliveryFee = 20500;
  const subtotal = calculateSubtotal(cartItems);
  const total = subtotal + deliveryFee;

  // Initialize Paystack payment
  const initializePayment = async (formData: Inputs) => {
    if (isProcessing || cartItems.length === 0) return;

    setIsProcessing(true);

    try {
      // Generate a unique reference
      const reference = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

      // Prepare order data to be sent after successful payment
      const orderData = {
        reference,
        items: cartItems,
        shipping: {
          firstName: formData.billingFirstName,
          lastName: formData.billingLastName,
          address: formData.billingAddress,
          city: formData.billingTown,
          state: formData.billingState,
          country: formData.billingCountry,
          phoneNumber: formData.billingPhone,
          email: formData.billingEmail,
          rememberMe: formData.rememberMe,
        },
        subtotal,
        deliveryFee,
        total,
      };

      // Store order data in session storage for retrieval after payment
      sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));

      // Initialize Paystack
      const response = await fetch("/api/initialize-paystack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.billingEmail,
          amount: total * 100, // Paystack amount in kobo
          reference,
          callback_url: `${window.location.origin}/cart/payment-complete`,
        }),
      });

      const data = await response.json();

      if (data.status) {
        // Redirect to Paystack payment page
        window.location.href = data.data.authorization_url;
      } else {
        alert("Payment initialization failed. Please try again.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  function submitHandler(data: Inputs) {
    if (proceedToCheckout) {
      // If we're in checkout mode and the form is submitted, initialize payment
      initializePayment(data);
    } else {
      console.log("Form submitted but not in checkout mode:", data);
    }
  }

  console.log(errors);

  return (
    <main className="flex h-dvh flex-col space-y-3 bg-background px-4 pb-10 pt-20 lg:space-y-6 lg:overflow-hidden lg:px-10">
      <button
        type="button"
        onClick={goBack}
        className="mt-4 inline-flex max-w-fit items-center text-sm hover:text-goldenRod"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-grow flex-col gap-y-6 py-2 lg:flex-row lg:justify-between lg:gap-x-10 lg:divide-x lg:overflow-hidden lg:py-0"
      >
        {proceedToCheckout ? (
          <>
            <Payments
              setProceed={setProceedToCheckout}
              register={register}
              errors={errors}
            />
          </>
        ) : (
          <CartOverview couponCode={couponCode} setCouponCode={setCouponCode} />
        )}

        <div className="h-[1px] w-full bg-muted lg:hidden"></div>

        <CartSubTotal
          proceed={proceedToCheckout}
          setProceed={setProceedToCheckout}
          register={register}
          errors={errors}
          onCompleteOrder={function () {}} //TODO: CHANGE THIS
        />
      </form>

      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <p className="text-lg font-medium">Processing payment...</p>
          </div>
        </div>
      )}
    </main>
  );
}
