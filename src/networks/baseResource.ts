import type { Fetcher } from "swr";

const RAPIDAPI_URL = import.meta.env.VITE_RAPIDAPI_URL;
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

export const fetcher: Fetcher<any, string> = (url) =>
  fetch(RAPIDAPI_URL + url, {
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
    },
  }).then((res) => res.json());
