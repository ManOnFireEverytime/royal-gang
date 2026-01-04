"use client";

import { useRef } from "react";

import Link from "next/link";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import heroimage from "../public/hero-image.webp";
import royalImage1 from "../public/image-2.webp";
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
        "https://backend.royalgangchamber.com/getNewProducts.php",
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
          fill
          quality={100}
          alt="hero image"
          src={heroimage}
          className="z-5 object-cover"
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
      <section className="w-full space-y-2 overflow-hidden py-8">
        <h2 className="text-center text-2xl font-medium text-saddleBrown">
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
          <button
            className="hidden md:block"
            title="scrollLeft"
            type="button"
            onClick={scrollLeft}
          >
            <CaretLeft />
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

          <button
            className="hidden md:block"
            title="scrollRight"
            type="button"
            onClick={scrollRight}
          >
            <CaretRight />
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

        <div className="flex items-center px-4 py-8 text-black md:h-full md:basis-1/2 md:px-10 md:py-0 md:pt-20 lg:px-20">
          <div className="space-y-8 text-center md:text-left">
            <h2 className="text-3xl font-extrabold uppercase text-saddleBrown">
              About Us
            </h2>

            <p className="text-lg">
              Royal Gang is for those who move with quiet authority. We create
              elevated streetwear built on confidence, culture, and presence
              pieces designed to feel intentional the moment you put them on.
              From clean silhouettes to bold statements, every garment is
              crafted as a rightful standard. Quiet, deliberate and undeniable.
              Welcome to the court of the unconventional. Step in and ascend to
              your rightful throne.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
