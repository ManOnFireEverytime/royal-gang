"use client";

import { useQuery } from "@tanstack/react-query";
import Card from "../_components/Card";
import PageWrapper from "../_components/PageWrapper";

// Define the Product interface
interface Product {
  id: string;
  // Add other product properties as needed
}

export default function ExploreAll() {
  const { data: products, status, error } = useQuery({
    queryKey: ["products"],
    queryFn: async function (): Promise<Product[]> {
      const response = await fetch(
        "https://backend.royalgangchambers.com/getAllProducts.php",
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
      <h1 className="py-4 text-center font-bold">ALL PRODUCTS</h1>
      
      {status === "loading" && (
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
          {products.map((product) => (
            <Card key={product.id} productInfo={product} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}