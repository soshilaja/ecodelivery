

const benefits = [
  {
    title: "Sustainable Practices",
    description:
      "Our services minimize environmental impact by using electric vehicles and carbon-neutral logistics.",
  },
  {
    title: "Recycling Initiatives",
    description:
      "We actively participate in recycling and eco-friendly packaging to promote sustainability in every delivery.",
  },
  {
    title: "Global Impact",
    description:
      "With every delivery, you contribute to global efforts to reduce emissions and combat climate change.",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">
        Why Choose Eco-Friendly Delivery?
      </h2>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
        Learn how we reduce carbon footprints by providing green deliveries. Our
        platform helps you make environmentally conscious choices while ensuring
        fast and reliable service.
      </p>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
