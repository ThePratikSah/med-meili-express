import { getDB } from "../../database";

export async function getAllCategories() {
  const db = getDB();
  const category = db.collection("Category");
  return await category.find().toArray();
}

export async function addNewCategory(
  title: string,
  desc: string,
  imageUrl: string
) {
  const db = getDB();
  const category = db.collection("Category");
  return await category.insertOne({
    title,
    desc,
    imageUrl,
  });
}
