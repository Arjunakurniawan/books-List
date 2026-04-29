import api from "./api/api";
import type { ApiResponse, UserResponse } from "@/types/ApiResponse.type";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post<ApiResponse<UserResponse>>(
      "/auth/register",
      userData,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post<ApiResponse<UserResponse>>(
      "/auth/login",
      credentials,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
