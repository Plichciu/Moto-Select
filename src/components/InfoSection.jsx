import React, { useEffect, useState } from "react";

const images = [
  "/cars/car-1.png",
  "/cars/car-2.png"
];

function InfoSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4 sekundy

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      
      {/* LEFT – IMAGE SLIDER */}
      <div className="relative w-full h-[420px] overflow-hidden rounded-2xl shadow-xl">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-1000 ease-in-out
              ${i === index ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}
      </div>

      {/* RIGHT – CONTENT */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Znajdź swój idealny samochód
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Przeglądaj tysiące ogłoszeń, porównuj oferty i wybieraj
          najlepsze samochody bez stresu i ukrytych kosztów.
        </p>

        <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
          Przeglądaj oferty
        </button>
      </div>
    </section>
  );
}

export default InfoSection;