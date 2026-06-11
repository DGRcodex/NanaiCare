import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";
import { projectId, dataset } from "./src/sanity/client";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "NanaiCare Blog Studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
