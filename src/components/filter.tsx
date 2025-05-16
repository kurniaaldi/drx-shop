/* eslint-disable @typescript-eslint/no-explicit-any */
import useParamsHook from "@/hooks/useParams";
import { useEffect, useState } from "react";

type Props = {
  onFilterChange: (filters: {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
};

export default function ProductFilter({ onFilterChange }: Props) {
  const { params } = useParamsHook();

  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<any | number>(
    params.categoryId ?? 0,
  );
  const [minPrice, setMinPrice] = useState<any | number>(params.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = useState<any | number>(params.maxPrice ?? 0);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleApply = () => {
    onFilterChange({ categoryId, minPrice, maxPrice });
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="border border-gray-400 dark:border-gray-600 rounded p-4 space-y-4 w-full bg-white dark:bg-gray-800">
        <select
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded w-full"
          onChange={(e) => setCategoryId(Number(e.target.value))}
          defaultValue=""
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded w-full"
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded w-full"
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <button
          onClick={handleApply}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
