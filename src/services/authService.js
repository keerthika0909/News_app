import { request } from "./api";

export const registerUser = (data) =>
  request("/auth/register", "POST", data);

export const loginUser = (data) =>
  request("/auth/login", "POST", data);