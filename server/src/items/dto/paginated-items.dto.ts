import { Item } from "../schemas/item.schema";

export class PaginatedItems {
  next?: number;
  previous?: number;
  limit?: number;
  total?: { items: number; pages: number };
  data?: Item[];
}
