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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Sign in
          </button>
          <p className="text-black">or login with phone</p>
          {/* Phone Number Sign-In */}
          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Phone Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
