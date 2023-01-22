import BTCDeposit from "../models/btcDeposit.js";
import BTCWithdrawal from "../models/btcWithdrawal.js";
import User from "../models/user.js";

export const createBtcDeposit = async (req, res) => {
   try {
      const deposit = await BTCDeposit.create(req.body);
      res.status(200).send(deposit);
   } catch (err) {
      console.log(err);
   }
};

export const createBtcWithdrawal = async (req, res) => {
   try {
      const withdrawal = await BTCWithdrawal.create(req.body);
      res.status(200).send(withdrawal);
   } catch (err) {
      console.log(err);
   }
};

export const getBtcDepositRequests = async (req, res) => {
   try {
      const resp = await BTCDeposit.find({});
      res.status(200).send(resp);
   } catch (err) {
      console.log(err);
   }
};

export const getBtcWithdrawalRequests = async (req, res) => {
   try {
      const resp = await BTCWithdrawal.find({});
      res.status(200).send(resp);
   } catch (err) {
      console.log(err);
   }
};

export const deleteBtcDepositRequest = async (req, res) => {
   const { id } = req.body;
   try {
      await BTCDeposit.findByIdAndDelete(id);
      const deposits = await BTCDeposit.find({});
      res.status(200).send(deposits);
   } catch (err) {
      console.log(err);
   }
};

export const redemeBtcDepositRequest = async (req, res) => {
   const { username, amount, _id } = req.body;
   try {
      const redemed = await BTCDeposit.findById(_id);
      if (!redemed.redemed) {
         const user = await User.findOne({ username });
         if (!user.deposited_before) {
            const bonusTo = await User.findOne({ username: user.referred_by });
            if (bonusTo) {
               const updated = await User.findOneAndUpdate(
                  { username: user.referred_by },
                  {
                     $set: {
                        btc_balance: bonusTo?.btc_balance + (amount * 40) / 100,
                        btc_commision:
                           bonusTo?.btc_commision + (amount * 40) / 100,
                     },
                  }
               );
            }
         }
         await User.findOneAndUpdate(
            { username },
            {
               $set: {
                  btc_balance: user.btc_balance + amount + (amount * 20) / 100,
                  first_deposit_date:
                     user.deposited_before === false
                        ? new Date()
                        : user.first_deposit_date,
                  deposited_before: true,
               },
            }
         );
         await BTCDeposit.findByIdAndUpdate(_id, { $set: { redemed: true } });
      }
      const resp = await BTCDeposit.find({});
      res.status(200).send(resp);
   } catch (err) {
      console.log(err);
   }
};
