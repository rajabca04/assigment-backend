const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
//connect to mongodb
const mongoose = require("mongoose");
const assigment = require("./model/studentModel");

mongoose
  .connect("mongodb+srv://rajaji12102000:12345@cluster0.vgyejwl.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((e) => {
    console.log(`Error accured in mongodb connection: ${e}`);
  });

const port = 3000;

app.get("/", (req, res) => {
  res.send("I am home route please visit /api/assigment-data-get, /api/assigment-data-post, /api/assigment-data-delete , /api/assigment-data-update");
});

// get assigment data
app.get("/api/assigment-data-get", async (req, res) => {
  try {
    const data = await assigment.find();

    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});


// post assigment data
app.post("/api/assigment-data-post", async (req, res) => {
  try {
    const {
      end_year,
      intensity,
      sector,
      topic,
      insight,
      url,
      region,
      start_year,
      impact,
      added,
      published,
      country,
      relevance,
      pestle,
      source,
      title,
      likelihood,
    } = req.body;

    const data = await assigment.create({
      end_year,
      intensity,
      sector,
      topic,
      insight,
      url,
      region,
      start_year,
      impact,
      added,
      published,
      country,
      relevance,
      pestle,
      source,
      title,
      likelihood,
    });

    res.status(201).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

// update assigment data

app.patch("/api/assigment-data-update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const result = await assigment.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    res.status(200).json({
      status: "OK",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
});

// delete assigment data
app.delete("/api/assigment-data-delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const result = await assigment.deleteOne({ _id: id }, body, {
      new: true,
    });

    res.status(200).json({
      status: "OK",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
});

// app listening..
app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(`Error accured in app lestening: ${error}`);
  }
});
