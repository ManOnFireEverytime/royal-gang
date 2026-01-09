"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Card from "@/app/_components/Card";
import PageWrapper from "@/app/_components/PageWrapper";
import { Product } from "@/app/_types/product";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.categoryId as string;

  // Fetch category details
  const { data: category, status: categoryStatus } = useQuery({
    queryKey: ["category", categorySlug],
    queryFn: async function (): Promise<Category> {
      const response = await fetch(
        `https://backend.royalgangchamber.com/getCategory.php?slug=${categorySlug}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch category.");
      }

      const data = await response.json();
      return data.data;
    },
  });

  // Fetch products by category
  const {
    data: products,
    status: productsStatus,
    error,
  } = useQuery({
    queryKey: ["products", categorySlug],
    queryFn: async function (): Promise<Product[]> {
      const response = await fetch(
        `https://backend.royalgangchamber.com/getProductsByCategory.php?slug=${categorySlug}`
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
      <div className="py-4">
        {categoryStatus === "pending" ? (
          <h1 className="text-center font-bold">Loading...</h1>
        ) : categoryStatus === "error" ? (
          <h1 className="text-center font-bold">Category</h1>
        ) : (
          <h1 className="text-center font-bold">{category?.name}</h1>
        )}
      </div>

      {productsStatus === "pending" && (
        <div className="flex justify-center py-10">
          <p>Loading products...</p>
        </div>
      )}

      {productsStatus === "error" && (
        <div className="flex justify-center py-10">
          <p>Error loading products: {error?.message}</p>
        </div>
      )}

      {productsStatus === "success" && (
        <>
          {products && products.length > 0 ? (
            <div className="grid grid-cols-2 place-items-center items-center justify-between lg:grid-cols-4">
              {products.map((product) => (
                <Card key={product.id} productInfo={product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-10">
              <p className="text-gray-500">
                No products available in this category yet.
              </p>
            </div>
          )}
        </>
      )}
    </PageWrapper>
  );
}