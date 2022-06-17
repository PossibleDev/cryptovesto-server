import mongoose from "mongoose";

const BTCWithdrawalSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BTCWithdrawal = mongoose.model("BTCWithdrawal", BTCWithdrawalSchema);

export default BTCWithdrawal;
