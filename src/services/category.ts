import type { ApiResponse, CategoryResponse } from "@/types/ApiResponse.type";
import api from "./api/api";

export const getCategories = async () => {
  try {
    const response = await api.get<ApiResponse<CategoryResponse[]>>(
      "/categories"
    );
    console.log("Fetched categories:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Create new category
export const createCategory = async (categoryData: CategoryResponse) => {
  try {
    const response = await api.post<ApiResponse<CategoryResponse>>(
      "/category/create",
      categoryData
    );
    console.log("Created category:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
