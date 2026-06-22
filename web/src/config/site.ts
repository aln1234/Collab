const fallbackApiUrl = "http://localhost:8000/api";
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? fallbackApiUrl;

if (process.env.NODE_ENV !== "production" && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    `NEXT_PUBLIC_API_URL is not set. Falling back to ${fallbackApiUrl}.`,
  );
}

export const siteConfig = {
  name: "Connect",
  apiUrl,
};
