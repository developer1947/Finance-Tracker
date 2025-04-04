import express from "express";
import { getBudgets, setBudget } from './budget.controller.js'
import { authentication } from "../middlewire/authentication.js";
const router = express.Router();

router.post("/setBudget", authentication, setBudget);
router.get("/getBudget", authentication, getBudgets);

export default router;