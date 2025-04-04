import { errorResponse, successResponse } from "../utils/responseMessage.js";
import Transaction from "./transation.model.js";

export const createTransaction = async (req, res) => {
  try {
    const { description, amount, type, category, date } = req.body;
    if (!description && !amount && !type && !category && !date) {
      return errorResponse(res, "Fill all the fields", 400);
    }
    const transaction = new Transaction({
      userId: req.user.id,
      description,
      amount,
      type,
      category,
      date,
    });
    await transaction.save();
    return successResponse(res, "Sucessful", transaction);
  } catch (error) {
    console.log(error)
    return errorResponse(res, "Server Issue", 500, error);
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    return successResponse(res, "Sucessful", transactions, 200);
  } catch (error) {
    return errorResponse(res, "Server Issue", 500, error);
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return errorResponse(res, "Give the id", 400);
    }
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return successResponse(res, "Sucessful", transaction, 200);
  } catch (error) {
    return errorResponse(res, "Server Issue", 500, error);
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    return successResponse(res, "Transation Deleted", Transaction, 200);
  } catch (error) {
    return errorResponse(res, "Server Issue", 500, error);
  }
};
