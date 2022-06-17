import mongoose from "mongoose";
import User from "../models/user.js";

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(210).send("No user found");
    } else {
      if (user.password !== password) {
        res.status(210).send("Wrong password");
      } else {
        res.status(200).send(user);
      }
    }
  } catch (err) {
    console.log(error);
  }
};

export default login;
