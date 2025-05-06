import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { prodUri } from "../constant";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Send OTP to phone number
  const sendOTP = async () => {
    setError("");
    setLoading(true);
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
      setConfirmationResult(result);
      setLoading(false);
      alert("OTP sent successfully");
    } catch (err) {
      setError(err.message || "Failed to send OTP");
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!confirmationResult) {
      setError("Please send OTP first");
      setLoading(false);
      return;
    }

    try {
      const credential = await confirmationResult.confirm(otp);
      const idToken = await credential.user.getIdToken();

      await axios.post(
        `${prodUri}api/auth/register`,
        { name, email, password, role: "user", phoneIdToken: idToken },
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone Number (e.g., +1234567890)"
          className="w-full p-2 border rounded mb-4"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <button
          type="button"
          onClick={sendOTP}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded mb-4"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded"
          onClick={handleSubmit}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignupPage;