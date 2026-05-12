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

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
};

export type UserResponse = {
  username: string;
  password: string;
  email: string;
  role: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ApiResponse<T> = {
  data: T;
  message: string | null;
  total: number;
  pagination?: {
    page: number;
    limit: number;
  };
};

export type LoginResponse = ApiResponse<UserResponse>;

export type RegisterResponse = ApiResponse<UserResponse>;

export type LogoutResponse = ApiResponse<null>
