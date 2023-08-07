import { Response, NextFunction } from "express";
import { validateJWT } from "../utils";
import { IDecodedTokenData, IRequest } from "../interface/auth";
import { ErrorWithCode } from "../utils/error";
import { findUserById } from "../db/helpers/users";

export async function auth(req: IRequest, _: Response, next: NextFunction) {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new ErrorWithCode("Not Authorized", 401);
    return next(error);
  }
  const token = authHeader?.split(" ")[1];

  if (!token) {
    const error = new ErrorWithCode("Not Authorized", 401);
    return next(error);
  }

  const decodedData: IDecodedTokenData = validateJWT(token);
  const { _id } = decodedData;

  const user = await findUserById(_id);
  if (!user) {
    const error = new ErrorWithCode("Not Authorized", 401);
    return next(error);
  }

  req._id = _id;
  req.email = user.email;

  next();
}
