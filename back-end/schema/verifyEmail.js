import mongoose from "mongoose";

let verifyEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
    },
    expiredOtp: {
      type: String,
    },
  },
  { timestamps: true }
);

let verifyModel = mongoose.model("verifyemails", verifyEmailSchema);

export default verifyModel;
