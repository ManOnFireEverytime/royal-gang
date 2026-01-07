"use client";

import { useQuery } from "@tanstack/react-query";
import Card from "../_components/Card";
import PageWrapper from "../_components/PageWrapper";
import { Product } from "../_types/product";

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
      <h1 className="py-4 text-center font-bold">Essentials</h1>

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
