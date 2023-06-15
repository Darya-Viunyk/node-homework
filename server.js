/** @format */

const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 5050 } = process.env;

mongoose
  .set("strictQuery", true)
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
