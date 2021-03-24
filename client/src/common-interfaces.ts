export interface Item {
  _id: string;
  productName: string;
  brand: string;
  stockQty: number;
  price: number;
  image: string;
}

export interface PaginatedItems {
  next?: number;
  previous?: null;
  limit?: number;
  total: number;
  data?: Item[];
}
