import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import globalError from "./middleware/error.js";
import ApiError from "./utils/apiError.js";
import corsOptions from "./config/cors/corsOptions.js";
import swaggerSpec from "./config/swagger.js";
import { StatusCodes } from "http-status-codes";
import helmet from "helmet";
import compression from "compression";
import mountRoutes from "./modules/mountRoutes.js";
import config from "./config/index.js";

const app = express();

// 1- Set security HTTP headers
app.use(helmet()); // HTTP header security
app.use(cors(corsOptions)); // CORS-options
app.use(compression()); // compress all responses

// 2- Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" })); // middleware
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // middleware for parsing URL-encoded data
app.use(cookieParser()); // CORS-options

// 3- Rate Limiting
app.use(rateLimiter); // custom middleware

if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // swagger-documents
}

mountRoutes(app); // mount all routes

app.use((req, res, next) =>
  next(
    new ApiError(
      `Can not find this route: ${req.originalUrl}`,
      StatusCodes.NOT_FOUND,
    ),
  ),
); // Api Error Middleware

app.use(globalError); // error middleware

export default app;
