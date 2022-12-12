import express from "express";
import GeneralController from "../controllers/general-controller";

const router = express.Router();

const generalController = new GeneralController();

router.get("/user/:id", generalController.getUser);

export default router;
