import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import mongoose from "mongoose";
import User from "./models/user";
import Product from "./models/product";
import ProductStat from "./models/product-stat";

import { errorHandlingMiddleware } from "./middleware/ErrorHandlingMiddleware";
import router from "./routes";

import { dataUser, dataProduct, dataProductStat } from "./data/index";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */

app.use("/api", router);

/*ERROR HANDLER*/
app.use(errorHandlingMiddleware);

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 9000;
const CONNECT_URL: string = process.env.MONGO_URL || "";

mongoose
  .connect(CONNECT_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is working on port: ${PORT}`);

      // Product.insertMany(dataProduct);
      // ProductStat.insertMany(dataProductStat);

      // User.insertMany(dataUser);
    });
  })
  .catch((error) => console.log(`${error} didn't connect`));
