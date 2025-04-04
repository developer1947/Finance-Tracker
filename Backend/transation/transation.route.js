import express from "express";
import {createTransaction,getTransactions,updateTransaction,deleteTransaction} from "./transation.controller.js"
import { authentication } from "../middlewire/authentication.js";
const router = express.Router();

router.post("/createTransaction", authentication, createTransaction);
router.get("/getTransactions", authentication, getTransactions);
router.put("/updateTransaction/:id", authentication, updateTransaction);
router.delete("/deleteTransaction/:id", authentication, deleteTransaction);

export default router;