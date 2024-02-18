import { Router } from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ version: process.env.npm_package_version });
});
router.get("/sendmail", (req, res, next) => {
  res.send("Hello world!");
});
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.get("*", (req, res, next) => {
  res.status(404).json({ message: "The resource is currently not available." });
});

export default router;
