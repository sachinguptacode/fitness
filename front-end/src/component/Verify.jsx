import React, { useState } from "react";
import axios from "axios";

const OTPForm = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [verifyId, setVerifyId] = useState("");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  const sendOtp = async () => {
    try {
      const res = await axios.post("https://fitness-1-s5wl.onrender.com/api/v1/send-email", { email });
      if (res.data.success) {
        setOtpSent(true);
        setVerifyId(res.data.data._id); // store ID from MongoDB
        setMessage("✅ OTP sent to your email.");
      }
    } catch (err) {
      setMessage("❌ Failed to send OTP. Try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`https://fitness-1-s5wl.onrender.com/api/v1/verify/${verifyId}`, {
        otp: otpInput,
      });

      if (res.data.success) {
        setVerified(true);
        setMessage("✅ Email verified successfully!");
      } else {
        setMessage("❌ Incorrect OTP.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ OTP verification failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl p-8 rounded-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Email OTP Verification
        </h2>

        {!verified ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-xl mb-4 outline-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
            />

            {!otpSent ? (
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                onClick={sendOtp}
              >
                Send OTP
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-3 border rounded-xl mb-4 outline-blue-500"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                />
                <button
                  className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                  onClick={verifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}
          </>
        ) : (
          <p className="text-green-600 text-center text-lg font-semibold">
            🎉 Your email has been verified!
          </p>
        )}

        {message && (
          <p className="text-center mt-4 font-semibold text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default OTPForm;
