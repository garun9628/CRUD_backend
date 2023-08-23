const connectToMongo = require("./dbConnection.js");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PUBLIC_URL || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/blogs", require("./routes/blogs"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
