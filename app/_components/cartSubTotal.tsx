import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Inputs } from "../cart/page";
import { ErrorGroup, InputGroup } from "./payments";
import { CartItems, useCart } from "@/app/Context/CartContext";
import { useShipping } from "@/app/Context/ShippingContext";

export default function CartSubTotal({
  proceed,
  setProceed,
  register,
  errors,
  onCompleteOrder,
  watch,
}: {
  proceed: boolean;
  setProceed: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  onCompleteOrder: () => void;
  watch?: any; // Add watch prop to get form values
}) {
  const { cartItems } = useCart();
  const { selectedRate } = useShipping();
  
  // Get the city from form values if watch is provided
  const selectedCity = watch ? watch("billingTown") : "";
  const selectedCountry = watch ? watch("billingCountry") : "";

  const calculateSubtotal = (items: CartItems[]) =>
    items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  // Use the selected shipping rate or default to 0
  const deliveryFee = selectedRate ? selectedRate.cost : 0;
  const subtotal = calculateSubtotal(cartItems);
  const total = subtotal + deliveryFee;

  function handleProceed() {
    setProceed(true);
  }

  // Function to get delivery location based on selected city
  const getDeliveryLocation = () => {
    if (selectedCity && selectedCountry) {
      return `${selectedCity}, ${selectedCountry}`;
    } else if (selectedCity) {
      return selectedCity;
    } else {
      return "Not selected";
    }
  };

  return (
    <div className="basis-[40%] lg:px-6">
      <h1 className="mb-4 text-lg font-semibold text-customGrey">
        CART TOTALS
      </h1>

      <div className="space-y-2 lg:space-y-6">
        <div className="flex items-center justify-between">
          <h2>SUBTOTAL</h2>

          <p>₦{subtotal.toLocaleString()}</p>
        </div>

        <div className="border-t pt-2 lg:pt-4">
          <h2 className="mb-2 font-medium">DELIVERY</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <h3 className="tracking-wide text-customGrey">Delivery Fees:</h3>

              <p>₦{deliveryFee.toLocaleString()}</p>
            </div>

            <div className="flex justify-between">
              <h3 className="tracking-wide text-customGrey">
                Delivery Location:
              </h3>

              <p>{getDeliveryLocation()}</p>
            </div>

            {selectedRate && (
              <div className="flex justify-between">
                <h3 className="tracking-wide text-customGrey">
                  Shipping Method:
                </h3>

                <p>{selectedRate.mode} - {selectedRate.pricingTier}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4 font-semibold">
          <h2>TOTAL</h2>

          <p>₦{total.toLocaleString()}</p>
        </div>

        {proceed ? (
          <InputGroup>
            {errors?.termsAndConditions ? (
              <ErrorGroup>{errors.termsAndConditions.message}</ErrorGroup>
            ) : null}

            <div className="flex gap-x-2">
              <input
                type="checkbox"
                {...register("termsAndConditions", {
                  required: { value: true, message: "Required" },
                })}
              />

              <p className="text-sm">
                I have read and accepted the&nbsp;
                <Link
                  className="underline transition-colors duration-300 hover:text-goldenRod"
                  href={"/terms-and-conditions"}
                >
                  Terms and Conditions
                </Link>
              </p>
            </div>
          </InputGroup>
        ) : null}

        {!proceed ? (
          <button
            type="button"
            className="h-[50px] w-full rounded-md bg-saddleBrown p-2 text-sm text-white"
            onClick={handleProceed}
          >
            PROCEED TO CHECKOUT
          </button>
        ) : (
          <button
            type="submit"
            className="h-[50px] w-full rounded-md bg-saddleBrown p-2 text-sm text-white"
            onClick={onCompleteOrder}
          >
            COMPLETE THE ORDER
          </button>
        )}
      </div>
    </div>
  );
}