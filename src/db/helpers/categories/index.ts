import { db } from "../../database";

export async function getAllCategories() {
  let query = db.selectFrom("Category");
  return await query.selectAll().execute();
}

export async function addNewCategory(
  title: string,
  desc: string,
  imageUrl: string
) {
  await db
    .insertInto("Category")
    .values({
      title,
      desc,
      imageUrl,
    })
    .execute();
}
