import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { ApiError, type ApiErrorBody } from "@/types/api";

const MAX_RETRIES = 2;

interface RetryConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

function normalizeError(error: AxiosError<ApiErrorBody>): ApiError {
  const status = error.response?.status ?? 0;
  const body = error.response?.data;
  const message =
    body?.error ?? body?.message ?? error.message ?? "Something went wrong. Please try again.";
  return new ApiError(message, status, body);
}

/** Single axios instance — all feature services go through this. */
export const api = axios.create({
  baseURL: "/api",
  timeout: 30_000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const config = error.config as RetryConfig | undefined;
    const status = error.response?.status;

    if (
      config &&
      (!status || status >= 500) &&
      (config._retryCount ?? 0) < MAX_RETRIES
    ) {
      config._retryCount = (config._retryCount ?? 0) + 1;
      const delay = 1000 * config._retryCount;
      await new Promise((r) => setTimeout(r, delay));
      return api.request(config);
    }

    return Promise.reject(normalizeError(error));
  }
);
