const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");
const usersRoute = require("./routes/usersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use("/users", usersRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server listening at PORT ${port}`);
});
