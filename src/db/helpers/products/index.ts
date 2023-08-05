import { db } from "../../database";

export async function addNewProduct(
  title: string,
  description: string,
  price: number,
  sellingPrice: number,
  categoryId: number,
  discountId: number
) {
  await db
    .insertInto("Product")
    .values({
      title,
      description,
      price,
      sellingPrice,
      categoryId,
      discountId,
    })
    .execute();
}
