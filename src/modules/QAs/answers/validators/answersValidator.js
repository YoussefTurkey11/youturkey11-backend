import { check } from "express-validator";
import validatorMiddleware from "../../../../middleware/validator.js";

export const createAnswerValidator = [
  check("question")
    .notEmpty()
    .withMessage("Question ID is required")
    .isMongoId()
    .withMessage("Invalid question ID"),

  check("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters"),

  validatorMiddleware,
];

export const updateAnswerValidator = [
  check("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters"),

  validatorMiddleware,
];
