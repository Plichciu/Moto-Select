import { useEffect, useState } from "react";
import Search from "./Search";
import "./../index.css";

const cars = ["/main-car-1.webp", "/main-car-2.png", "/main-car-3.png"];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cars.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm text-center lg:text-left text-gray-400 uppercase tracking-wide">
              Ogłoszenia samochodowe
            </p>

            <h1 className="mt-3 text-center lg:text-left text-4xl md:text-5xl font-bold">
              Kupuj i sprzedawaj <br /> bez
              <span className="text-primary"> stresu</span>
            </h1>

            <p className="mt-4  text-center lg:text-left text-gray-500">
              Porównuj ceny, wyposażenie i lokalizacje. Wszystko w jednym
              miejscu.
            </p>

            <div className="mt-2">
              <Search />
            </div>
          </div>

          <div className="relative h-[320px] md:h-[420px] flex items-center justify-center">
            <div className="absolute -inset-10 bg-purple-100 rounded-full blur-3xl opacity-50" />

            {cars.map((src, index) => (
              <img
                key={src}
                src={src}
                alt="Samochód"
                className={`
                  absolute w-full max-w-2xl
                  transition-all duration-1000 ease-in-out
                  drop-shadow-2xl
                  ${
                    index === activeIndex
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-6 scale-95"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
