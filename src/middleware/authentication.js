import { validateJWT } from "../utils/index.js";
import { ErrorWithCode } from "../utils/error.js";
import {
  findUserById,
  getUserFromRedis,
  setUserInRedis,
} from "../db/helpers/users/index.js";

export async function auth(req, _, next) {
  const token = req.cookies["api-auth"];

  if (!token) {
    throw new ErrorWithCode("Not authorized", 401);
  }

  let decodedData;

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
    await setUserInRedis(_id, email);
  }

  req._id = _id;
  req.email = email;
  next();
}
