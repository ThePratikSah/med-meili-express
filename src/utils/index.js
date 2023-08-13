import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function asyncHandler(fn) {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(+env.SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

export async function compareHashPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export function generateJWT(email, _id) {
  return jwt.sign({ email, _id }, env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
}

export function validateJWT(token) {
  return jwt.verify(token, env.JWT_SECRET_KEY);
}
