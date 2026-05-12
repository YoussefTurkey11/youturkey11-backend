import { StatusCodes } from "http-status-codes";
import allowedOirign from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
  optionsSuccessStatus: StatusCodes.OK,
};

export default corsOptions;
