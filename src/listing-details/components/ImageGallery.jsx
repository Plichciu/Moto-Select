import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

export default function ImageGallery({ carDetail }) {
  const images = carDetail?.images || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [activeIndex]);

  if (images.length === 0) return null;

  return (
    <div className="w-full">
      <div className="w-full mb-4 relative bg-gray-200 rounded-xl flex items-center justify-center">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <FaSpinner className="text-3xl text-gray-500 animate-spin" />
          </div>
        )}

        <img
          src={images[activeIndex].imageUrl}
          alt={`Zdjęcie ${activeIndex + 1}`}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          className={`w-full h-[320px] sm:h-[450px] md:h-[500px] object-contain rounded-xl transition-opacity ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 border-2 rounded-lg transition ${
              index === activeIndex
                ? "border-blue-500"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={img.imageUrl}
              alt={`Miniatura ${index + 1}`}
              className="w-28 h-20 object-cover rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
