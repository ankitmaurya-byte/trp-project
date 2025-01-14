// src/components/SignUp.tsx
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

const handleGoogleLogin = () => {
  // Replace 'http://localhost:5000' with your backend URL
  window.location.href = "http://localhost:5000/api/v1/auth/google";
};

const handleLinkedInLogin = () => {
  // Replace 'http://localhost:5000' with your backend URL
  window.location.href = "http://localhost:5000/api/v1/auth/linkedin";
};

const handleGithubLogin = () => {
  // Replace 'http://localhost:5000' with your backend URL
  window.location.href = "http://localhost:5000/api/v1/auth/github";
};

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Added username state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    // Added type annotation
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      // Replace with your API endpoint
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }), // Include username
        }
      );
      if (response.ok) {
        alert("Registration successful! You are now logged in.");
        // Optionally, redirect to the dashboard or home page
        navigate("/");
      } else {
        const data = await response.json();
        if (data.errors) {
          // Handle validation errors
          const errorMessages = data.errors
            .map((err: any) => err.msg)
            .join("\n");
          alert(errorMessages);
        } else if (data.message) {
          // Handle other errors
          alert(data.message);
        } else {
          alert("Sign up failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign Up
        </h2>
        <div className="space-y-4">
          {/* Google Sign-In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            <GoogleIcon className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>

          {/* LinkedIn Sign-In */}
          <button
            onClick={handleLinkedInLogin}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            <LinkedInIcon className="w-5 h-5 mr-2" />
            Sign up with LinkedIn
          </button>

          {/* GitHub Sign-In */}
          <button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            <GitHubIcon className="w-5 h-5 mr-2" />
            Sign up with GitHub
          </button>

          {/* Email Sign-Up */}
          <button
            onClick={() => setShowEmailForm(!showEmailForm)}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            <EmailIcon className="mr-2" />
            Sign up with Email
          </button>

          {showEmailForm && (
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              {/* Username Field */}
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black"
                required
              />

              {/* Email Field */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black"
                required
              />

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </form>
          )}

          <p className="text-black text-center">or login with phone</p>

          {/* Phone Number Sign-In */}
          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition">
            <PhonelinkLockIcon className="mr-2" />
            Sign up with Phone Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
