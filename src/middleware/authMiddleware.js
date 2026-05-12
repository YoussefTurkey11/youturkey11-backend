import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import User from "../modules/auth/models/userModel.js";
import config from "../config/index.js";

export const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError(`Not authorized`, StatusCodes.UNAUTHORIZED));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        new ApiError("User no longer exists", StatusCodes.UNAUTHORIZED),
      );
    }

    if (user.changedPasswordAfter(decoded.iat)) {
      return next(
        new ApiError(
          "Password was changed. Please login again",
          StatusCodes.UNAUTHORIZED,
        ),
      );
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ApiError("Invalid token", StatusCodes.UNAUTHORIZED));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(`Forbidden`, StatusCodes.FORBIDDEN));
    }
    next();
  };
};
