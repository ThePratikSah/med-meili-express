import express, { Request, Response, NextFunction } from "express";
import { router as categoriesRoutes } from "./routes/category.routes";
import { router as authRoutes } from "./routes/auth.routes";
import { connectDB } from "./db/database";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/categories", categoriesRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Something went wrong" });
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
