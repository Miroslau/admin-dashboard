import { Router } from "express";
import clientRoute from "./client-route";
import generalRoute from "./general-route";
import managementRoute from "./management-route";
import salesRoute from "./sales-route";

const router: Router = new (Router as any)();

router.use("/client", clientRoute);
router.use("/general", generalRoute);
router.use("/management", managementRoute);
router.use("/sales", salesRoute);

export default router;
