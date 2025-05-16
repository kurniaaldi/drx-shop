import { PropsServerside } from "@/interface";
import ListProduct from "@/modules/listProduct";
import { Metadata, NextPage } from "next";

export interface ProductModuleProps {
  defaultPage?: number;
  defaultKeyword?: string;
  defaultCategoryId?: string;
  defaultMinPrice?: string;
  defaultMaxPrice?: string;
}

export const metadata: Metadata = {
  title: "Product",
};

const Page: NextPage<PropsServerside> = async (props) => {
  const page = Number(props.searchParams.page ?? 1);
  const keyword = props.searchParams.keyword ?? "";
  const CategoryId = props.searchParams.CategoryId ?? "";
  const MinPrice = props.searchParams.MinPrice ?? "";
  const MaxPrice = props.searchParams.MaxPrice ?? "";

  return (
    <ListProduct
      props={{
        defaultPage: page,
        defaultKeyword: keyword,
        defaultCategoryId: CategoryId,
        defaultMinPrice: MinPrice,
        defaultMaxPrice: MaxPrice,
      }}
    />
  );
};

export default Page;
