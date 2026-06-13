const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Grocery API",
      version: "1.0.0",
      description: "MERN Grocery App API",
    },
    servers: [
  {
    url: "http://localhost:5000",
  },
  {
    url: "https://your-app-name.onrender.com",
  },
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
