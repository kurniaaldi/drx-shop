"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import Carousell from "@/components/carousell";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      api.get(`/products/${slug}`).then((res) => setProduct(res.data));
    }
  }, [slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4 relative bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white transition-colors duration-300">
      <button
        onClick={() => router.back()}
        className="absolute left-4 top-0 cursor-pointer text-blue-600 dark:text-blue-400"
      >
        ◀ Back
      </button>
      <div className="space-y-4">
        <Carousell images={product.images} />

        <div className="rounded-bl rounded-tr-none border border-gray-200 dark:border-gray-700 border-l border-b p-2 border-t-0 border-r-0">
          <p>Product Name:</p>
          <h1 className="text-xl font-bold">{product.title}</h1>
        </div>

        <div className="rounded-bl rounded-tr-none border border-gray-200 dark:border-gray-700 border-l border-b p-2 border-t-0 border-r-0">
          <p>Price:</p>
          <p className="mt-2 text-lg text-green-600 dark:text-green-400">
            ${product.price}
          </p>
        </div>

        <div className="rounded-bl rounded-tr-none border border-gray-200 dark:border-gray-700 border-l border-b p-2 border-t-0 border-r-0">
          <p>Category:</p>
          <p className="mt-2 text-lg">{product.category.name}</p>
        </div>

        <div className="rounded-bl rounded-tr-none border border-gray-200 dark:border-gray-700 border-l border-b p-2 border-t-0 border-r-0">
          <p>Description:</p>
          <p className="mt-2">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
