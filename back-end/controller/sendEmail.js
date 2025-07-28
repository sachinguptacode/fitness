import nodemailer from "nodemailer";
import verifyModel from "../schema/verifyEmail.js";

const otpStore = {}; // { "email": { otp: "123456", expiresAt: timestamp } }

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const sendEmail = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  const expiresAt = Date.now() + 3 * 60 * 1000; // 2 minutes from now

  otpStore[email] = { otp, expiresAt };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sachingupta873701@gmail.com",
      pass: "dpun vbdw evqh pqqm",
    },
  });

  const mailOptions = {
    from: "sachingupta873701@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    let data = await verifyModel.create({
      email: email,
      otp: otp,
      expiredOtp: expiresAt,
    });

    res.status(200).json({ success: true, message: "OTP sent!", data: data });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Email failed", error: err });
  }
};

const verifyOtp = async (req, res) => {
  let { otp } = req.body;
  otp = String(otp);
  const id = req.params.id;

  try {
    if (!otp) {
      return res.status(404).json({ message: "otp field is required" });
    }

    let user = await verifyModel.findById({ _id: id });
    // console.log(user.otp);
    if (!user) {
      return res.status(501).json({ message: "user not exist into db" });
    }

    // if (otp === user._id)
    //   return res.status(201).json({ message: "otp is match" });
    if (Date.now() > user.expiredOtp) {
      return res.status(503).json({ message: "otp is time out" });
    }
    if (otp !== user.otp) {
      return res
        .status(501)
        .json({ success: "false", message: "otp is not match" });
    }
    return res
      .status(201)
      .json({ success: true, message: "verify your email ", data: user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "invalid otp", error: error });
  }
};

export { sendEmail, verifyOtp };
