import express from "express";
import register from "./controllers/register.js";
import login from "./controllers/login.js";
import {
  createBtcDeposit,
  createBtcWithdrawal,
  deleteBtcDepositRequest,
  getBtcDepositRequests,
  getBtcWithdrawalRequests,
  redemeBtcDepositRequest,
} from "./controllers/btc.js";
import {
  createEthDeposit,
  createEthWithdrawal,
  deleteEthDepositRequest,
  getEthDepositRequests,
  redemeEthDepositRequest,
} from "./controllers/eth.js";
import User from "./models/user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/createBtcDeposit", createBtcDeposit);
router.post("/createBtcWithdrawal", createBtcWithdrawal);
router.post("/createEthDeposit", createEthDeposit);
router.post("/createEthWithdrawal", createEthWithdrawal);
router.post("/redemeBtcDepositRequest", redemeBtcDepositRequest);
router.post("/redemeEthDepositRequest", redemeEthDepositRequest);
router.post("/deleteBtcDepositRequest", deleteBtcDepositRequest);
router.post("/deleteEthDepositRequest", deleteEthDepositRequest);

router.get("/getBtcDepositRequests", getBtcDepositRequests);
router.get("/getEthDepositRequests", getEthDepositRequests);
router.get("/getBtcWithdrawalRequests", getBtcWithdrawalRequests);
router.get("/findAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
  }
});

export default router;
