const express = require("express");
const dbConnect = require("./database/index");

const { PORT } = require("./config/index");

const app = express();

// const PORT = 5000;

dbConnect();
app.get("/", (req, res) => res.json({ msg: "My First Backened App" }));
app.listen(PORT, console.log(`Backened is runninng on port: ${PORT}`)); // ` is the template literal for contatinating
