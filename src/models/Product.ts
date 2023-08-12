import { IBase } from "./Base";
import { IDiscount } from "./Discount";

export interface IProduct extends IBase {
  title: string;
  desc: string;
  price: number;
  sellingPrice: number;
  categoryId: string;
  image: string[];
  discount: IDiscount;
}
