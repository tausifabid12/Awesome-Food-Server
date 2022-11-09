const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

//middle ware
app.use(cors());
app.use(express.json());

//connecting mongodb
console.log(process.env.DB_PASSWORD, process.env.DB_USER_NAME);

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.brxmqep.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function dbConnect() {
  try {
    await client.connect();
    console.log("db connected");
  } catch {}
}
// client.connect();

dbConnect();

app.get("/", (req, res) => {
  res.send("server is up");
});

app.listen(port, () => {
  console.log("server is running");
});
