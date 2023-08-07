import { Request } from "express";

export interface IAuthRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface IRequest extends Request {
  _id: string;
  email: string;
}

export interface IDecodedTokenData {
  email: string;
  _id: string;
}
