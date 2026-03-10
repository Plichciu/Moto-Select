import { useEffect, useState } from "react";

const slides = [
  {
    mobile: "/adBaner-mob-1.png",
    desktop: "/adBaner-1.png",
    alt: "Reklama 1",
  },
  {
    mobile: "/adBaner-mob-2.png",
    desktop: "/adBaner-2.png",
    alt: "Reklama 2",
  },
];

export default function AdBanner() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 md:px-6 lg:px-8  py-44">
      <div className="mx-auto max-w-[1000px] overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={isMobile ? slide.mobile : slide.desktop}
              alt={slide.alt}
              className="
                w-full
                shrink-0
                object-cover
                aspect-[1200/450]
                max-md:aspect-[800/620]
              "
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
