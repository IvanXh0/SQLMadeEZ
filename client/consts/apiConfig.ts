const API_BASE_URLS: Record<string, string> = {
  development: "http://localhost:3000/api",
  production: "tba",
};

const { NODE_ENV } = process.env;

export const API_BASE_URL =
  API_BASE_URLS[NODE_ENV] ?? API_BASE_URLS.development;
