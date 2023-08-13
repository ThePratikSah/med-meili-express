import { Router } from "express";
import {
  addNewCategory,
  getAllCategories,
} from "../db/helpers/categories/index.js";
import { asyncHandler } from "../utils/index.js";
import { auth } from "../middleware/authentication.js";

export const router = Router();

router.get(
  "/",
  asyncHandler(auth),
  asyncHandler(async (req, res) => {
    return res.json({ data: await getAllCategories() });
  })
);

router.post(
  "/",
  asyncHandler(auth),
  asyncHandler(async (req, res) => {
    const { title, desc, imageUrl } = req.body;
    await addNewCategory(title, desc, imageUrl);
    return res.status(201).json({ msg: "Category created" });
  })
);
