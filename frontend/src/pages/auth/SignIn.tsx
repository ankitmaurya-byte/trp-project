import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const handleGoogleLogin = () => {
  window.location.href = "http://localhost:5000/api/v1/auth/google";
};
const handleLinkedInLogin = () => {
  window.location.href = "http://localhost:5000/api/v1/auth/linkedin";
};
const handleGithubLogin = () => {
  window.location.href = "http://localhost:5000/api/v1/auth/github";
};
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign In
        </h2>
        <div className="space-y-4">
          {/* Google Sign-In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google Icon"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
          {/* LinkedIn Sign-In */}
          <button
            onClick={handleLinkedInLogin}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn Icon"
              className="w-5 h-5 mr-2"
            />
            Sign in with LinkedIn
          </button>
          {/* GitHub Sign-In */}
          <button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub Icon"
              className="w-5 h-5 mr-2"
            />
            Sign in with GitHub
          </button>
          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg bg-white text-black"
          />
          {/* Password Input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg bg-white text-black"
          />{" "}
          {/* Email Sign-In Button */}
          <button
            onClick={handleEmailLogin}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            <span className="material-icons mr-2">
              <EmailIcon />
            </span>
            Sign in
          </button>
          <p className="text-black">or login with phone</p>
          {/* Phone Number Sign-In */}
          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition">
            <span className="material-icons mr-2">
              <PhonelinkLockIcon />
            </span>
            Sign in with Phone Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
