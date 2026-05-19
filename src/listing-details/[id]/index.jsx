import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import DetailHeader from "../components/DetailHeader";
import { useParams } from "react-router-dom";
import { db } from "./../../../configs";
import { CarImages, CarListing } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";
import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";
import Features from "../components/Features";
import Footer from "@/components/Footer";
import Pricing from "../components/Pricing";
import Specification from "../components/Specification";
import OwnersDetail from "../components/OwnersDetail";
import FinanacialCalculator from "../components/FinanacialCalculator";
import MostSearchedCar from "@/components/MostSearchedCar";
import MapBox from "../components/MapBox";

function ListingDetail() {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();

  useEffect(() => {
    GetCarDetail();
  }, [id]);

  const GetCarDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, id));

    const resp = Service.FormatResult(result);

    setCarDetail(resp[0]);
  };

  return (
    <div>
      <Header />

      <div className="p-4 md:py-10 page-container overflow-x-hidden">
        {/* Header Detail Component  */}
        <DetailHeader carDetail={carDetail} />
        <div className="mt-10 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {/* ===== MOBILE: GALERIA ===== */}
          <div className="lg:hidden">
            <ImageGallery carDetail={carDetail} />
          </div>

          {/* ===== MOBILE: PRAWA KOLUMNA POD GALERIĄ ===== */}
          <div className="lg:hidden space-y-6">
            <Pricing carDetail={carDetail} />
            <Description carDetail={carDetail} />
            <Specification carDetail={carDetail} />
            <MapBox location={carDetail?.location} />
            <Features listingId={carDetail?.id} />

            <OwnersDetail carDetail={carDetail} />

            <FinanacialCalculator price={carDetail?.sellingPrice} />
          </div>

          {/* ===== MOBILE: RESZTA ===== */}
          <div className="lg:hidden space-y-6"></div>

          {/* ================= DESKTOP ================= */}

          {/* LEWA KOLUMNA */}
          <div className="hidden lg:block lg:col-span-2 space-y-6">
            <ImageGallery carDetail={carDetail} />
            <Description carDetail={carDetail} />
            <Features listingId={carDetail?.id} />
            <FinanacialCalculator price={carDetail?.sellingPrice} />
          </div>

          {/* PRAWA KOLUMNA */}
          <div className="hidden lg:block space-y-6">
            <Pricing carDetail={carDetail} />
            <Specification carDetail={carDetail} />
            <MapBox location={carDetail?.location} />
            <OwnersDetail carDetail={carDetail} />
          </div>
        </div>

        <MostSearchedCar />
      </div>
      <Footer />
    </div>
  );
}

export default ListingDetail;
