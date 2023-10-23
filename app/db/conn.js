const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_CLUSTER_URL = process.env.MONGODB_CLUSTER_URL;
mongoose
  .connect(MONGODB_CLUSTER_URL)
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
