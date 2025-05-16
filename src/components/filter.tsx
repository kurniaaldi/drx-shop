import { useEffect, useState } from "react";

type Props = {
  onFilterChange: (filters: {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
};

export default function ProductFilter({ onFilterChange }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleApply = () => {
    onFilterChange({ categoryId, minPrice, maxPrice });
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
      <select
        className="border p-2 rounded"
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
        className="border p-2 rounded w-32"
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="border p-2 rounded w-32"
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
      <button
        onClick={handleApply}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </div>
  );
}
