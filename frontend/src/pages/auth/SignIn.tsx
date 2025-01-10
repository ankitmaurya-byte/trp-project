import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { useNavigate } from "react-router-dom";
const handleGoogleLogin = () => {
  // Replace 'http://localhost:5000' with your backend URL
  window.location.href = "http://localhost:5000/api/v1/auth/google";
};
const SignIn = () => {
  const navigate = useNavigate();
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
          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn Icon"
              className="w-5 h-5 mr-2"
            />
            Sign in with LinkedIn
          </button>

          {/* GitHub Sign-In */}
          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub Icon"
              className="w-5 h-5 mr-2"
            />
            Sign in with GitHub
          </button>

          {/* Email Sign-In */}
          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition">
            <span className="material-icons mr-2">
              <EmailIcon />
            </span>
            Sign in with Email
          </button>
          {/* Email Sign-In */}

          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition">
            <span className="material-icons mr-2">
              <PasswordIcon />
            </span>
            Password
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
