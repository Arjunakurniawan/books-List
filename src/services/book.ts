import type { ApiResponse, BookResponse } from "@/types/ApiResponse.type";
import api from "./api/api";

export const getBooks = async () => {
  try {
    const response = await api.get<ApiResponse<BookResponse[]>>("/books");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// export const getBookById = async (id: string) => {
//   try {
//     const response = await api.get(`/books/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching book with id ${id}:`, error);
//     throw error;
//   }
// };

export const createBook = async (books: BookResponse) => {
  try {
    const response = await api.post<ApiResponse<BookResponse>>(
      "/book/create",
      books
    );
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

// export const updateBook = async (id: string, bookData: any) => {
//   try {
//     const response = await api.put(`/books/${id}`, bookData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating book with id ${id}:`, error);
//     throw error;
//   }
// };

export const deleteBook = async (id: string) => {
  try {
    const response = await api.delete(`/book/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};
