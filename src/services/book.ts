import type { ApiResponse, BookResponse } from "@/types/ApiResponse.type";
import api from "./api/api";

export const getBooks = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await api.get<ApiResponse<BookResponse[]>>(
      `/books?page=${page}&limit=${limit}`,
    );
    return {
      data: response.data.data,
      total: response.data.total,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getBookById = async (id: string) => {
  try {
    const response = await api.get<ApiResponse<BookResponse>>(`/book/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
};

export const createBook = async (books: BookResponse) => {
  try {
    const response = await api.post<ApiResponse<BookResponse>>(
      "/book/create",
      books,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

export const editBook = async (
  id: string,
  bookData: {
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
    categoryId: string;
  },
) => {
  try {
    const response = await api.put(`/book/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await api.delete(`/book/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};
