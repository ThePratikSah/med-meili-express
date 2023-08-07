import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IDecodedTokenData } from "../interface/auth";

export function asyncHandler(fn: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10); // TODO: replace the 10 with env value
  return await bcrypt.hash(password, salt);
}

export async function compareHashPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export function generateJWT(email: string, _id: string) {
  return jwt.sign({ email, _id }, "some_random_key", {
    expiresIn: "24h",
  }); // TODO: remove this from here and get it from env
}

export function validateJWT(token: string) {
  return jwt.verify(token, "some_random_key") as IDecodedTokenData; // TODO: remove this from here and get it from env
}
