const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/twitter";

const connectToMongo = () => {
  mongoose.set("strictQuery", false);
  // mongoose.connect(mongoURI, () => {
  //   console.log("Connected to Mongo Successfully");
  // });
  mongoose.connect(mongoURI).then(() => console.log("MongoDB Connected!"));
};

module.exports = connectToMongo;
