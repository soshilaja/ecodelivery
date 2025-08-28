
const testimonials = [
  {
    name: "Jane Doe",
    feedback:
      "EcoDelivery has transformed how we think about deliveries. Knowing we're contributing to a greener planet is fantastic.",
  },
  {
    name: "John Smith",
    feedback:
      "Fast, reliable, and eco-friendly. Highly recommend EcoDelivery for all your delivery needs.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">Customer Testimonials</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
            <p className="italic">&#34;{testimonial.feedback}&#34;</p>
            <h3 className="mt-4 text-xl font-semibold">{testimonial.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
