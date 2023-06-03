/** @format */
// YrffHgFXVzEVfGWe

const mongoose = require("mongoose");

const app = require("./app");
const DB_HOST =
  "mongodb+srv://daria:YrffHgFXVzEVfGWe@cluster0.2oqsugj.mongodb.net/me_contact?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => console.log(`Server started on port: ${3000}`));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
