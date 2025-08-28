

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">About Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Delivering with care for a sustainable future.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
          <p className="mt-4 text-gray-600">
            Our mission is to make deliveries eco-friendly by reducing carbon
            footprints across all operations. We believe in sustainable, green
            logistics that contribute to a healthier planet and a better future.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <span className="text-green-600 text-3xl">
                <i className="fas fa-leaf"></i>
              </span>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 text-center">
              Sustainability
            </h4>
            <p className="mt-2 text-gray-600 text-center">
              We prioritize green energy solutions and sustainable practices in
              every step of our delivery process.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <span className="text-blue-600 text-3xl">
                <i className="fas fa-recycle"></i>
              </span>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 text-center">
              Innovation
            </h4>
            <p className="mt-2 text-gray-600 text-center">
              Through technology and innovation, we improve efficiency and
              reduce emissions.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <span className="text-yellow-500 text-3xl">
                <i className="fas fa-users"></i>
              </span>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 text-center">
              Community
            </h4>
            <p className="mt-2 text-gray-600 text-center">
              We believe in giving back to the communities we serve, fostering
              local partnerships and environmental education.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-semibold text-gray-800">Our Story</h3>
          <p className="mt-4 text-gray-600">
            Founded in 2023, our company started with a vision to revolutionize
            delivery services by adopting eco-friendly practices. From using
            electric vehicles to offsetting carbon emissions, we have grown into
            a community-focused business that values sustainability, innovation,
            and collaboration. Our journey is just beginning, and we invite you
            to join us in making a difference.
          </p>
        </div>

        {/* Team Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 text-center">
            Meet Our Team
          </h3>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                <img
                  src="/images/jane-smith.png"
                  alt="Team Member 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 text-center mt-4">
                Jane Smith
              </h4>
              <p className="text-gray-600 text-center">CEO & Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                <img
                  src="/images/john-doe.jpg"
                  alt="Team Member 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 text-center mt-4">
                John Doe
              </h4>
              <p className="text-gray-600 text-center">
                Chief Operations Officer
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                <img
                  src="/images/sarah-johnson.png"
                  alt="Team Member 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 text-center mt-4">
                Sarah Johnson
              </h4>
              <p className="text-gray-600 text-center">
                Head of Sustainability
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
