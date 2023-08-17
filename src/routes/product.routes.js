import { Router } from "express";
import { asyncHandler } from "../utils/index.js";
import { addNewProduct, getAllProducts } from "../db/helpers/products/index.js";
import { auth } from "../middleware/authentication.js";
import { addProductToMeili } from "../utils/meilisearch.js";

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

// TODO: add skip and limit in future release
router.get(
  "/",
  asyncHandler(auth),
  asyncHandler(async (_req, res) => {
    return res.json({ data: await getAllProducts() });
  })
);
