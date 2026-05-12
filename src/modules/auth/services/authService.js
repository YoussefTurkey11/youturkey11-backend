import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { generateToken } from "../../../utils/generateToken.js";
import ApiError from "../../../utils/apiError.js";
import User from "../models/userModel.js";
import { sanitizeUser } from "../../../utils/sanitizeUser.js";
import { hashedToken } from "../../../utils/hashedToken.js";
import { sendEmail } from "../../../utils/sendEmail.js";
import config from "../../../config/index.js";

// ============ Register ============
export const register = async ({ fullName, email, password, phone }) => {
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new ApiError("User already exists", StatusCodes.BAD_REQUEST);
  }

  const newUser = await User.create({
    fullName,
    email,
    phone,
    password,
    isVerified: false,
  });

  const verifyToken = createEmailVerifyToken(newUser);
  await newUser.save({ validateBeforeSave: false });

  const token = generateToken({ id: newUser._id });

  const verifyUrl = `${config.clientUrl}/verify-email/${verifyToken}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Welcome ${fullName}!</h2>
      <p>Click the button below to verify your email:</p>
      <a href="${verifyUrl}" 
         style="
           display:inline-block;
           padding:12px 24px;
           background:#4F46E5;
           color:#fff;
           border-radius:6px;
           text-decoration:none;
           font-weight:bold;
         ">
        Verify Email
      </a>
      <p>This link expires in 24 hours.</p>
      <p>If you didn't create an account, ignore this email.</p>
    `,
  });

  return { user: newUser, token, verifyToken };
};

// ============ Login ============
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError("Invalid credentials", StatusCodes.BAD_REQUEST);
  }

  if (!user.isVerified) {
    throw new ApiError(
      "Please verify your email first",
      StatusCodes.UNAUTHORIZED,
    );
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return { user, token };
};

// ============ Forgot Password ============
export const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", StatusCodes.NOT_FOUND);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = hashedToken(resetToken);
  user.passwordResetExpire = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${config.clientUrl}/reset-password/${resetToken}`;

  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the button below to reset your password:</p>
      <a href="${resetUrl}"
         style="
           display:inline-block;
           padding:12px 24px;
           background:#4F46E5;
           color:#fff;
           border-radius:6px;
           text-decoration:none;
           font-weight:bold;
         ">
        Reset Password
      </a>
      <p>This link expires in <strong>10 minutes</strong>.</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });

  return resetToken;
};

// ============ Reset Password ============
export const resetPassword = async ({ token, password }) => {
  const user = await User.findOne({
    passwordResetToken: hashedToken(token),
    passwordResetExpire: { $gt: Date.now() },
  });
  if (!user) {
    throw new ApiError("Token invalid or expired", StatusCodes.BAD_REQUEST);
  }

  user.password = password;
  user.passwordChangeAt = new Date();
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;

  await user.save();

  return user;
};

// ============ Create Email Verify Token ============
export const createEmailVerifyToken = (user) => {
  const token = crypto.randomBytes(32).toString("hex");

  user.emailVerifyToken = hashedToken(token);
  user.emailVerifyExpire = Date.now() + 24 * 60 * 60 * 1000; // 1 h

  return token;
};

// ============ Verify Email  ============
export const verifyEmail = async ({ token }) => {
  const user = await User.findOne({
    emailVerifyToken: hashedToken(token),
    emailVerifyExpire: { $gt: Date.now() },
  });
  if (!user) {
    throw new ApiError("Invalid or expired token", StatusCodes.BAD_REQUEST);
  }
  if (user.isVerified) {
    throw new ApiError("Email already verified", StatusCodes.BAD_REQUEST);
  }

  user.isVerified = true;
  user.emailVerifyToken = undefined;
  user.emailVerifyExpire = undefined;

  await user.save();

  return user;
};
