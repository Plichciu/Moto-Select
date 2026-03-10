import Data from "@/Shared/Data";
import React from "react";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="mt-20 px-4 md:px-20 page-container">
      <h2 className="font-bold text-3xl text-center mb-12">
        Wybierz typ pojazdu
      </h2>

      <div
        className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          gap-6
        "
      >
        {Data.Category.map((category, index) => (
          <Link
            key={index}
            to={`/search?category=${category.name}`}
            className="group"
          >
            <div
              className="
                h-full
                bg-white
                border border-gray-200
                rounded-lg
                p-2
                flex flex-col items-center
                transition
                hover:border-gray-300 hover:shadow-md
              "
            >
              {/* IMAGE */}
              <img
                src={category.icon}
                alt={category.name}
                className="
                  w-full max-w-[180px]
                  object-contain
                 
                  transition-transform duration-300
                  scale-115
                "
              />

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
