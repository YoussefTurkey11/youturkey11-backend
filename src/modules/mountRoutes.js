import authRoutes from "./auth/routes/authRoute.js";
import userRouter from "./users/routes/userRoute.js";
import blogRouter from "./blogs/routes/blogsRoute.js";
import eventRouter from "./events/routes/eventsRoute.js";
import profileRouter from "./profile/routes/profileRoute.js";

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/blogs", blogRouter);
  app.use("/api/v1/events", eventRouter);
  app.use("/api/v1/profile", profileRouter);
};

export default mountRoutes;
