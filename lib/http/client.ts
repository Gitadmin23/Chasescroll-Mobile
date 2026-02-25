import { showFlash } from "@/lib/flash/flash";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export const http = axios.create({
  baseURL,
  timeout: 15000,
});

http.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("authToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message = "Something went wrong";
    if (
      error.response?.data?.message &&
      typeof error.response.data.message === "string"
    ) {
      message = error.response.data.message;
    } else if (error.response?.status) {
      message = `Request failed (${error.response.status})`;
    } else if (error.message) {
      message = error.message;
    }
    showFlash(message, "error");
    return Promise.reject(error);
  },
);
