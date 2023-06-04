const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
require("dotenv").config();  

const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(`mongodb+srv://2linbw:${process.env.MONGO_DB_PASSWORD}@project3.vpl2zcq.mongodb.net/?retryWrites=true&w=majority`)

let testCollection;

mongoClient.connect().then(_ => {
    const db = mongoClient.db("test");
    testCollection = db.collection("test");
}).catch(error => {
    console.log(error);
})

app.get("/api/test", (_, response) => {
    testCollection.find().toArray().then((result) => {
        response.json(result);
    });
});

// POST challenge
app.post("/api/test", (request, response) => {
    testCollection.insertOne(request.body).then((_) => {
        response.json();
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
