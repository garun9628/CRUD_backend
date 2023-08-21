const connectToMongo = require("./dbConnection.js");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tweets", require("./routes/tweets"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
