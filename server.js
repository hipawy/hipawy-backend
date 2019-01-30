require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => console.log(`Server start in PORT ${PORT}`));
