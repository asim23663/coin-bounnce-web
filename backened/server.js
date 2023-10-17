const express = require("express");
const dbConnect = require("./database/index");

const { PORT } = require("./config/index");

const router = require("./routes/index");

const errorHandler = require("./middelwares/errorHandlers");

const app = express();

// Middleware to use to allow json data
// app.use(express.json);
app.use(express.json({ limit: "50mb" }));

// definne All end poinnts here
app.use(router);

dbConnect();

app.use(errorHandler);

app.listen(PORT, console.log(`Backened is runninng on port: ${PORT}`)); // ` is the template literal for contatinating
