import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { LuFuel } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
function CarItem({ car }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={"/listing-details/" + car?.id}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <div className="rounded-xl bg-white border hover:shadow-md">
        <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white">
          New
        </h2>

        <div className="relative h-[220px] w-full bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <BiLoaderAlt className="animate-spin text-3xl text-gray-400" />
            </div>
          )}

          <img
            src={car?.images?.[0]?.imageUrl}
            alt={car?.title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            className={`h-[220px] w-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-black text-lg mb-2">{car?.title}</h2>
          <Separator />
          <div className="grid md:grid-cols-3 mt-5">
            <div className="flex flex-col items-center">
              <LuFuel className="text-lg mb-2" />
              <h2>{car?.fuelType} </h2>
            </div>
            <div className="flex flex-col items-center">
              <TbBrandSpeedtest className="text-lg mb-2" />
              <h2>{car?.mileage} KM</h2>
            </div>
            <div className="flex flex-col items-center">
              <GiGearStickPattern className="text-lg mb-2" />
              <h2>{car?.transmission} </h2>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">{car.sellingPrice} zł</h2>
            <h2 className="text-primary text-sm flex gap-2 items-center">
              Szczegóły <MdOpenInNew />
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarItem;
