import api from "./api/api";
import type {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/types/ApiResponse.type";

export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await api.post<RegisterResponse>(
      "/auth/register",
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (payload: LoginPayload) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", payload);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post<LogoutResponse>("/auth/logout")
    return response.data
  } catch (error) {
    console.error("Error Logout", error)
  }
}
