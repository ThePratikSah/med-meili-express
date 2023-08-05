import { db } from "../../database";

export async function addNewDiscount(
  title: string,
  desc: string | null,
  discountPercent: number,
  active: boolean
) {
  await db
    .insertInto("Discount")
    .values({
      title,
      desc,
      discountPercent,
      active,
    })
    .execute();
}
