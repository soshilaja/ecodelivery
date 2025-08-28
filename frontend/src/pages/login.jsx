import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  // faFacebook,
  // faApple,
} from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { signIn, googleSignIn } = useAuth();

  // Sanitize the input (simple example)
  const sanitizeInput = (input) => {
    return input.trim(); // Removes leading and trailing spaces
  };

  const handleGoogleLogin = async () => {
    try {
     await googleSignIn();
      navigate("/account/profile");
    } catch (error) {
      setError("Failed to sign in with Google", error);
    }
  }


  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input sanitization
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    // Simple email format validation (can be enhanced)
    if (
      !sanitizedEmail ||
      !sanitizedPassword ||
      !sanitizedEmail.includes("@")
    ) {
      setError("Invalid email or password.");
      return;
    }

    // Perform the API request
    try {
      
      await signIn(sanitizedEmail, sanitizedPassword);
      navigate("/account/order");
    } catch (error) {
      setError("Invalid credentials", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome back</h2>

        {/* Display error if there's an issue */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Social Media Signup */}
        <div className="flex flex-col space-y-4 mb-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-500 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Sign in with
            Google
          </button>

          {/* <button className="flex items-center justify-center w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors duration-300">
            <FontAwesomeIcon icon={faFacebook} className="mr-2" /> Sign up with
            Facebook
          </button> */}

          {/* <button className="flex items-center justify-center w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <FontAwesomeIcon icon={faApple} className="mr-2" /> Sign up with
            Apple
          </button> */}
        </div>

        <div className="text-center text-gray-500 mb-6">
          <span>or log in with your email</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-500 transition-colors duration-300"
          >
            Sign in
          </Button>
        </form>

        {/* Link to Signup */}
        <p className="text-center text-gray-600 mt-4">
          Don&#39;t have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign up here
          </Link>
          .
        </p>

        {/* Forgot Password */}
        <p className="text-center text-gray-600 mt-2">
          <Link
            to="/forgot-password"
            className="text-green-600 hover:underline"
          >
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
