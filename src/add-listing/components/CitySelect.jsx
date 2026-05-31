import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

function CitySelect({ value, onChange, error }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (value) {
      setQuery(value);
      setIsSelecting(true);
    }
  }, [value]);

  useEffect(() => {
    if (isSelecting) return;

    if (query.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const fetchCities = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            query,
          )}&lang=pl&filter=countrycode:pl&type=city&limit=5&apiKey=${API_KEY}`,
          { signal: controller.signal },
        );

        const data = await res.json();
        setResults(data.features || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCities();

    return () => controller.abort();
  }, [query, isSelecting]);

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => {
          setIsSelecting(false);
          setQuery(e.target.value);
        }}
        placeholder="Wpisz miasto"
      />

      {loading && (
        <div className="absolute right-3 top-3 text-xs text-gray-400">
          Szukanie...
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute z-20 bg-white border w-full rounded-md shadow mt-1 max-h-60 overflow-auto">
          {results.map((item, index) => {
            const city =
              item.properties.city ||
              item.properties.town ||
              item.properties.village ||
              item.properties.formatted;

            return (
              <div
                key={index}
                onClick={() => {
                  setIsSelecting(true);
                  setQuery(city);
                  setResults([]);

                  onChange({
                    city,
                    lat: item.geometry.coordinates[1],
                    lon: item.geometry.coordinates[0],
                  });
                }}
                className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
              >
                {item.properties.formatted}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CitySelect;
