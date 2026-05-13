import { check } from "express-validator";
import validatorMiddleware from "../../../../middleware/validator.js";

export const createQuizValidator = [
  check("title").trim().notEmpty().withMessage("Title is required"),

  check("questions")
    .isArray({ min: 1 })
    .withMessage("Questions must have at least one item"),

  check("questions.*.questionText")
    .trim()
    .notEmpty()
    .withMessage("Each question text is required"),

  check("questions.*.options")
    .isArray({ min: 2 })
    .withMessage("Each question must have at least 2 options"),

  check("questions.*.correctAnswer")
    .trim()
    .notEmpty()
    .withMessage("Each question must have a correct answer"),

  check("difficulty")
    .optional()
    .isIn(["easy", "medium", "hard"])
    .withMessage("Invalid difficulty"),

  check("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isNumeric()
    .withMessage("Duration must be a number"),

  validatorMiddleware,
];

export const submitQuizValidator = [
  check("answers").isArray({ min: 1 }).withMessage("Answers must be an array"),

  validatorMiddleware,
];
