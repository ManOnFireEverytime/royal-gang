import { Dispatch, memo, SetStateAction } from "react";
import Image from "next/image";

import { X } from "lucide-react";

import { useCart } from "@/app/Context/CartContext";
// import { useRouter } from "next/navigation";

const CartOverView = memo(function CartOverview({
  couponCode,
  setCouponCode,
}: {
  couponCode: string;
  setCouponCode: Dispatch<SetStateAction<string>>;
}) {
  // const router = useRouter();
  const { cartItems, removeFromCart } = useCart();

  // const calculateSubtotal = (items: CartItems[]) =>
  //   items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  // const deliveryFee = 20500;
  // const subtotal = calculateSubtotal(cartItems);
  // const total = subtotal + deliveryFee;

  // function goBack() {
  //   router.back();
  // }
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-6 overflow-hidden">
        <div className="text-muted-foreground grid grid-cols-[0.25fr_1fr_0.25fr] gap-4 text-center text-sm uppercase tracking-wide lg:grid-cols-[0.25fr_1fr_1fr_1fr_1fr_0.25fr]">
          <div className="col-start-2 col-end-3 text-customGrey">PRODUCT</div>

          <div className="hidden text-customGrey lg:col-start-3 lg:col-end-4 lg:block">
            Price
          </div>

          <div className="hidden text-customGrey lg:col-start-4 lg:col-end-5 lg:block">
            QUANTITY
          </div>

          <div className="col-start-3 text-customGrey lg:col-start-5 lg:col-end-6">
            SUBTOTAL
          </div>
        </div>

        <div className="h-full w-full overflow-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[0.25fr_1fr_0.25fr] items-center gap-4 border-b pb-4 text-center lg:grid-cols-[0.25fr_1fr_1fr_1fr_1fr_0.25fr]"
            >
              <div className="relative h-20 w-20 bg-muted">
                <Image
                  src={`https://backend.royalgangchambers.com/products/${item.image}`}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium">{item.name}</h3>

                <div className="text-muted-foreground flex flex-col justify-center gap-x-2 text-sm lg:flex-row lg:text-sm">
                  <p>
                    <span>Color:</span> <span>{item.color}</span>
                  </p>

                  <p className="block lg:hidden">
                    <span>Qty:</span> <span>{item.quantity}</span>
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                <p>₦{item.price.toLocaleString()}</p>
              </div>

              <div className="hidden lg:block">
                <p>{item.quantity}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="flex-1 text-sm lg:text-base">
                  ₦{(Number(item.price) * item.quantity).toLocaleString()}
                </p>
              </div>

              <button
                type="button"
                title="close"
                onClick={() => removeFromCart(item.id)}
                className="hidden p-2 text-red-500 hover:text-red-700 lg:block"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col gap-y-4 overflow-hidden rounded-md transition-colors duration-150 focus-within:border-goldenRod lg:h-[50px] lg:w-[80%] lg:flex-row lg:border lg:bg-[#F4F4F4]">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="h-[50px] flex-grow rounded-sm border bg-[#F4F4F4] px-4 outline-none lg:h-full"
        />

        <button
          type="submit"
          className="h-[50px] min-w-[200px] rounded-md bg-saddleBrown text-sm text-white lg:h-full"
        >
          APPLY COUPON
        </button>
      </div>
    </div>
  );
});

export default CartOverView;
