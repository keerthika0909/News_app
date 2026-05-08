import { request } from "./api";

export const getTopNews = () => request("/news/top");

export const searchNews = (q) =>
  request(`/news/search?q=${q}`);