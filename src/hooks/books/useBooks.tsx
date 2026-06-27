import {
  createBook,
  deleteBook,
  editBook,
  getBookById,
  getBooks,
} from "@/services/book";
import type { UpdateBook } from "@/types/ApiResponse.type";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useBooks = (
  page: number = 1,
  pageSize?: number,
  search?: string | null,
) => {
  return useQuery({
    queryKey: ["books", page, pageSize, search || null],
    queryFn: () => getBooks(page, pageSize, search || null),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
};

export const useBookById = (id: string | null) => {
  return useQuery({
    queryKey: ["books", id],
    queryFn: () => getBookById(id as string),
    staleTime: 5000,
  });
};

export const useCreateBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useEditBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, bookData }: UpdateBook) => editBook(id, bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useDeleteBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err) => {
      console.error("Error deleting book", err);
    },
  });
};
