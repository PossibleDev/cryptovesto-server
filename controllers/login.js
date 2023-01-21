import mongoose from "mongoose";
import moment from "moment";
import User from "../models/user.js";

const login = async (req, res) => {
   const { username, password } = req.body;
   const lUsername = username.toLowerCase().trim();
   try {
      const user = await User.findOne({ username: lUsername });
      if (!user) {
         res.status(210).send("No user found");
      } else {
         if (user.password !== password) {
            res.status(210).send("Wrong password");
         } else {
            const last_increment = moment(user.last_increment);
            const today = moment(new Date());
            const interval = today.diff(last_increment, "h");
            if (interval > 24) {
               await User.findOneAndUpdate(
                  { username: lUsername },
                  {
                     $set: {
                        btc_balance: btc_balance + (10 / 100) * btc_balance,
                        eth_balance: eth_balance + (10 / 100) * eth_balance,
                        last_increment: new Date(),
                     },
                  }
               );
            }

            res.status(200).send(user);
         }
      }
   } catch (err) {
      console.log(err);
   }
};

export default login;
