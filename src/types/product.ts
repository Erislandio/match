import { Category } from "./category";

export interface Product {
  id: string;
  price: number;
  title: string;
  slug: string;
  quantity: string;
  available: number;
  identifier: string;
  description: string;
  image: ProductImage[];
  category: Category;
  strapiProductId: string;
}

export interface ProductImage {
  id: string;
  url: string;
}
