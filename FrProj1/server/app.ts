import express, { ErrorRequestHandler } from 'express';
import "express-async-errors";
import { json } from 'body-parser';
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors/index"
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from "./middlewares/error-handler"

// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import voucherRoutes from "./routes/voucherRoutes.js";

const dotenv = require("dotenv");
dotenv.config();
const { Model } = require("objection");
const Knex = require("knex");
const { config } = require("./config/knex.ts");
const knex = Knex(config[process.env.NODE_ENV || "development"]);
Model.knex(knex);
const cors = require("cors");
const app = express();
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/vouchers", voucherRoutes);
app.use(cors());
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(async (req: any, res, next) => {
  try {
    await next();
  } finally {
    // This is a demonstration; normally, Knex/Objection.js handles this
    if (req.trx) {
      try {
        await req.trx.commit();
      } catch (error) {
        await req.trx.rollback();
      }
    }
  }
});
app.post("/test", async (req:any, res, next) => {
  try {
    const data = await knex("users").select("*").limit(1);
    console.log("data", data);

    console.log("somthing");
  } catch (err) {
    console.log("err", err);
  }
  res.send("hello");
});
app.all("*", async (req:any, res) => {
  throw new NotFoundError();
});

app.use(errorHandler as ErrorRequestHandler);
process.on("SIGTERM", async () => {
  await knex.destroy();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await knex.destroy();
  process.exit(0);
});

export { app };
