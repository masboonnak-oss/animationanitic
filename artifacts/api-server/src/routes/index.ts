import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import serversRouter from "./servers";
import billingRouter from "./billing";
import supportRouter from "./support";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/servers", serversRouter);
router.use("/billing", billingRouter);
router.use("/support", supportRouter);
router.use("/stats", statsRouter);

export default router;
