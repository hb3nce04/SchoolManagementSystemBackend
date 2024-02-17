import { Router } from "express";

import {
  authenticateUser,
  handleRefreshToken,
  handleLogout,
} from "../../controllers/auth.js";

const router = Router();

router.post("/", authenticateUser);
router.post("/refresh", handleRefreshToken);
router.post("/logout", handleLogout);

export default router;
