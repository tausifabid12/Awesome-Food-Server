const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

//middle ware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is up");
});

//connecting mongodb

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

dbConnect();

//collections
const Products = client.db("awesome-food").collection("Products");
const ReviewsCollection = client.db("awesome-food").collection("reviews");

// Apis

//getting all products with limit
app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.headers.limit);
    console.log(limit);
    const query = {};
    const cursor = Products.find(query);
    let result;
    if (limit) {
      result = await cursor.limit(limit).toArray();
    } else {
      result = await cursor.toArray();
    }

    res.send(result);
  } catch {}
});

//getting selected products
app.get("/productsDetails/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const cursor = Products.find(query);
    const result = await cursor.toArray();
    res.send(result);
  } catch {}
});

//adding review
app.post("/review", async (req, res) => {
  try {
    const reviews = await ReviewsCollection.insertOne(req.body);
    res.send(reviews);
  } catch {}
});

app.listen(port, () => {
  console.log("server is running");
});
