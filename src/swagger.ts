import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BookEase API",
      version: "1.0.0",
      description: "API documentation for BookEase backend",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [{ url: `${process.env.SWAGGER_SERVER_URL ?? "http://localhost:5000"}` }],
  },
  apis: [
    "./src/routes/*.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;


