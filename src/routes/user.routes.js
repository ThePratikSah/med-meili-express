import { Router } from "express";
import { asyncHandler } from "../utils/index.js";
import { auth } from "../middleware/authentication.js";
import { findUserByEmail } from "../db/helpers/users/index.js";

export const router = Router();

router.get(
  "/get-user",
  asyncHandler(auth),
  asyncHandler(async (req, res) => {
    const email = req.email;
    return res.json({ data: await findUserByEmail(email) });
  })
);
