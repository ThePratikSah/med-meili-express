import { getDB } from "../../database.js";

export async function getAllCategories() {
  const db = getDB();
  const category = db.collection("Category");
  return await category.find().toArray();
}

export async function addNewCategory(title, desc, imageUrl) {
  const db = getDB();
  const category = db.collection("Category");
  return await category.insertOne({
    title,
    desc,
    imageUrl,
  });
}

export async function addMultipleCategories(categories) {
  const db = getDB();
  const category = db.collection("Category");
  return await category.insertMany(categories);
}
