const BASE_URL = "newsapp-production-1704.up.railway.app";

export const request = async (
  url,
  method = "GET",
  body,
  token
) => {

  const res = await fetch(BASE_URL + url, {

    method,

    headers: {
      "Content-Type": "application/json",

      Authorization: token
        ? `Bearer ${token}`
        : ""
    },

    body: body
      ? JSON.stringify(body)
      : null
  });

  return res.json();
};