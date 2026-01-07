"use client";

import { useState } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { Minus, Plus, X } from "lucide-react";

import { useCart } from "@/app/Context/CartContext";

import Card from "@/app/_components/Card";
import PageWrapper from "@/app/_components/PageWrapper";

import { Product } from "@/app/_types/product";

import tshirtBack from "../../../public/embrace.webp";

const backendBaseUrl = "https://backend.royalgangchamber.com/products/";

export default function Page() {
  const params = useParams();
  const productId = params.productId;
  const [showSizeChartModal, setShowSizeChartModal] = useState(false);

  const { data: products, status } = useQuery({
    queryKey: ["single-product", `product-${productId}`],

    queryFn: async function (): Promise<{
      product: Product;
      similarProducts: Product[];
    }> {
      const [productReq, similarProductsReq] = await Promise.all([
        fetch(
          `https://backend.royalgangchamber.com/getProductById.php?id=${productId}`,
        ),
        fetch(`https://backend.royalgangchamber.com/getNewProducts.php`),
      ]);

      if (!productReq.ok || !similarProductsReq.ok) {
        throw new Error("Failed to fetch products.");
      }

      const [productData, similarProductsData] = await Promise.all([
        productReq.json(),
        similarProductsReq.json(),
      ]);

      return {
        product: productData.data,
        similarProducts: similarProductsData.data,
      };
    },
  });

  console.log(products);
  const { addToCart } = useCart();

  // State declarations organized at the top
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(1);

  // Event handlers
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colorValue = e.target.value;

    setSelectedColor(colorValue);
  };

  const handleAddToCart = () => {
    if (!products) return;

    if (!selectedSize) {
      setCartMessage("Please select a size");

      setTimeout(() => {
        setCartMessage("");
      }, 3000);

      return;
    }

    const productDetails = {
      id: products.product.id,
      name: products.product.product_name,
      price: products.product.price,
      image: products.product.image1,
      color: selectedColor,
      size: selectedSize,
    };

    addToCart(productDetails, quantity);

    // Add to cart logic would go here
    setCartMessage(
      `${quantity} ${products.product.product_name} (${selectedSize}, ${
        selectedColor ? selectedColor : "No Color"
      }) added to cart`,
    );

    // Clear message after 3 seconds
    setTimeout(() => {
      setCartMessage("");
    }, 3000);
  };

  const showSizeChart = () => {
    setShowSizeChartModal(true);
  };

  const getImageSrc = (imageNumber: number) => {
    if (!products) return tshirtBack;

    const imageKey = `image${imageNumber}` as keyof Product;
    const imagePath = products.product[imageKey];

    return `${backendBaseUrl}${imagePath}`;
  };

  return (
    <PageWrapper>
      {status === "pending" && (
        <div className="flex h-full w-full items-center justify-center">
          <p>Loading...</p>
        </div>
      )}

      {status === "success" && (
        <>
          <div className="flex flex-col items-center gap-y-8 px-4 pb-20 lg:flex-row lg:px-10">
            <div className="flex w-full flex-col gap-4 lg:basis-1/2">
              {/* Main Product Image */}
              <div className="relative h-[500px] w-full">
                <Image
                  src={getImageSrc(selectedImage)}
                  fill
                  alt="product view"
                  className="object-contain"
                />
              </div>

              {/* Thumbnail Images - Horizontal */}
              <div className="scrollbar flex gap-2 overflow-auto lg:gap-4">
                {[1, 2, 3, 4, 5].map((imageNum) => {
                  const imageSrc = getImageSrc(imageNum);
                  const imageKey = `image${imageNum}` as keyof Product;
                  const hasImage = products.product[imageKey];

                  // Only show thumbnail if image exists
                  if (!hasImage && imageNum !== 1) return null;

                  return (
                    <button
                      key={imageKey}
                      type="button"
                      onClick={() => setSelectedImage(imageNum)}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all lg:h-24 lg:w-24 ${
                        selectedImage === imageNum
                          ? "border-saddleBrown"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={imageSrc}
                        fill
                        alt={`product view ${imageNum}`}
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="basis-1/2 space-y-8 self-start p-2 lg:p-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight lg:text-5xl">
                  {products.product.product_name}
                </h1>

                <p className="text-muted-foreground text-lg font-semibold lg:text-2xl">
                  ₦&nbsp;
                  {typeof products.product.price === "string"
                    ? Number(products.product.price).toLocaleString()
                    : products.product.price}
                </p>
              </div>

              <p className="text-muted-foreground w-full lg:max-w-[70%]">
                {products.product.description ||
                  "Product description unavailable"}
              </p>

              {/* Cart message alert */}
              {cartMessage && (
                <div className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                  {cartMessage}
                </div>
              )}

              <div className="space-y-6 lg:space-y-4">
                {/* Size Selection */}
                <div className="space-y-4">
                  <h3 className="mb-2 text-sm font-medium">Size</h3>

                  <div className="w-fit space-y-4">
                    <div className="flex gap-3">
                      {products.product.sizes?.split(",").length > 0 ? (
                        products.product.sizes.split(",").map((size) => (
                          <button
                            type="button"
                            key={size}
                            className={`h-12 w-12 rounded-md ${
                              selectedSize === size
                                ? "bg-saddleBrown text-white"
                                : "bg-[#F9F1E7]"
                            } transition-colors duration-150`}
                            onClick={() => handleSizeSelect(size)}
                          >
                            {size}
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No sizes available
                        </p>
                      )}
                    </div>

                    {products.product.size_chart && (
                      <button
                        onClick={showSizeChart}
                        className="w-full rounded-md border border-saddleBrown bg-transparent px-4 py-2 text-sm text-saddleBrown transition-colors duration-150 hover:bg-saddleBrown hover:text-white"
                      >
                        Size Chart
                      </button>
                    )}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-1">
                  <h3 className="mb-2 text-sm font-medium">Color</h3>

                  {products.product.colors?.split(",").length > 0 ? (
                    <select
                      title="color"
                      className="w-full rounded-md border p-2 text-left outline-none lg:w-[40%]"
                      onChange={handleColorChange}
                      value={selectedColor}
                    >
                      <option value="" disabled>
                        Choose a color
                      </option>

                      {products.product.colors?.split(",").map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm text-gray-500">No colors available</p>
                  )}
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex gap-4">
                  <div className="flex items-center rounded-md border px-1">
                    <button
                      type="button"
                      className="rounded-none"
                      onClick={decreaseQuantity}
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <div className="w-24 py-2 text-center">{quantity}</div>

                    <button
                      title="increase"
                      type="button"
                      className="rounded-none"
                      onClick={increaseQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="flex-1 rounded-md bg-saddleBrown text-white"
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 border-t border-black pt-6">
            <h2 className="text-center text-sm font-bold text-muted">
              You May Also Like
            </h2>

            <div className="scrollbar-hidden flex gap-x-4 overflow-auto lg:px-0">
              {products.similarProducts.length > 0
                ? products.similarProducts.map((product) => (
                    <Card
                      key={product.id}
                      productInfo={{
                        ...product,
                      }}
                    />
                  ))
                : null}
            </div>

            {/* Size Chart Modal */}
            {showSizeChartModal && products.product.size_chart && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative mx-4 w-full min-w-[300px] max-w-4xl rounded-lg bg-white p-4 sm:p-6 lg:min-w-[600px]">
                  <div className="relative flex items-center justify-center">
                    <h2 className="mb-4 text-xl font-bold">Size Chart</h2>

                    <button
                      onClick={() => setShowSizeChartModal(false)}
                      className="absolute right-0 top-0 rounded-full p-1 hover:bg-gray-100"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="relative h-96 w-full">
                    <Image
                      src={products.product.size_chart}
                      fill
                      alt="Size Chart"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </PageWrapper>
  );
}
