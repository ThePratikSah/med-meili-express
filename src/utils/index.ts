import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IDecodedTokenData } from "../interface/auth";
import { env } from "../config/env";

export function asyncHandler(fn: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(+env.SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

export async function compareHashPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export function generateJWT(email: string, _id: string) {
  return jwt.sign({ email, _id }, env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
}

export function validateJWT(token: string) {
  return jwt.verify(token, env.JWT_SECRET_KEY) as IDecodedTokenData;
}
