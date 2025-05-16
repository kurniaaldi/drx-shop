/* eslint-disable react-hooks/exhaustive-deps */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";
import ProductFilter from "@/components/filter";
import { ProductModuleProps } from "@/app/page";
import useParamsHook from "@/hooks/useParams";

export default function ListProduct({ props }: { props: ProductModuleProps }) {
  const { setParams } = useParamsHook();

  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(props?.defaultPage ?? 1);
  const [filters, setFilters] = useState<any>({
    categoryId: props?.defaultCategoryId,
    minPrice: props?.defaultMinPrice,
    maxPrice: props?.defaultMaxPrice,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    const parameter = new URLSearchParams({
      offset: ((page - 1) * 12).toString(),
      limit: "12",
    });

    if (filters.categoryId) parameter.append("categoryId", filters.categoryId);
    if (filters.minPrice) parameter.append("price_min", filters.minPrice);
    if (filters.maxPrice) parameter.append("price_max", filters.maxPrice);

    const res = await api.get(`/products?${parameter.toString()}`);
    setProducts(page === 1 ? res.data : (prev) => [...prev, ...res.data]);
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        <ProductFilter
          onFilterChange={(e) => {
            setParams("categoryId", e.categoryId ? e.categoryId : 0);
            setParams("minPrice", e.minPrice ? e.minPrice : 0);
            setParams("maxPrice", e.maxPrice ? e.maxPrice : 0);
            setParams("page", 1);
            setFilters(e);
          }}
        />
        <div className="col-span-3">
          <h1 className="text-xl font-bold mb-4">Product List</h1>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-40 rounded w-full"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-full">
              {products.map((prod) => (
                <Link key={prod.id} href={`/product/${prod.id}`}>
                  <div className="border rounded p-2 hover:shadow w-full h-full">
                    <img
                      src={prod.images[0]}
                      className="w-full h-40 object-cover"
                    />
                    <p>{prod.title}</p>
                    <p className="text-sm text-gray-500">${prod.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <button
            onClick={() => {
              setParams("page", `${page + 1}`);
              setPage((p) => p + 1);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded w-full"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
