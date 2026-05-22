import {
  createCategory,
  deleteCategory,
  getCategories,
} from "@/services/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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
