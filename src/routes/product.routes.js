import { Router } from "express";
import { asyncHandler } from "../utils/index.js";
import { addNewProduct } from "../db/helpers/products/index.js";
import { auth } from "../middleware/authentication.js";
import {
  addProductToMeili,
  getProductsFromMeili,
} from "../utils/meilisearch.js";

export const router = Router();

router.post(
  "/",
  asyncHandler(auth),
  asyncHandler(async (req, res) => {
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
  asyncHandler(async (req, res) => {
    const q = req.query.q;
    const result = await getProductsFromMeili(q);
    return res.status(200).json({ result });
  })
);
