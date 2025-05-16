import ListProduct from "@/modules/listProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
};

export default function Home() {
  return <ListProduct />;
}
