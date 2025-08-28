import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase"; // Import the Firebase auth and db instance
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import auth function
import {doc, setDoc} from "firebase/firestore";


function PasswordInputPage() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();  

  useEffect(() => {
    // Retrieve email from search params
      setEmail(searchParams.get("email"));
  }, [searchParams]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 12;

    const errors = [];
    if (!hasUpperCase) errors.push("uppercase letter");
    if (!hasLowerCase) errors.push("lowercase letter");
    if (!hasNumber) errors.push("number");
    if (!hasSpecialChar) errors.push("special character");
    if (!isLongEnough) errors.push("minimum length of 12 characters");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = [];

    // Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.push(`Password must include: ${passwordValidation.errors.join(
        ", "
      )}`);
      setErrorMessage(newErrors)
    }

    try {
      // Register user with Firebase authentication
      const createUserResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = createUserResponse.user; // Access user object from response
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        uid: user.uid,
        createdAt: new Date(),
        // Add other user data as needed
      });
      // Successful signup, redirect or handle accordingly
      console.log("User created successfully!");
      localStorage.removeItem("email");
      navigate("/account/order"); // Navigate to a welcome page or dashboard
    } catch (error) {
      console.error("Error :", error);
      // setErrorMessage(error.message); // Display Firebase error messages
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        {/* Display error if there's an issue */}
        {errorMessage && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{errorMessage}</p>}

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
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-500 transition-colors duration-300"
          >
            Continue
          </Button>
        </form>
        {/* back to sign up page*/}
        <p className="text-center text-gray-600 mt-4">
          <Link to="/signup" className="text-green-600 hover:underline">
            Go back
          </Link>
        </p>
      </div>
    </div>
  );
}

export default PasswordInputPage;
