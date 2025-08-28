import {Link} from "react-router-dom";

const EcoFriendlyTips = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
            Eco-Friendly Tips for a Sustainable Lifestyle
          </h1>
          <p className="mt-4 text-xl text-gray-700">
            At Eco Delivery, we&#39;re committed to sustainability not only in our
            services but also by encouraging others to adopt eco-friendly
            habits. Here are some tips to help you reduce your environmental
            impact.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tip 1 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              1. Reduce Plastic Use
            </h2>
            <p className="mt-4 text-gray-700">
              Avoid single-use plastics like straws, bags, and bottles. Opt for
              reusable alternatives such as cloth bags, metal straws, and
              refillable water bottles to reduce plastic waste.
            </p>
          </div>

          {/* Tip 2 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              2. Choose Sustainable Transportation
            </h2>
            <p className="mt-4 text-gray-700">
              Whenever possible, walk, bike, or use public transport. If driving
              is necessary, consider carpooling or using electric vehicles to
              reduce your carbon footprint.
            </p>
          </div>

          {/* Tip 3 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              3. Opt for Energy-Efficient Appliances
            </h2>
            <p className="mt-4 text-gray-700">
              Invest in energy-efficient appliances that consume less
              electricity, reducing your household’s energy usage and lowering
              your carbon emissions.
            </p>
          </div>

          {/* Tip 4 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              4. Support Local and Organic Foods
            </h2>
            <p className="mt-4 text-gray-700">
              Purchase local, organic, and seasonal produce to reduce the carbon
              footprint associated with food transportation and to support
              sustainable farming practices.
            </p>
          </div>

          {/* Tip 5 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              5. Minimize Water Usage
            </h2>
            <p className="mt-4 text-gray-700">
              Fix leaks, install water-saving devices, and be mindful of water
              consumption in daily activities to conserve this vital resource.
            </p>
          </div>

          {/* Tip 6 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              6. Reduce, Reuse, Recycle
            </h2>
            <p className="mt-4 text-gray-700">
              Practice the 3 R&#39;s: reduce consumption, reuse materials, and
              recycle whenever possible. This simple principle helps decrease
              waste and promotes sustainability.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Let’s Work Together for a Greener Future
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Small changes can make a big difference. By incorporating these
            eco-friendly tips into your life, you can help create a more
            sustainable world.
          </p>
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

export default EcoFriendlyTips;
