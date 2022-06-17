import mongoose from "mongoose";

const ETHDepositSchema = new mongoose.Schema(
  {
    username: {
      type: String
    },
    wallet_address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    redemed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const ETHDeposit = mongoose.model("ETHDeposit", ETHDepositSchema);

export default ETHDeposit;
