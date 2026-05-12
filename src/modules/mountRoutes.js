import authRoutes from "./auth/routes/authRoute.js";
import userRouter from "./users/routes/userRoute.js";
import blogRouter from "./blogs/routes/blogsRoute.js";
const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/blogs", blogRouter);
};

export default mountRoutes;
