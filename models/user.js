import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique: true,
        lowercase: true, 
        trim: true
    },
    email: {
        type: String,
        requied: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    btc_balance: {
        type: Number,
        default: 0
    },
    eth_balance: {
        type: Number,
        default: 0
    },
    total_referral: {
        type: Number,
        default: 0
    },
    btc_commision: {
        type: Number,
        default: 0
    },
    eth_commision: {
        type: Number,
        default: 0
    },
    deposited_before: {
        type: Boolean,
        default: false
    },
    referred_by: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.model("User", UserSchema);

export default User