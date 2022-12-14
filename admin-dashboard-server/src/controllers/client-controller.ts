import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError";
import Product from "../models/product";
import ProductStat from "../models/product-stat";
import User from "../models/user";

class ClientController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await Product.find();

      const productsWithStats = await Promise.all(
        products.map(async (product) => {
          const stat = await ProductStat.find({
            productId: product._id,
          });

          return {
            // @ts-ignore
            ...product?._doc,
            stat,
          };
        })
      );

      return res.status(200).json(productsWithStats);
    } catch (error: any) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await User.find({ role: "user" }).select("-password");

      return res.status(200).json(customers);
    } catch (error: any) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default ClientController;
