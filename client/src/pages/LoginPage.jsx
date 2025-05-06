import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { prodUri } from "../constant";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();
  const navigate = useNavigate();
  const recaptchaVerifierRef = useRef(null);

  // Initialize RecaptchaVerifier for phone authentication
  useEffect(() => {
    // Enable testing mode for local development
    auth.settings.appVerificationDisabledForTesting = true;
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      auth, // Correct order: auth first
      "recaptcha-container", // Container ID second
      { size: "invisible" } // Options third
    );
  }, []);

  // Handle email/password login
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(
        `${prodUri}api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setUser(data);
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Send OTP for phone number login
  const sendOTP = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifierRef.current
      );
      setConfirmationResult(result);
      setLoading(false);
      alert("OTP sent successfully");
    } catch (err) {
      setError(err.message || "Failed to send OTP");
      setLoading(false);
    }
  };

  // Handle phone number/OTP login
  const handlePhoneSubmit = async () => {
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

      const { data } = await axios.post(
        `${prodUri}api/auth/login-phone`,
        { phoneIdToken: idToken },
        { withCredentials: true }
      );

      setUser(data);
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        {loginMethod === "email" ? (
          <>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleEmailSubmit}>
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
                className="w-full p-2 border rounded mb-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded"
              >
                Login with Email
              </button>
            </form>
          </>
        ) : (
          <>
            {error && <div className="text-red-500 mb-4">{error}</div>}
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
              type="button"
              onClick={handlePhoneSubmit}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded"
            >
              {loading ? "Logging in..." : "Login with Phone"}
            </button>
          </>
        )}

        <div className="mt-4">
          {loginMethod === "email" ? (
            <p>
              Don't have an email?{" "}
              <button
                onClick={() => setLoginMethod("phone")}
                className="text-blue-500 hover:underline"
              >
                Login with Phone
              </button>
            </p>
          ) : (
            <p>
              Have an email?{" "}
              <button
                onClick={() => setLoginMethod("email")}
                className="text-blue-500 hover:underline"
              >
                Login with Email
              </button>
            </p>
          )}
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginPage;