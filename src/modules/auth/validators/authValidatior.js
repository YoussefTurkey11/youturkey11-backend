import { check } from "express-validator";
import validatorMiddleware from "../../../middleware/validator.js";

export const registerValidator = [
  check("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full Name is required")
    .isLength({ min: 2 })
    .withMessage("Full Name must be more than 2 characters")
    .isLength({ max: 32 })
    .withMessage("Full Name must be less than 32 characters"),

  check("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("phone").optional().isMobilePhone().withMessage("Invalid phone number"),

  validatorMiddleware,
];

export const loginValidator = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validatorMiddleware,
];

export const forgotPasswordValidator = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  validatorMiddleware,
];

export const resetPasswordValidator = [
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("token").notEmpty().withMessage("Reset token is required"),

  validatorMiddleware,
];

export const verifyEmailValidator = [
  check("token").notEmpty().withMessage("Verification token is required"),

  validatorMiddleware,
];
