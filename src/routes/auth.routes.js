import { Router } from "express";
import {
  asyncHandler,
  compareHashPassword,
  generateJWT,
  hashPassword,
} from "../utils/index.js";
import { addNewUser, findUserByEmail } from "../db/helpers/users/index.js";
import { auth } from "../middleware/authentication.js";

export const router = Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const hash = user.password;

    const validatePassword = await compareHashPassword(password, hash);

    if (!validatePassword) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const { _id } = user;

    const token = generateJWT(email, _id.toString());
    res.cookie("api-auth", token, {
      secure: false,
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });
    return res.status(201).json({ msg: "Authenticated" });
  })
);

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const _user = await findUserByEmail(email);
    if (_user) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hash = await hashPassword(password);

    const { insertedId } = await addNewUser(email, hash);
    return res.status(201).json({ msg: "User created", userId: insertedId });
  })
);

router.post(
  "/signout",
  asyncHandler(auth),
  asyncHandler(async (_, res) => {
    res.clearCookie("api-auth");
    return res.json({ message: "Logged out!" });
  })
);
