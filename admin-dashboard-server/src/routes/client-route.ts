import express from "express";
import ClientController from "../controllers/client-controller";

const router = express.Router();

const clientController = new ClientController();

router.get("/products", clientController.getProducts);

export default router;
