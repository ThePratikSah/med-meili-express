import express, { Request, Response } from "express";
import { router as categoriesRoutes } from "./routes/category.routes";
import { router as authRoutes } from "./routes/auth.routes";
import { connectDB } from "./db/database";
import { ErrorWithCode } from "./utils/error";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/categories", categoriesRoutes);

app.use((err: ErrorWithCode, req: Request, res: Response) => {
  const { status, message } = err;
  console.log({ status, message });
  res.status(status).json({ error: message || "Something went wrong" });
});

(async () => {
  await connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Medstore app listening on port ${port}`);
      });
    })
    .catch(console.error);
})();
