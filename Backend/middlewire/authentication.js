import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responseMessage.js';

export const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return errorResponse(res, 'JWT token is required', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    return errorResponse(res, 'Invalid or expired token', 403, err);
  }
};
