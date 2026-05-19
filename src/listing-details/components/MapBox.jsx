import React from "react";

function MapBox({ location }) {
  if (!location) {
    return (
      <div className="bg-gray-100 rounded-2xl p-6 text-center">
        <p className="text-gray-500">Brak lokalizacji</p>
      </div>
    );
  }

  const encodedLocation = encodeURIComponent(location);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Lokalizacja</h2>

      <div className="w-full h-64 rounded-xl overflow-hidden">
        <iframe
          title="Google Maps"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          className="border-0"
          src={`https://www.google.com/maps?q=${encodedLocation}&output=embed`}
        ></iframe>
      </div>

      <p className="mt-3 text-sm text-gray-500">{location}</p>
    </div>
  );
}

export default MapBox;
