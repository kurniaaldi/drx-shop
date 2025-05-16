"use client";

import { useParams } from "next/navigation";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const params = useParams();
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
    <div className="p-4">
      <h1 className="text-xl font-bold">{product.title}</h1>
      <img
        src={product.images[0]}
        className="w-full max-w-md h-64 object-cover mt-2"
      />
      <p className="mt-2 text-lg text-green-600">${product.price}</p>
      <p className="mt-2">{product.description}</p>
    </div>
  );
}
