import { Router } from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";

import verifyJWT from "../../middlewares/verifyJWT.js";

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ version: process.env.npm_package_version });
});

router.get("/test", verifyJWT, (req, res, next) => {
  res.status(200).json({ message: "WORKING" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.get("*", (req, res, next) => {
  res.status(404).json({ message: "The resource is currently not available." });
});

export default router;
