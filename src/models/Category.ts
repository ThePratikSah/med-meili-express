import { IBase } from "./Base";

export interface ICategory extends IBase {
  title: string;
  desc: string;
  imageUrl: string;
}
