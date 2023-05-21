const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;

const services = require("./src/services");

app.use(express.static("./public"));
app.use(express.json());
app.use(cookieParser());

services(app);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
