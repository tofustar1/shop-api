export interface ProductMutation {
  category: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
}

export interface CategoryMutation {
  title: string;
  description: string;
}

