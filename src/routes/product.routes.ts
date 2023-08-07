import { Router, Request, Response } from "express";
import { asyncHandler } from "../utils";
import { addNewProduct } from "../db/helpers/products";
import { auth } from "../middleware/authentication";

export const router = Router();

router.post(
  "/",
  asyncHandler(auth),
  asyncHandler(async (req: Request, res: Response) => {
    const { title, description, price, sellingPrice, categoryId, discountId } =
      req.body;
    await addNewProduct(
      title,
      description,
      price,
      sellingPrice,
      categoryId,
      discountId
    );
    return res.status(201).json({ msg: "Product created" });
  })
);
