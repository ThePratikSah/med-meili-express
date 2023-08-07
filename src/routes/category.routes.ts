import { Router, Request, Response } from "express";
import { addNewCategory, getAllCategories } from "../db/helpers/categories";
import { asyncHandler } from "../utils";

export const router = Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    return res.json({ data: await getAllCategories() });
  })
);

router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { title, desc, imageUrl } = req.body;
    await addNewCategory(title, desc, imageUrl);
    return res.status(201).json({ msg: "Category created" });
  })
);
