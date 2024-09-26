import express from "express";

import mongoose from "mongoose";

import cors from "cors";
const app = express();

const PORT = 5600;

mongoose
  .connect(
    "mongodb+srv://asimrzali9:8aSMICCFZY5Jy9jh@codemarketing.qqu1x.mongodb.net/"
  )
  .then(() => console.log("Mongoose is connected"))
  .catch((err) => console.log("Mongo db connection failed,ERROR: ", err));

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
  express.json()
);

const UserShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be less than 50 characters"],
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    default: 18,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Students", UserShema);

app.get("/users", async function (_, res) {
  try {
    const users = await User.find();
    if (users.length) {
      res.status(200).json(users);
    } else {
      res.status(404).json({
        message: "Users not found",
      });
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

app.post("/user", async function (req, res) {
  try {
    let { name } = req.body;

    const newUser = new User({ name });

    let savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(401).json(error);
  }
});

app.delete("/users/:id", async function (req, res) {
  try {
    let id = req.params.id;

    console.log(id);

    let deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({
        message: "User not found for deleting",
      });
    } else {
      res.sendStatus(202);
    }
  } catch (error) {
    res.sendStatus(404).json(error);
  }
});

app.listen(PORT, function () {
  console.log(`Backend servise is running in ${PORT}`);
});
