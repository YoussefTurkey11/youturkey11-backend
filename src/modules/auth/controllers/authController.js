import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import ApiError from "../../../utils/apiError.js";
import User from "../models/userModel.js";
import * as authService from "../services/authService.js";
import { sanitizeUser } from "../../../utils/sanitizeUser.js";
import config from "../../../config/index.js";

// ============ Register ============
export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, phone } = req.body;

  const { user, token, verifyToken } = await authService.register({
    fullName,
    email,
    password,
    phone,
  });

  const verifyUrl = `${config.clientUrl}/verify-email/${verifyToken}`;

  res.status(StatusCodes.CREATED).json({
    message: "User registered successfully. Please verify your email.",
    token,
    user: sanitizeUser(user),
    verifyUrl,
  });
});

// ============ Login ============
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authService.login({ email, password });

  res.status(StatusCodes.OK).json({ token, user: sanitizeUser(user) });
});

// ============ Forgot Password ============
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await authService.forgotPassword({ email });

  res.status(StatusCodes.OK).json({
    message: "Reset link was sent to your email!",
  });
});

// ============ Reset Password ============
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await authService.resetPassword({ token, password });

  res
    .status(StatusCodes.OK)
    .json({ message: "Password reset successful", user: sanitizeUser(user) });
});

// ============ Verify Email ============
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await authService.verifyEmail({ token });

  res.status(StatusCodes.OK).json({
    message: "Email verified successfully",
    user: sanitizeUser(user),
  });
});
