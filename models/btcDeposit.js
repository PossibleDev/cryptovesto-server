import mongoose from "mongoose";

const BTCDepositSchema = new mongoose.Schema(
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

const BTCDeposit = mongoose.model("BTCDeposit", BTCDepositSchema);

export default BTCDeposit;
