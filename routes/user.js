import { Router } from "express";
import { registerUser } from "../controllers/user.js";

const router = Router();

router.post("/user", registerUser);

export default router;