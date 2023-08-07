import { Response, NextFunction } from "express";
import { validateJWT } from "../utils";
import { IDecodedTokenData, IRequest } from "../interface/auth";
import { ErrorWithCode } from "../utils/error";
import {
  findUserById,
  getUserFromRedis,
  setUserInRedis,
} from "../db/helpers/users";

export async function auth(req: IRequest, _: Response, next: NextFunction) {
  const token = req.cookies["api-auth"];

  if (!token) {
    throw new ErrorWithCode("Not authorized", 401);
  }

  let decodedData: IDecodedTokenData;

  try {
    decodedData = validateJWT(token);
  } catch (_) {
    throw new ErrorWithCode("Not authorized", 401);
  }

  const { _id } = decodedData;
  let email = await getUserFromRedis(_id);

  if (!email) {
    const user = await findUserById(_id);
    if (!user) {
      throw new ErrorWithCode("Not authorized", 401);
    }
    email = user?.email;
    await setUserInRedis(_id, email!);
  }

  req._id = _id;
  req.email = email!;
  next();
}
