const express = require("express");
const dbConnect = require("./database/index");

const { PORT } = require("./config/index");

const router = require("./routes/index");
const app = express();

// definne All end poinnts here
app.use(router);

dbConnect();

app.listen(PORT, console.log(`Backened is runninng on port: ${PORT}`)); // ` is the template literal for contatinating
