const API_BASE_URLS: Record<string, string> = {
  development: "http://localhost:3000/api",
  production: "tba",
};

const ENV = process.env.NODE_ENV;

export const API_BASE_URL = API_BASE_URLS[ENV] ?? API_BASE_URLS.development;
