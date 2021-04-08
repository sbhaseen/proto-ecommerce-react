export interface Item {
  _id?: string;
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

export interface UserStoredData {
  id: string;
  email: string;
  name: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
