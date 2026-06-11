import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "@/services/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategories = (searchQuery: string | null) => {
  return useQuery({
    queryKey: ["categories", searchQuery],
    queryFn: () => getCategories(searchQuery),
    staleTime: 5000,
  });
};

export const useCreateCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      editCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      console.error("Error deleting Category", err);
    },
  });
};
