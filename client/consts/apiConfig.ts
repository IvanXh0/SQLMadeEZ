const ENV = process.env.NODE_ENV;
const DEVELOPMENT_URL = process.env.NEXT_PUBLIC_DEVELOPMENT_URL;
const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL;

if (!ENV || !DEVELOPMENT_URL || !PRODUCTION_URL)
  throw new Error("Missing env vars");

const API_BASE_URLS: Record<string, string> = {
  development: DEVELOPMENT_URL,
  production: PRODUCTION_URL,
};

export const API_BASE_URL = API_BASE_URLS[ENV] ?? API_BASE_URLS.development;
