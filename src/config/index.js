import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL,
  dbUrl: process.env.DB_URL,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  BrevoStempLogin: process.env.BREVO_SMTP_LOGIN,
  BrevoStempKey: process.env.BREVO_SMTP_KEY,
  EmailFromName: process.env.EMAIL_FROM_NAME,
  EmailFrom: process.env.EMAIL_FROM,
};

export default config;
