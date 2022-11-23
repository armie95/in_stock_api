const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("<h3 style='text-align: center;'>In Stock API - HOME PAGE</h3>");
});

app.listen(port, function () {
  console.log(`Server is running on: http://localhost:${port} 🔥`);
});
