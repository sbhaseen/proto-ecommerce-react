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

export interface UserDataInterface {
  email: string;
  password: string;
}

export interface RegisterUserInterface extends UserDataInterface {
  name: string;
  email: string;
  password: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
