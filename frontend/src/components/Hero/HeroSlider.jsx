// HeroSlider.jsx
import Slider from "react-slick";
import heroBike from "../Hero/hero-bike.jpg";
import deliveryBike from "../Hero/hero-delivery-bike.jpg";
import eBike from "../Hero/hero-ebike.jpg";
import eScooter from "../Hero/hero-escooter.jpg";
import eVehicle from "../Hero/hero-ev.jpg";

function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
    arrows: false,
  };

  const images = [
    { src: heroBike, alt: "Hero Bike" },
    { src: deliveryBike, alt: "Delivery Bike" },
    { src: eBike, alt: "Electric Bike" },
    { src: eScooter, alt: "Electric Scooter" },
    { src: eVehicle, alt: "Electric Vehicle" },
  ];

  return (
    <div className="relative w-full h-[600px] sm:h-[700px] overflow-hidden">
      <Slider
        {...settings}
        className="h-full [&_.slick-list]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full [&_.slick-slide>div]:h-full"
      >
        {images.map((image, index) => (
          <div key={index} className="relative h-full">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
              style={{ backgroundImage: `url(${image.src})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSlider;
