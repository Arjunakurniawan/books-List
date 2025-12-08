export type Book = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  price: number;
  stock: number;
  category: Category | null;
};

export type Category = {
  id: string;
  name: string;
};

export type BookResponse = {
  id?: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  categoryId: string;
};

export type CategoryResponse = {
  id?: string;
  name: string;
};

export type ApiResponse<T> = {
  data: T;
  message: string | null;
};
