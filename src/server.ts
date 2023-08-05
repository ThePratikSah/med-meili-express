import express, { Request, Response, NextFunction } from "express";
import { router as categoriesRoutes } from "./routes/category.routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/categories", categoriesRoutes);

/**
 * Error handler,
 * This will take care of all the errors in the code as we are not using any trycatch block
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log error stack trace to console (or to a logging service)

  // // Handle validation errors
  // if (err instanceof z.ZodError) {
  //   return res.status(400).json({ error: err.errors });
  // }

  // Handle other errors
  res.status(500).json({ error: err.message || "Something went wrong" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
