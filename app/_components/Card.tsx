"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "../_types/product";

export default function Card({
  productInfo,
  ref,
}: {
  productInfo: Product;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const router = useRouter();

  const backendBaseUrl = "https://backend.royalgangchambers.com/products/";

  function handleRoute() {
    router.push(`/view/${productInfo.id}`);
  }

  // Construct full image URLs
  const mainImageUrl = `${backendBaseUrl}${productInfo.image1}`;

  return (
    <div
      onClick={handleRoute}
      ref={ref}
      className="group flex h-[384px] w-full flex-shrink-0 cursor-pointer flex-col text-black md:max-w-[250px] lg:max-w-[330px]"
    >
      <div className="relative w-full flex-grow">
        <Image
          fill
          src={mainImageUrl}
          className="z-10 object-contain transition-opacity duration-500 ease-in-out lg:group-hover:opacity-0"
          alt="tshirt image"
        />

        <Image
          fill
          src={mainImageUrl}
          className="hidden object-cover transition-opacity duration-500 ease-in-out lg:block"
          alt="tshirt image"
        />

        <div className="invisible absolute bottom-4 left-1/2 z-20 flex w-auto -translate-x-1/2 translate-y-5 scale-0 justify-center divide-x divide-black overflow-hidden rounded-lg border border-black text-center opacity-0 transition-[opacity_transform] duration-150 ease-linear lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:scale-100 lg:group-hover:opacity-100">
          <span className="cursor-default whitespace-nowrap px-2.5 py-1 text-center font-bold">
            Quick Add
          </span>

          <button type="button" className="quickAddBtn">
            S
          </button>

          <button type="button" className="quickAddBtn">
            M
          </button>

          <button type="button" className="quickAddBtn">
            L
          </button>

          <button type="button" className="quickAddBtn">
            XL
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-center font-bold">{productInfo.product_name}</p>

        <p>N{new Intl.NumberFormat().format(Number(productInfo.price))}</p>
      </div>
    </div>
  );
}
