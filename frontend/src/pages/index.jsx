//Home.jsx
import { Link } from "react-router-dom";
import HeroSlider from "../components/Hero/HeroSlider";
import Benefits from "../components/Benefits";
import GreenDeals from "../components/GreenDeals";
import Impact from "../components/Impact";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      {/* Hero Section with Overlay */}
      <div className="relative">
        <HeroSlider />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Eco-Friendly Deliveries for a Sustainable Future
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 drop-shadow-md max-w-3xl mx-auto">
              Save the planet one delivery at a time!
            </p>
            <Link
              to="/account/order"
              className="inline-block bg-green-600 hover:bg-green-700 text-white text-lg font-semibold 
                py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl 
                transform hover:-translate-y-1 active:translate-y-0"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Benefits />
      <GreenDeals />
      <Impact />
      <Testimonials /> 
      
    </>
  );
};

export default Home;