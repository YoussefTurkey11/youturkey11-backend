import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "YouTurkey11 Api",
      version: "1.0.0",
      description: "API documentation for YouTurkey11 project",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      schemas: {
        Profile: {
          type: "object",
          required: [
            "user",
            "position",
            "seniority",
            "location",
            "summary",
            "objective",
          ],
          properties: {
            user: { type: "string", example: "user_id" },
            position: { type: "string", example: "Software Engineer" },
            seniority: { type: "string", example: "Mid-level" },
            location: { type: "string", example: "Istanbul" },
            summary: {
              type: "string",
              example:
                "Experienced developer with a passion for creating innovative solutions.",
            },
            objective: {
              type: "string",
              example:
                "To contribute to a dynamic team and grow as a professional.",
            },
          },
        },
      },
    },
  },
  apis: [path.resolve("src/modules/**/routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
