import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router.js";
import User from "./models/user.js";

const app = express();

dotenv.config();
app.use(cors());

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION_STRING, async () => {
  console.log("connected to database successfully");
  try {
    const user = await User.findOne({ isAdmin: true });
    if (!user) {
      await User.create({
        username: "cryptovestoAdmin",
        email: "fifafamiyan@gmail.com",
        password: "cryptovestoAdmin",
        isAdmin: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(
  process.env.PORT,
  console.log(`server running in port ${process.env.PORT}`)
);
