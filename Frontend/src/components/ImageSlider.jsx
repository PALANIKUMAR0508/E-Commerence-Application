import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
];
const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0); //0=>first image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length); //irukura images mattum repeat pannikuthu irukum
    }, 4000);
    return () => clearInterval(interval); //vantha images thirpa varathu
  }, []);
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };
  return (
    <div className="relative w-full shadow-lg overflow-hidden">
      {/*Slider*/}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }} //Slide 0 → no movement Slide 1 → move left 100% Slide 2 → move left 200%
      >
        {images.map((images, index) => (
          <img
            src={images}
            key={index}
            className="h-75 w-full md:h-112.5 object-cover shrink-0"
          /> //shrink-0 image vanthu small aagathu
        ))}
      </div>
      {/*Previous Button*/}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
      >
        <ChevronLeft />
      </button>
      {/*Next Button*/}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
      >
        <ChevronRight />
      </button>
      {/*Indicators*/}
      <div className="absolute bottom-4 left-1/2 translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-6 bg-white" : "w-2 bg-white/50"}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
