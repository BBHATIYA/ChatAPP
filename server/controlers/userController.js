const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
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
};

const login = async (req, res) => {
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
};

module.exports = { register, login };
