import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError";
import Product from "../models/product";
import ProductStat from "../models/product-stat";
import User from "../models/user";
import { sortHandlingMiddleware } from "../middleware/SortHandlingMiddleware";
import Transaction from "../models/transaction";
// @ts-ignore
import getCountryIso3 from "country-iso-2-to-3";

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

  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

      const sortFormatted = Boolean(sort) ? sortHandlingMiddleware(sort) : {};
      const transactions = await Transaction.aggregate([
        {
          $addFields: {
            userId: {
              $toObjectId: "$userId",
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            "user.name": {
              $regex: search,
              $options: "i",
            },
          },
        },
        {
          // @ts-ignore
          $sort: sortFormatted,
        },
        {
          $limit: Number(pageSize),
        },
        {
          // @ts-ignore
          $skip: Number(page * pageSize),
        },
      ]);

      const total = await Transaction.countDocuments({
        name: { $regex: search, $options: "i" },
      });

      return res.status(200).json({
        transactions,
        total,
      });
    } catch (error: any) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getGeography(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();

      const mappedLocations = users.reduce((acc, { country }) => {
        const countryISO3 = getCountryIso3(country);
        // @ts-ignore
        if (!acc[countryISO3]) {
          // @ts-ignore
          acc[countryISO3] = 0;
        }
        // @ts-ignore
        acc[countryISO3]++;
        return acc;
      }, {});

      const formattedLocations = Object.entries(mappedLocations).map(
        ([country, count]) => {
          return { id: country, value: count };
        }
      );

      return res.status(200).json(formattedLocations);
    } catch (error: any) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default ClientController;
