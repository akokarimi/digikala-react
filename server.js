const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;
const DB = process.env.DATA_BASE.replace(
  "<PASSWORD>",
  process.env.ATLAS_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
