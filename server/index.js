const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("./models/user.model");
const WebSocket = require("ws");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/new-project");

app.post("/api/register", async (req, res) => {
  console.log(res.body);

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      phonenumber: req.body.phonenumber,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate phone number" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    phonenumber: req.body.phonenumber,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        phonenumber: user.phonenumber,
      },
      "hshshasfasf"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "ok", user: false });
  }
});

app.get("/api/user-list", (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

const server = app.listen(1337, () => {
  console.log("Server running on 1337");
});

//websocket

const wss = new WebSocket.Server({
  server,
});

wss.on("connection", function (ws) {
  ws.on("message", function (data) {
    ws.send(data);
  });
});

//websocket
