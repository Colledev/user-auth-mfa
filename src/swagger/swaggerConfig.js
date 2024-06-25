const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "User Management API",
            version: "1.0.0",
            description:
                "API for user management with authentication and authorization",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
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
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
