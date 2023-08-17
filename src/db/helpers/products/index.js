import { collections } from "../../collections.js";
import { getDB } from "../../database.js";

export async function addNewProduct(
  title,
  description,
  price,
  sellingPrice,
  categoryId
) {
  const db = getDB();
  const product = db.collection(collections.product);
  return await product.insertOne({
    title,
    description,
    price,
    sellingPrice,
    categoryId,
  });
}

export async function getAllProducts() {
  const db = getDB();
  const product = db.collection(collections.product);
  return await product.find().toArray();
}
