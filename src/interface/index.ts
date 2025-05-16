export interface BaseServerSideInterface {
  page?: string;
  keyword?: string;
  CategoryId?: string;
  MinPrice?: string;
  MaxPrice?: string;
}

export interface PropsServerside {
  searchParams: BaseServerSideInterface;
}
