import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdvancedSearch() {
  const navigate = useNavigate();

  const [make, setMake] = useState("");
  const [condition, setCondition] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const onSearch = () => {
    const params = new URLSearchParams();

    if (make) params.append("make", make);
    if (condition) params.append("condition", condition);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    navigate(`/search/advanced?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-4 ">
      {/* Marka */}
      <input
        type="text"
        placeholder="Brand (e.g. BMW)"
        className="border rounded-lg p-2"
        value={make}
        onChange={(e) => setMake(e.target.value)}
      />

      {/* Stan */}
      <select
        className="border rounded-lg p-2"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      >
        <option value="">Condition</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>

      {/* Cena */}
      <input
        type="number"
        placeholder="Min price"
        className="border rounded-lg p-2"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max price"
        className="border rounded-lg p-2"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button
        onClick={onSearch}
        className="bg-primary text-white rounded-lg px-4 py-2 md:col-span-4"
      >
        Szukaj
      </button>
    </div>
  );
}

export default AdvancedSearch;
