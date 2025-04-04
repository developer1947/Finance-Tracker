import User from "./user.model.js";
import jwt from "jsonwebtoken";
import  {errorResponse,successResponse } from "../utils/responseMessage.js"

export const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name && !email && !password && !phoneNumber) {
      return errorResponse(res, "Missing required fields.", 400);
    }
    const result = await User.create(req.body);
    return successResponse(res, "Lead created successfully", result, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Issue", 500,error);
  }
};

export const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return errorResponse(res, "Missing required fields.", 400);
    }

    const result = await User.findOne({ phoneNumber: phoneNumber });

    if (!result) {
      return errorResponse(res, "User not found", 400);
    }

    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
      },
      process.env.SECRETE_KEY
    );

    return res.status(200).json({
      message: "Login Successful",
      success: true,
      status: 200,
      user: {
        id: result.id,
        phoneNumber: result.phoneNumber,
        email: result.email,
        name:result.name
      },
      token: token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return errorResponse(res, "Server Issue", 500,error);
  }
};