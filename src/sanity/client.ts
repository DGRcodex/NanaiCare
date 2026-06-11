import { createClient } from "next-sanity";

export const projectId = "qto42q00";
export const dataset = "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to true for production once data is stable
});
