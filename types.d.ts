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

export interface UserFields {
  username: string;
  password: string;
  token: string;
}