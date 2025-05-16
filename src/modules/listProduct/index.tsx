"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";

export default function ListProduct() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await api.get(`/products?offset=${(page - 1) * 10}&limit=10`);
    setProducts((prev) => [...prev, ...res.data]);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((prod) => (
          <Link key={prod.id} href={`/product/${prod.id}`}>
            <div className="border rounded p-2 hover:shadow">
              <img src={prod.images[0]} className="w-full h-32 object-cover" />
              <p>{prod.title}</p>
              <p className="text-sm text-gray-500">${prod.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={() => setPage((p) => p + 1)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Load More
      </button>
    </div>
  );
}
