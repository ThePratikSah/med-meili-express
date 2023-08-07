import { Request } from "express";

export interface IAuthRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
