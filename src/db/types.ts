import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Category = {
  id: Generated<number>;
  title: string;
  desc: string | null;
  imageUrl: string | null;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
};
export type Discount = {
  id: Generated<number>;
  title: string;
  desc: string | null;
  discountPercent: number;
  active: Generated<boolean>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
};
export type Product = {
  id: Generated<number>;
  title: string;
  description: string;
  price: number;
  sellingPrice: number | null;
  categoryId: number;
  discountId: number | null;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
};
export type User = {
  id: Generated<number>;
  email: string;
  name: string | null;
  username: string;
  password_hash: string;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
};
export type DB = {
  Category: Category;
  Discount: Discount;
  Product: Product;
  User: User;
};
