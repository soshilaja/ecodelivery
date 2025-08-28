import {Link} from "react-router-dom";

const GreenDeals = () => {
  return (
    <section className="py-16 bg-green-900 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Green Deals</h2>
      <p className="mb-8">
        Check out the latest discounts on eco-friendly deliveries. We provide
        cost-effective solutions while keeping the planet green!
      </p>
          <Link
              to="/promotions"
              className="bg-white text-green-900 font-bold py-2 px-4 rounded hover:bg-gray-200">
        Explore Deals
      </Link>
    </section>
  );
};

export default GreenDeals;
