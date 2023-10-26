const express = require("express");
const dbConnect = require("./backened/database/index");

const { PORT } = require("./backened/config/index");

const router = require("./backened/routes/index");

const errorHandler = require("./backened/middelwares/errorHandlers");

const app = express();

// Middleware to use to allow json data
// app.use(express.json);
app.use(express.json({ limit: "50mb" })); // used this middleware to accept and send data in JSON

// definne All end poinnts here
app.use(router);

dbConnect();

app.use(errorHandler);

app.listen(PORT, console.log(`Backened is runninng on port: ${PORT}`)); // ` is the template literal for contatinating
