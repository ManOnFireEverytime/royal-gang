"use client";

import { useQuery } from "@tanstack/react-query";
import Card from "../_components/Card";
import PageWrapper from "../_components/PageWrapper";

// Updated Product interface to match your actual data structure
interface Product {
  id: string;
  product_name: string;
  price: string; // Changed to string since your API returns it as string
  description: string;
  colors: string; // Changed to string since it's not an array in your data
  sizes: string; // Also a comma-separated string, not an array
  image1: string;
  image2: string;
  image3: string | null;
  image4: string | null;
  image5: string | null;
  created_at: string;
  category: string;
}

export default function ExploreAll() {
  const {
    data: products,
    status,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async function (): Promise<Product[]> {
      //FIXME: UPDATE API ENDPOINT
      const response = await fetch(
        "https://backend.royalgangchamber.com/getAllProducts.php",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await response.json();

      return data.data;
    },
  });

  return (
    <PageWrapper>
      <h1 className="py-4 text-center font-bold">Denim</h1>

      {status === "pending" && (
        <div className="flex justify-center py-10">
          <p>Loading products...</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex justify-center py-10">
          <p>Error loading products: {error?.message}</p>
        </div>
      )}

      {status === "success" && (
        <div className="grid grid-cols-2 place-items-center items-center justify-between lg:grid-cols-4">
          {products &&
            products.map((product) => (
              <Card key={product.id} productInfo={product} />
            ))}
        </div>
      )}
    </PageWrapper>
  );
}
