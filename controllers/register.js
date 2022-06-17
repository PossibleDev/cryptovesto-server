import express from "express";

import User from "../models/user.js";

const register = async (req, res) => {
  try {
    const referralPlus = await User.findOne({username: req.body.referred_by})
    if (referralPlus){
        await User.findOneAndUpdate(
          { username: req.body.referred_by },
          { $set: { total_referral: referralPlus.total_referral + 1 } }
        );

    }
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    if (err.code === 11000 && err.keyValue.username === req.body.username) {
      res.status(210).send("username exist");
    }
    if (err.code === 11000 && err.keyValue.email === req.body.email) {
      res.status(210).send("email taken");
    }
  }
};

export default register;
