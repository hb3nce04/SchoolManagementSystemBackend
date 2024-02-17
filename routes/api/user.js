import { Router } from "express";

import { createUser } from "../../controllers/user.js";

const router = Router();

router.post("/add", createUser);

export default router;
