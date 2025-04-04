import Budget from "./budget.model.js";
import { errorResponse, successResponse } from "../utils/responseMessage.js";

export const setBudget = async (req, res) => {
  try {
    const { category, limit } = req.body;
    if (!category && !limit) {
      return errorResponse(res, "Please fill all the fields", 400);
    }
    const budget = new Budget({ userId: req.user.id, category, limit });
    await budget.save();
    return successResponse(res, "Sucessful", budget, 201);
  } catch (error) {
    return errorResponse(res, "Server Issue", 500, error);
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    return successResponse(res, "Sucessful", budgets, 200);
  } catch (error) {
    return errorResponse(res, "Server Issue", 500, error);
  }
};
