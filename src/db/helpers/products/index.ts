import { getDB } from "../../database";

export async function addNewProduct(
  title: string,
  description: string,
  price: number,
  sellingPrice: number,
  categoryId: number
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
