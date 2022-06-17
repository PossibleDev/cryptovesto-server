import mongoose from "mongoose";

const ETHWithdrawalSchema = new mongoose.Schema(
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

const ETHWithdrawal = mongoose.model("ETHWithdrawal", ETHWithdrawalSchema);

export default ETHWithdrawal;
