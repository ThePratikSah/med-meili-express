import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { router as categoriesRoute } from "./routes/category.routes";
import { router as productsRoute } from "./routes/product.routes";
import { router as authRoutes } from "./routes/auth.routes";
import { connectDB } from "./db/database";
import { ErrorWithCode } from "./utils/error";
import { redisConnect, redisDisconnect } from "./db/redis";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/categories", categoriesRoute);
app.use("/products", productsRoute);

app.use((err: ErrorWithCode, _req: Request, res: Response, _: NextFunction) => {
  return res.status(err.status).json({ error: err.message });
});

(async () => {
  await connectDB()
    .then(async () => {
      await redisConnect().then(() => {
        app.listen(port, () => {
          console.log(`Medstore app listening on port ${port}`);
        });
      });
    })
    .catch(async (err) => {
      console.error({ err });
      await redisDisconnect();
    });
})();
