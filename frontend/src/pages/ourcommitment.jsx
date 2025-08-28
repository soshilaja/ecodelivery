import React from "react";
import {Link} from "react-router-dom";

const Commitment = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Commitment to Sustainability
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            At Eco Delivery, sustainability is at the core of everything we do.
            We are committed to reducing our carbon footprint, minimizing waste,
            and promoting a cleaner, greener future.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Carbon Neutral Deliveries
            </h2>
            <p className="mt-4 text-gray-700">
              We offset all emissions produced by our delivery fleet through
              certified carbon offset programs. Our goal is to be completely
              carbon-neutral by 2025.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Eco-Friendly Packaging
            </h2>
            <p className="mt-4 text-gray-700">
              All of our packaging is made from 100% recyclable or biodegradable
              materials, ensuring that we minimize the environmental impact of
              our services.
            </p>
          </div>
          {/* Section 2 */}

          {/* Section 3 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Community Initiatives
            </h2>
            <p className="mt-4 text-gray-700">
              We're involved in tree-planting projects and collaborate with
              local communities to reduce waste and promote sustainability at a
              grassroots level.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Join Us in Making a Difference
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Together, we can create a greener future. Learn more about our
            efforts and how you can get involved.
          </p>
          <Link
            to="/sustainability/offset"
            className="mt-8 inline-block bg-green-900 hover:bg-green-700 text-white text-lg font-semibold py-3 px-8 rounded-full"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Commitment;
