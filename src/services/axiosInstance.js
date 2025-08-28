import axios from "axios";

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
}
//process.env.NEXT_PUBLIC_BASE_URL
const api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.request.use((config) => {
  const token = getCookie("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;