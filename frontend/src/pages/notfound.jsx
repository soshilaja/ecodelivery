import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, RotateCw } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [bounceHeight, setBounceHeight] = useState(0);

  // Rotating animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Bouncing animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBounceHeight((prev) => {
        const newHeight = Math.sin(Date.now() / 500) * 20;
        return newHeight;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col items-center justify-center p-4 text-center">
      {/* Main content container */}
      <div className="max-w-2xl mx-auto">
        {/* 404 heading with rotation animation */}
        <div
          className="text-9xl font-bold text-green-600 mb-8"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          404
        </div>

        {/* Bouncing text */}
        <div
          className="text-4xl font-bold text-gray-800 mb-6"
          style={{
            transform: `translateY(${bounceHeight}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          Oops! Page Not Found
        </div>

        {/* Message */}
        <p className="text-xl text-gray-600 mb-8">
          Looks like you&#39;ve ventured into uncharted territory!
          <br />
          The page you&#39;re looking for has gone on vacation. 🏖️
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
          >
            <Home size={20} />
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-300"
          >
            <RotateCw size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;