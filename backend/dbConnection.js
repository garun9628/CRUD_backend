const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/twitter";

const connectToMongo = async () => {
  // const MONGODB_URI = process.env.MONGODB_URI;
  mongoose.set("strictQuery", false);

  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
};

module.exports = connectToMongo;
