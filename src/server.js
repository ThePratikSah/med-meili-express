import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as categoriesRoute } from "./routes/category.routes.js";
import { router as productsRoute } from "./routes/product.routes.js";
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as userRoutes } from "./routes/user.routes.js";
import { connectDB } from "./db/database.js";
import { redisConnect, redisDisconnect } from "./db/redis.js";
import { env } from "./config/env.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: env.DASHBOARD_ORIGIN, // This is the front-end origin
  credentials: true, // This is important.
  methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Content-Type, Authorization, X-Requested-With, x-access-token",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/categories", categoriesRoute);
app.use("/products", productsRoute);

app.use((_req, _res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, _req, res, _) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.json({ error: err.message });
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
