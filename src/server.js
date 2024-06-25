const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const usersRoute = require("./routes/usersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use("/users", usersRoute);

app.listen(port, () => {
    console.log(`Server listening at PORT ${port}`);
});
