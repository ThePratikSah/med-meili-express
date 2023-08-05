import { Router, Request, Response } from "express";
import { addNewCategory, getAllCategories } from "../db/helpers/categories";
import { asyncHandler } from "../utils";

export const router = Router();

/**
 * this route will be getting all the categories and return the value
 */
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    return res.json({ data: await getAllCategories() });
  })
);

/**
 * this will be helping in creating new categories
 */
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { title, desc, imageUrl } = req.body;
    await addNewCategory(title, desc, imageUrl);
    return res.status(201).json({ msg: "Category created" });
  })
);
