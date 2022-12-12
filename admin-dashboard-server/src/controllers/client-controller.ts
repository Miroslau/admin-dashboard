import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError";
import Product from "../models/product";
import ProductStat from "../models/product-stat";

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
}

export default ClientController;
