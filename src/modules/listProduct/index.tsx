"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";
import ProductFilter from "@/components/filter";

export default function ListProduct() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      offset: ((page - 1) * 10).toString(),
      limit: "10",
    });

    if (filters.categoryId) params.append("categoryId", filters.categoryId);
    if (filters.minPrice) params.append("price_min", filters.minPrice);
    if (filters.maxPrice) params.append("price_max", filters.maxPrice);

    const res = await api.get(`/products?${params.toString()}`);
    setProducts(page === 1 ? res.data : (prev) => [...prev, ...res.data]);
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="p-4">
      <ProductFilter onFilterChange={setFilters} />
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-40 rounded w-full"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((prod) => (
            <Link key={prod.id} href={`/product/${prod.id}`}>
              <div className="border rounded p-2 hover:shadow">
                <img
                  src={prod.images[0]}
                  className="w-full h-32 object-cover"
                />
                <p>{prod.title}</p>
                <p className="text-sm text-gray-500">${prod.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <button
        onClick={() => setPage((p) => p + 1)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Load More
      </button>
    </div>
  );
}
