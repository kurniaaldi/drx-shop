/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";
import ProductFilter from "@/components/filter";
import useParamsHook from "@/hooks/useParams";
import useDebounce from "@/hooks/useDebounce";

export default function ListProduct() {
  const { setParams, params, removeParams } = useParamsHook();

  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>(params?.title ?? "");

  const debounceSearch = useDebounce(searchInput, 1000);

  const fetchProducts = async () => {
    setLoading(true);

    const parameter = new URLSearchParams({
      offset: "1",
      limit: ((filters.page || 1) * 12).toString(),
    });

    if (filters.categoryId) parameter.append("categoryId", filters.categoryId);
    if (filters.minPrice) parameter.append("price_min", filters.minPrice);
    if (filters.maxPrice) parameter.append("price_max", filters.maxPrice);
    if (debounceSearch) parameter.append("title", debounceSearch);

    try {
      const res = await api.get(`/products?${parameter.toString()}`);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    setFilters({
      page: params?.page ?? 1,
      categoryId: params?.categoryId ?? "",
      minPrice: params?.minPrice ?? "",
      maxPrice: params?.maxPrice ?? "",
    });
  }, []);

  useEffect(() => {
    if (debounceSearch) {
      setParams("title", debounceSearch);
      setParams("page", 1);
      setFilters({ ...filters, page: 1 });
    } else {
      removeParams("title");
      setFilters({ ...filters, page: 1 });
    }
  }, [debounceSearch]);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        <ProductFilter
          onFilterChange={(e) => {
            setParams("categoryId", e.categoryId ? e.categoryId : 0);
            setParams("minPrice", e.minPrice ? e.minPrice : 0);
            setParams("maxPrice", e.maxPrice ? e.maxPrice : 0);
            setSearchInput("");
            setParams("page", 1);
            setFilters({ ...e, page: 1 });
          }}
        />
        <div className="col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Product List</h1>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search product..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="px-4 py-2 border rounded text-black dark:text-white dark:bg-gray-800"
              />
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-300 dark:bg-gray-700 h-40 rounded w-full"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-full">
              {products.map((prod, index) => (
                <Link key={index} href={`/product/${prod.id}`}>
                  <div className="border dark:border-gray-700 rounded p-2 hover:shadow w-full h-full bg-white dark:bg-gray-800 transition-colors hover:scale-105">
                    <img
                      src={prod.images[0]}
                      className="w-full h-40 object-cover rounded"
                      alt={prod.title}
                    />
                    <p>{prod.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      ${prod.price}
                    </p>
                  </div>
                </Link>
              ))}
              <button
                onClick={() => {
                  setParams("page", `${filters.page + 1}`);
                  setFilters({ ...filters, page: filters.page + 1 });
                }}
                className="mt-4 px-4 py-2 col-span-2 md:col-span-4 bg-blue-600 hover:bg-blue-700 text-white rounded w-full cursor-pointer"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
