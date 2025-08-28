import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  // faFacebook,
  // faApple,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();
  // console.log(useAuth());

  const handleGoogleSignup = async () => {
    try {
      await googleSignIn();
      navigate("/account/order");
    } catch (error) {
      setErrorMessage("Failed to sign up with Google", error);
    }
  };

  const handleChange = (e) => {
     setEmail(e.target.value);
  };

  useEffect(() => {
    // Retrieve email from local storage on component mount
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation (you might want to use a more robust validation library)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    //set email in local storage
    localStorage.setItem("email", email);

    // Navigate to the password input page, passing the email as a query parameter
    navigate(`/password-input?email=${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {/* Display error if there's an issue */}
        {errorMessage && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {errorMessage}
          </p>
        )}

        {/* Social Media Signup */}
        <div className="flex flex-col space-y-4 mb-6">
          <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-500 transition-colors duration-300">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Sign up with
            Google
          </button>

          {/* <button className="flex items-center justify-center w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors duration-300">
            <FontAwesomeIcon icon={faFacebook} className="mr-2" /> Sign up with
            Facebook
          </button> */}

          {/* <button className="flex items-center justify-center w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <FontAwesomeIcon icon={faApple} className="mr-2" /> Sign up with
            Apple
          </button>*/}
          </div> 

        <div className="text-center text-gray-500 mb-6">
          <span>or sign up with your email</span>
        </div>

        {/* Email Signup Form */}
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
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-500 transition-colors duration-300"
          >
            Continue
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;
