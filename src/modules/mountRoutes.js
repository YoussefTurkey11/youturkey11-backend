import authRoutes from "./auth/routes/authRoute.js";
import userRouter from "./users/routes/userRoute.js";
import blogRouter from "./blogs/routes/blogsRoute.js";
import eventRouter from "./events/routes/eventsRoute.js";
import profileRouter from "./profile/routes/profileRoute.js";
import projectRouter from "./projects/routes/projectsRoute.js";
import serviceRouter from "./services/routes/servicesRoute.js";
import skillRouter from "./skills/routes/skillsRoute.js";
import successStoryRouter from "./successStory/routes/successStoryRoute.js";
import questionRouter from "./QAs/questions/routes/questionsRoute.js";
import answerRouter from "./QAs/answers/routes/answersRoute.js";
import interviewRouter from "./QAs/interviews/routes/interviewsRoute.js";
import quizRouter from "./QAs/quiz/routes/quizRoute.js";

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/blogs", blogRouter);
  app.use("/api/v1/events", eventRouter);
  app.use("/api/v1/profile", profileRouter);
  app.use("/api/v1/projects", projectRouter);
  app.use("/api/v1/services", serviceRouter);
  app.use("/api/v1/skills", skillRouter);
  app.use("/api/v1/success-stories", successStoryRouter);
  app.use("/api/v1/questions", questionRouter);
  app.use("/api/v1/answers", answerRouter);
  app.use("/api/v1/interviews", interviewRouter);
  app.use("/api/v1/quizzes", quizRouter);
};

export default mountRoutes;
