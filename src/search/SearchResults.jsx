import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

import { db } from "../../configs";
import { CarListing, CarImages } from "../../configs/schema";

import { and, or, ilike, eq, sql } from "drizzle-orm";

import Service from "@/Shared/Service";
import CarItem from "../components/CarItem";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Search from "@/components/Search";

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);


  const query = searchParams.get("query");
  const make = searchParams.get("make");
  const condition = searchParams.get("condition");

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const minYear = searchParams.get("minYear");
  const maxYear = searchParams.get("maxYear");

  const transmission = searchParams.get("transmission");
  const fuelType = searchParams.get("fuelType");

  const minMileage = searchParams.get("minMileage");
  const maxMileage = searchParams.get("maxMileage");

  const minHp = searchParams.get("minHp");
  const maxHp = searchParams.get("maxHp");

  const driveType = searchParams.get("driveType");

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const radius = searchParams.get("radius");

  const category = searchParams.get("category");

  useEffect(() => {
    fetchResults();
    window.scrollTo({ top: 0 });
  }, [searchParams]);

  const fetchResults = async () => {
    setLoading(true);

    try {
      const filters = [];

      // 🔍 QUERY: title + brand + model
      if (query?.trim()) {
        filters.push(
          or(
            ilike(CarListing.title, `%${query}%`),
            ilike(CarListing.brand, `%${query}%`),
            ilike(CarListing.model, `%${query}%`),
          ),
        );
      }

      // 🚗 MARKA
      if (make) {
        filters.push(eq(CarListing.brand, make));
      }

      // 📂 KATEGORIA
      if (category) {
        filters.push(eq(CarListing.category, category));
      }

      // 🧾 STAN
      if (condition) {
        filters.push(eq(CarListing.condition, condition));
      }

      // ⚙️ SKRZYNIA
      if (transmission) {
        filters.push(eq(CarListing.transmission, transmission));
      }

      // ⛽ PALIWO
      if (fuelType) {
        filters.push(eq(CarListing.fuelType, fuelType));
      }

      // 💰 CENA (varchar → int)
      if (minPrice) {
        filters.push(sql`${CarListing.sellingPrice}::int >= ${minPrice}`);
      }
      if (maxPrice) {
        filters.push(sql`${CarListing.sellingPrice}::int <= ${maxPrice}`);
      }

      // 📅 ROK
      if (minYear) {
        filters.push(sql`${CarListing.year}::int >= ${minYear}`);
      }
      if (maxYear) {
        filters.push(sql`${CarListing.year}::int <= ${maxYear}`);
      }

      // 🚙 PRZEBIEG
      if (minMileage) {
        filters.push(sql`${CarListing.mileage}::int >= ${minMileage}`);
      }
      if (maxMileage) {
        filters.push(sql`${CarListing.mileage}::int <= ${maxMileage}`);
      }

      // NADWOZIE

      if (category) {
        filters.push(eq(CarListing.category, category));
      }

      // KONIE

      if (minHp) {
        filters.push(sql`${CarListing.horsepower}::int >= ${minHp}`);
      }

      if (maxHp) {
        filters.push(sql`${CarListing.horsepower}::int <= ${maxHp}`);
      }

      // NAPĘD

      if (driveType) {
        filters.push(eq(CarListing.driveType, driveType));
      }

      // 📍 GEO SEARCH (km)
      if (lat && lon && radius) {
        filters.push(sql`
          (
            6371 * acos(
              cos(radians(${lat}::float)) *
              cos(radians(${CarListing.latitude}::float)) *
              cos(radians(${CarListing.longitude}::float) - radians(${lon}::float)) +
              sin(radians(${lat}::float)) *
              sin(radians(${CarListing.latitude}::float))
            )
          ) <= ${radius}
        `);
      }

      const res = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(filters.length ? and(...filters) : undefined);

      const formatted = Service.FormatResult(res);
      setResults(formatted);
    } catch (error) {
      console.error("SEARCH ERROR:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="flex justify-between items-center mb-6 mt-10 page-container">
        <h2 className="text-2xl font-bold">Wyniki wyszukiwania</h2>

        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-gray-100"
        >
          {showFilters ? "Ukryj filtry" : "Pokaż filtry"}
        </button>
      </div>

      {showFilters && (
        <div className="mb-10">
          <Search />
        </div>
      )}

      <div className="py-10 page-container">
        {loading ? (
          <div className="flex justify-center py-20">
            <FaSpinner className="text-3xl animate-spin text-gray-500" />
          </div>
        ) : results.length === 0 ? (
          <p>Nic nie znaleziono.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((car) => (
              <CarItem key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
