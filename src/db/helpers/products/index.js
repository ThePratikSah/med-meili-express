import { getDB } from "../../database.js";

export async function addNewProduct(
  title,
  description,
  price,
  sellingPrice,
  categoryId
) {
  const db = getDB();
  const product = db.collection("Product");
  return await product.insertOne({
    title,
    description,
    price,
    sellingPrice,
    categoryId,
  });
}
