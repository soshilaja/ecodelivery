import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBicycle,
  faCar,
  faRecycle,
  faMapLocationDot,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center py-12 bg-green-600">
          <h1 className="text-4xl font-bold text-white">
            How Eco Delivery Works
          </h1>
        </header>

        {/* Introduction Section */}
        <section className="mt-12">
          <FontAwesomeIcon icon={faBicycle} />
          <h2 className="text-2xl font-semibold text-green-700">
            A Sustainable Way to Deliver
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            At Eco-Delivery, we’re committed to reducing the environmental
            impact of deliveries. From eco-friendly vehicles to green packaging,
            our service is designed with sustainability at its core.
          </p>
        </section>

        {/* Eco-Friendly Vehicles */}
        <section className="mt-12">
          <FontAwesomeIcon icon={faCar} />
          <h2 className="text-2xl font-semibold text-green-700">
            Electric and Human-Powered Transportation
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            Our delivery fleet includes electric vehicles and bicycles to
            minimize carbon emissions. By utilizing clean energy and human
            power, we ensure your deliveries are eco-friendly.
          </p>
        </section>

        {/* Sustainable Packaging */}
        <section className="mt-12">
          <FontAwesomeIcon icon={faRecycle} />
          <h2 className="text-2xl font-semibold text-green-700">
            Biodegradable and Recyclable Materials
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            All our packaging is made from biodegradable or recyclable
            materials. From the moment your package is prepared to its arrival
            at your door, we’re thinking about sustainability.
          </p>
          <div className="mt-6">
            {/* Add an icon for sustainable packaging */}
          </div>
        </section>

        {/* Optimized Delivery Routes */}
        <section className="mt-12">
          <FontAwesomeIcon icon={faMapLocationDot} />
          <h2 className="text-2xl font-semibold text-green-700">
            Reducing Emissions, One Route at a Time
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            We use advanced route optimization to ensure deliveries are made
            using the shortest and most efficient paths. This reduces fuel
            consumption, vehicle emissions, and delivery times.
          </p>
          <div className="mt-6">{/* Add an icon for route optimization */}</div>
        </section>

        {/* Carbon Offsetting */}
        <section className="mt-12">
          <FontAwesomeIcon icon={faShoePrints} />
          <h2 className="text-2xl font-semibold text-green-700">
            Compensating for Our Impact
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            To further reduce our carbon footprint, we invest in carbon offset
            programs. For every delivery made, we contribute to reforestation
            and renewable energy projects.
          </p>
          <div className="mt-6">{/* Add an icon for carbon offsetting */}</div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            to="/account/order"
            className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 px-8 rounded-full"
          >
            Start Using Eco Delivery Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
