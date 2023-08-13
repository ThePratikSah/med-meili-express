import { MeiliSearch } from "meilisearch";
import { env } from "../config/env.js";

const client = new MeiliSearch({
  host: env.MEILI_SEARCH_HOST,
  apiKey: env.MEILI_SEARCH_API,
});

export async function addProductToMeili(product) {
  return await client
    .index("products")
    .addDocuments(product, { primaryKey: "id" });
}

export async function getProductsFromMeili(query) {
  return await client.index("products").search(query);
}
