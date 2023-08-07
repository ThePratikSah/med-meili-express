import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { router as categoriesRoutes } from "./routes/category.routes";
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
app.use("/categories", categoriesRoutes);

app.use((err: ErrorWithCode, req: Request, res: Response) => {
  const { status, message } = err;
  console.log({ status, message });
  res.status(status).json({ error: message || "Something went wrong" });
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
