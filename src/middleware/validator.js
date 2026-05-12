import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "fail",
      errors: errors.array(),
    });
  }

  next();
};

export default validatorMiddleware;
