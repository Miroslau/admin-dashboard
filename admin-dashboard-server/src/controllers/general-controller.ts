import User from "../models/user";
import ApiError from "../error/ApiError";
import express, { NextFunction } from "express";

class GeneralController {
  async getUser(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.status(200).json(user);
    } catch (error: any) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default GeneralController;
