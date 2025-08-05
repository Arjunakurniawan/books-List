export type Book = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  price: number;
  stock: number;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
};

export type BookResponse = {
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  category: CategoryResponse;
};

export type CategoryResponse = {
  name: string;
};

export type ApiResponse<T> = {
  data: T;
  message: string | null;
};
