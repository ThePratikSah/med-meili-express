import { IBase } from "./Base";

export interface IDiscount extends IBase {
  title: string;
  desc: string;
  discountPercent: number;
  active: boolean;
}
