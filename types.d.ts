export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
  category_id: string;
}

export type ProductWithoutId = Omit<Product, 'id'>;