import { request } from "./api";

export const addFavourite = (data, token) =>
  request("/fav", "POST", data, token);

export const getFavourites = (token) =>
  request("/fav", "GET", null, token);

export const deleteFavourite = (id, token) =>
  request(`/fav/${id}`, "DELETE", null, token);