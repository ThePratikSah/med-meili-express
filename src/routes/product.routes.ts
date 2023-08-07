import { Router, Request, Response } from "express";
import { asyncHandler } from "../utils";
import { addNewProduct } from "../db/helpers/products";
import { auth } from "../middleware/authentication";
import { addProductToMeili, getProductsFromMeili } from "../utils/meilisearch";

export const router = Router();

router.post(
  "/",
  asyncHandler(auth),
  asyncHandler(async (req: Request, res: Response) => {
    const { title, description, price, sellingPrice, categoryId } = req.body;
    const { insertedId } = await addNewProduct(
      title,
      description,
      price,
      sellingPrice,
      categoryId
    );
    const r = await addProductToMeili({ id: insertedId, ...req.body });
    return res.status(201).json({ msg: "Product created", r });
  })
);

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const q = req.query.q as string;
    const result = await getProductsFromMeili(q);
    return res.status(200).json({ result });
  })
);
