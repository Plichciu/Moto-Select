import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ closeSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/search?query=${encodeURIComponent(query)}`);

    setQuery("");
    closeSearch();
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="page-container py-6">
      <div className="flex gap-2 items-center">
        <Input
          className="h-12 text-lg"
          placeholder="Wyszukaj pojazd..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleEnter}
        />

        {/* DESKTOP BUTTON */}
        <Button onClick={handleSearch} className="hidden md:flex h-12 px-8">
          Search
        </Button>

        {/* MOBILE ICON BUTTON */}
        <Button
          onClick={handleSearch}
          size="icon"
          className="md:hidden h-12 w-12"
          aria-label="Search"
        >
          <FaSearch size={18} />
        </Button>
      </div>
    </div>
  );
}
