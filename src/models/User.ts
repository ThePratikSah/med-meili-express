import { IBase } from "./Base";

export interface IUser extends IBase {
  email: string;
  name: string;
  passwordHash: string;
}
