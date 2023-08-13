import { Router } from "express";
import { asyncHandler } from "../utils/index.js";
import { auth } from "../middleware/authentication.js";
import { findUserByEmail } from "../db/helpers/users/index.js";

export const router = Router();

router.get(
  "/get-user",
  asyncHandler(auth),
  asyncHandler(async (req, res) => {
    const userData = await findUserByEmail(req.email);
    const { password, ...data } = userData;
    return res.status(200).json({ data });
  })
);
