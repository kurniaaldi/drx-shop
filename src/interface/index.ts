export interface BaseServerSideInterface {
  page?: number;
  keyword?: string;
  CategoryId?: string;
  MinPrice?: string;
  MaxPrice?: string;
}

export interface PropsServerside {
  searchParams: BaseServerSideInterface;
}

export interface ProductModuleProps {
  defaultPage?: number;
  defaultKeyword?: string;
  defaultCategoryId?: string;
  defaultMinPrice?: string;
  defaultMaxPrice?: string;
}
