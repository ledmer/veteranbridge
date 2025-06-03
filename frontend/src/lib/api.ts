import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000",
});

// 把 access token 注入头部
export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// 过期时自动刷新
api.interceptors.response.use(
  (r) => r,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) return Promise.reject(error);
      error.config._retry = true;
      try {
        const { data } = await api.post("/api/token/refresh/", { refresh });
        localStorage.setItem("access", data.access);
        setAuthToken(data.access);
        error.config.headers.Authorization = `Bearer ${data.access}`;
        return api(error.config);
      } catch {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
