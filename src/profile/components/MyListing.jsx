import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { db } from "./../../../configs";
import {
  CarImages,
  CarListing,
  ListingFeatures,
} from "./../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Service from "@/Shared/Service";
import CarItem from "@/components/CarItem";
import { AlertDialogDemo } from "./AlertDialogDemo";
function MyListing() {
  const { user } = useUser();
  const location = useLocation();
  const [carList, setCarList] = useState([]);
  useEffect(() => {
    if (user) {
      GetUserCarListing();
    }
  }, [user, location.key]);
  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CarListing.id), CarImages.id);

    const resp = Service.FormatResult(result);
    console.log(resp);
    console.log(user?.primaryEmailAddress?.emailAddress);
    setCarList(resp);
  };

  const onDeleteListing = async (listingId) => {
    try {
      await db
        .delete(ListingFeatures)
        .where(eq(ListingFeatures.listingId, listingId));

      await db.delete(CarImages).where(eq(CarImages.carListingId, listingId));

      await db.delete(CarListing).where(eq(CarListing.id, listingId));

      GetUserCarListing();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Moje Ogłoszenia</h3>
        <Link to={"/add-listing"}>
          <Button>+ Dodaj Ogłoszenie</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
        {carList.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className="p-2 bg-gray-50 rounded-lg flex justify-between gap-3">
              <Link
                to={"/add-listing?mode=edit&id=" + item?.id}
                className="w-full"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                <Button variant="outline" className="w-full">
                  Edytuj
                </Button>
              </Link>
              <AlertDialogDemo onConfirm={() => onDeleteListing(item.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListing;
