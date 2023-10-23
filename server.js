require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const morgan = require("morgan");
const route = require("./routes");
require("./app/db/conn");
const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);

try {
  app.listen(PORT, () => {
    console.log(`Express App Is Now Running on http://localhost:${PORT}/`);
  });
} catch (err) {
  console.log(err);
}
