"use client";

import { useRef } from "react";

import Link from "next/link";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import heroimage from "../public/heroimage.webp";
import royalImage1 from "../public/royalImage1.webp";
import royalImage2 from "../public/royalImage2.webp";
import royalGangImage from "../public/royalGangLogo.webp";

import Card from "./_components/Card";
import Footer from "./_components/footer";
import { CaretLeft, CaretRight } from "./_components/Arrow-left";

import { Product } from "./_types/product";
import LoadingSpinner from "./_components/loadingSpinner";

export default function Home() {
  const bestSeller = useRef<HTMLDivElement>(null);

  const { data: products, status } = useQuery({
    queryKey: ["products"],

    queryFn: async function (): Promise<Product[]> {
      const response = await fetch(
        "https://backend.royalgangchambers.com/getNewProducts.php",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await response.json();

      return data.data;
    },
  });

  function scrollRight() {
    bestSeller.current?.scrollBy({ left: 300, behavior: "smooth" });
  }

  function scrollLeft() {
    bestSeller.current?.scrollBy({ left: -300, behavior: "smooth" });
  }

  return (
    <main className="z-10 text-white">
      <section className="relative flex h-dvh w-full py-5">
        <Image
          src={heroimage}
          fill
          alt="hero image"
          className="z-5 object-cover"
          quality={100}
          placeholder="blur"
        />

        <div className="z-10 flex w-full items-center justify-center gap-x-2 self-end px-4 text-xs lg:px-16">
          <div>
            <Image
              src={royalGangImage}
              alt="logo image"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/*render the new in products here*/}
      <section className="w-full overflow-hidden py-8">
        <h2 className="mb-2 text-center text-2xl font-medium text-saddleBrown">
          NEW IN
        </h2>

        <div className="scrollbar-hidden flex w-full justify-items-center gap-x-4 gap-y-8 overflow-auto md:grid md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:gap-8">
          {/* change to a better loading ui */}
          {status === "pending" && <LoadingSpinner />}

          {status === "success" &&
            products.map((product) => {
              return <Card key={product.id} productInfo={product} />;
            })}
        </div>
      </section>

      <section className="relative flex w-full">
        <Image
          src={royalImage1}
          alt="image"
          placeholder="blur"
          className="object-cover"
        />

        <Link
          href={"/explore"}
          className="absolute bottom-5 left-1/2 mx-auto flex w-[75px] -translate-x-1/2 items-center justify-center rounded-lg border-2 border-white p-2 text-center text-sm font-bold transition-colors duration-150 hover:bg-white hover:text-saddleBrown lg:bottom-16 lg:h-[50px] lg:w-[150px] lg:text-base"
        >
          SHOP
        </Link>
      </section>

      {/*render the best seller products here */}
      <section className="w-full overflow-hidden py-10">
        <h2 className="mb-2 text-center text-2xl font-medium text-saddleBrown">
          BESTSELLERS
        </h2>

        <div className="flex w-full items-center gap-4 px-4">
          <button title="scrollRight" type="button" onClick={scrollLeft}>
            <CaretLeft className="hidden md:block" />
          </button>

          <div
            ref={bestSeller}
            className="scrollbar-hidden flex flex-grow gap-x-4 gap-y-8 overflow-auto py-4 lg:gap-2"
          >
            {status === "pending" && <LoadingSpinner />}

            {status === "success" &&
              products.map((product) => {
                return <Card key={product.id} productInfo={product} />;
              })}
          </div>

          <button title="scrollRight" type="button" onClick={scrollRight}>
            <CaretRight className="hidden md:block" />
          </button>
        </div>
      </section>

      <section className="flex flex-col md:h-dvh md:flex-row">
        <div className="relative h-[600px] md:h-full md:basis-1/2">
          <Image
            placeholder="blur"
            src={royalImage2}
            fill
            className="object-cover"
            alt="image"
          />
        </div>

        <div className="space-y-8 px-8 pb-8 pt-8 text-center text-black md:h-full md:basis-1/2 md:px-10 md:pb-0 md:pt-20 md:text-left lg:px-20">
          <h2 className="text-3xl font-extrabold text-saddleBrown">About Us</h2>

          <p className="text-base">
            For those who defy convention and rewrite the rules, a sovereign
            spirit awaits. Royal Gang exceeds mere fashion. It’s a coronation of
            individuality, where heritage meets audacity. unleash your inner
            monarch and let each garment becomes a royal decree, a statement
            crafted with confidence and unwavering self - expression. Join the
            court of the unconventional here , amongst kindred spirit, you
            ascend to your rightful throne
          </p>

          <Link
            href={"/explore"}
            className="flex h-[50px] w-full items-center justify-center rounded-lg border-2 border-saddleBrown p-2 text-center font-bold text-saddleBrown md:w-[150px]"
          >
            SHOP
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
