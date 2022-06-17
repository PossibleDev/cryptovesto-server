import ETHDeposit from "../models/ethDeposit.js";
import ETHWithdrawal from "../models/ethWithdrawal.js";
import User from "../models/user.js";

export const createEthDeposit = async (req, res) => {
  try {
    const deposit = await ETHDeposit.create(req.body);
    res.status(200).send(deposit);
  } catch (err) {
    console.log(err);
  }
};

export const createEthWithdrawal = async (req, res) => {
  try {
    const withdrawal = await ETHWithdrawal.create(req.body);
    res.status(200).send(withdrawal);
  } catch (err) {
    console.log(err);
  }
};

export const getEthDepositRequests = async (req, res) => {
  try {
    const resp = await ETHDeposit.find({});
    res.status(200).send(resp);
  } catch (err) {
    console.log(err);
  }
};

export const deleteEthDepositRequest = async (req, res) => {
  const { id } = req.body;
  try {
    await ETHDeposit.findByIdAndDelete(id);
    const deposits = await ETHDeposit.find({});
    res.status(200).send(deposits);
  } catch (err) {
    console.log(err);
  }
};

export const redemeEthDepositRequest = async (req, res) => {
  const { username, amount, _id } = req.body;
  try {
    const redemed = await ETHDeposit.findById(_id);
    if (!redemed.redemed) {
      const user = await User.findOne({ username });
      if (!user.deposited_before) {
        const bonusTo = await User.findOne({ username: user.referred_by });
        if (bonusTo) {
          const updated = await User.findOneAndUpdate(
            { username: user.referred_by },
            {
              $set: {
                eth_balance: bonusTo?.eth_balance + (amount * 40) / 100,
                eth_commision: bonusTo?.eth_commision + (amount * 40) / 100,
              },
            }
          );
        }
      }
      await User.findOneAndUpdate(
        { username },
        {
          $set: {
            eth_balance: user.eth_balance + amount + (amount * 45) / 100,
            deposited_before: true,
          },
        }
      );
      await ETHDeposit.findByIdAndUpdate(_id, { $set: { redemed: true } });
    }
    const resp = await ETHDeposit.find({})
    res.status(200).send(resp)
  } catch (err) {
    console.log(err);
  }
};
