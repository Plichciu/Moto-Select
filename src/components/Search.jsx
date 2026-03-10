import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import Data from "@/Shared/Data";
import CitySelect from "@/add-listing/components/CitySelect";
import carDetails from "@/Shared/carDetails.json";
import SearchSelect from "./SearchSelect";
import RangeInput from "./RangeInput";

function Search() {
  const navigate = useNavigate();

  const bodyTypeOptions =
    carDetails.carDetails.find((item) => item.name === "category")?.options ||
    [];

  const driveTypeOptions =
    carDetails.carDetails.find((item) => item.name === "driveType")?.options ||
    [];

  const fuelTypeOptions =
    carDetails.carDetails.find((item) => item.name === "fuelType")?.options ||
    [];

  const transmissionOptions =
    carDetails.carDetails.find((item) => item.name === "transmission")
      ?.options || [];

  const radiusOptions = [
    { value: "10", label: "+10 km" },
    { value: "20", label: "+20 km" },
    { value: "30", label: "+30 km" },
    { value: "50", label: "+50 km" },
  ];

  // BASIC
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState("");
  const [make, setMake] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // MORE FILTERS
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [category, setCategory] = useState("");
  const [minHp, setMinHp] = useState("");
  const [maxHp, setMaxHp] = useState("");
  const [driveType, setDriveType] = useState("");

  // LOCATION
  const [city, setCity] = useState(null);
  const [radius, setRadius] = useState("30");

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const isDisabled =
    !query &&
    !condition &&
    !make &&
    !minPrice &&
    !maxPrice &&
    !city &&
    !minYear &&
    !maxYear &&
    !transmission &&
    !fuelType &&
    !category &&
    !minHp &&
    !maxHp &&
    !minMileage &&
    !maxMileage &&
    !driveType;

  const onSearch = () => {
    if (isDisabled) return;

    const params = new URLSearchParams();

    if (query) params.append("query", query);
    if (condition) params.append("condition", condition);
    if (make) params.append("make", make);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (minYear) params.append("minYear", minYear);
    if (maxYear) params.append("maxYear", maxYear);
    if (transmission) params.append("transmission", transmission);
    if (fuelType) params.append("fuelType", fuelType);
    if (minMileage) params.append("minMileage", minMileage);
    if (maxMileage) params.append("maxMileage", maxMileage);
    if (category) params.append("category", category);
    if (minHp) params.append("minHp", minHp);
    if (maxHp) params.append("maxHp", maxHp);
    if (driveType) params.append("driveType", driveType);

    if (city) {
      params.append("lat", city.lat);
      params.append("lon", city.lon);
      params.append("radius", radius);
    }

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full page-container px-0">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-[900px] mx-auto">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
          Znajdź idealny samochód
        </h3>

        {/* QUERY */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Marka lub model
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="np. BMW X5, Audi A4..."
            className="w-full h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* BASIC FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* CONDITION */}
          <SearchSelect
            label="Stan"
            value={condition}
            onChange={setCondition}
            placeholder="Dowolny"
            options={["Nowy", "Używany", "Uszkodzony"]}
          />

          {/* MAKE */}
          <SearchSelect
            label="Marka"
            value={make}
            onChange={setMake}
            placeholder="Dowolna"
            options={Data.CarMakes.map((m) => m.name)}
          />
          {/* PRICE */}

          <RangeInput
            labelFrom="Cena minimalna"
            labelTo="Cena maksymalna"
            valueFrom={minPrice}
            valueTo={maxPrice}
            onChangeFrom={setMinPrice}
            onChangeTo={setMaxPrice}
            placeholderFrom="Od (zł)"
            placeholderTo="Do (zł)"
          />
        </div>

        {/* MORE FILTERS TOGGLE */}
        <button
          type="button"
          onClick={() => setShowMoreFilters((p) => !p)}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition"
        >
          <LuSettings2 size={18} />
          {showMoreFilters ? "Ukryj filtry" : "Więcej filtrów"}
        </button>

        {/* MORE FILTERS */}
        {showMoreFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-top-2">
            <RangeInput
              labelFrom="Minimalny rok produkcji"
              labelTo="Maksymalny rok produkcji"
              valueFrom={minYear}
              valueTo={maxYear}
              onChangeFrom={setMinYear}
              onChangeTo={setMaxYear}
              placeholderFrom="Rok od"
              placeholderTo="Rok do"
            />

            {/* TRANSMISSION */}

            <SearchSelect
              label="Skrzynia biegów"
              value={transmission}
              onChange={setTransmission}
              placeholder="Dowolna"
              options={transmissionOptions}
            />

            {/* FUEL */}
            <SearchSelect
              label="Rodzaj paliwa"
              value={fuelType}
              onChange={setFuelType}
              placeholder="Dowolne"
              options={fuelTypeOptions}
            />

            {/* MILEAGE */}
            <RangeInput
              labelFrom="Przebieg minimalny"
              labelTo="Przebieg maksymalny"
              valueFrom={minMileage}
              valueTo={maxMileage}
              onChangeFrom={setMinMileage}
              onChangeTo={setMaxMileage}
              placeholderFrom="Przebieg od (km)"
              placeholderTo="Przebieg do (km)"
            />

            {/* NAPĘD */}

            <SearchSelect
              label="Napęd"
              value={driveType}
              onChange={setDriveType}
              options={driveTypeOptions}
            />

            {/* NADWOZIE */}

            <SearchSelect
              label="Typ nadwozia"
              value={category}
              onChange={setCategory}
              options={bodyTypeOptions}
            />

            {/* KONIE MECHANICZNE */}

            <RangeInput
              labelFrom="Minimalna liczba koni"
              labelTo="Maksymalna liczba koni"
              valueFrom={minHp}
              valueTo={maxHp}
              onChangeFrom={setMinHp}
              onChangeTo={setMaxHp}
              placeholderFrom="Moc od (KM)"
              placeholderTo="Moc do (KM)"
            />

            {/* LOCATION */}

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Miejscowość
              </label>
              <CitySelect
                classname="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary"
                onChange={setCity}
              />
            </div>

            <SearchSelect
              label="Promień"
              value={radius}
              onChange={setRadius}
              placeholder="Promień"
              options={radiusOptions}
            />
          </div>
        )}

        {/* SEARCH BUTTON */}
        <button
          onClick={onSearch}
          disabled={isDisabled}
          className={`mt-6 w-full h-12 rounded-xl font-semibold transition ${
            isDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:opacity-90"
          }`}
        >
          Szukaj samochodów
        </button>
      </div>
    </div>
  );
}

export default Search;
