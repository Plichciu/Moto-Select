import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import carDetails from "./../Shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { db } from "./../../configs";

import {
  CarImages,
  CarListing,
  Features,
  ListingFeatures,
  Users,
} from "./../../configs/schema";

import TextAreaField from "./components/TextAreaField";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";

import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "sonner";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import moment from "moment";
import { eq } from "drizzle-orm";

import Service from "@/Shared/Service";
import CitySelect from "./components/CitySelect";

function AddListing() {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);

  const [triggerUploadImages, setTriggerUploadImages] = useState();

  const [searchParams] = useSearchParams();

  const [loader, setLoader] = useState(false);
  const [carInfo, setCarInfo] = useState();

  const navigate = useNavigate();

  const { user } = useUser();

  const [hasImages, setHasImages] = useState(false);
  const [errors, setErrors] = useState({});

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    getFeatures();

    if (mode === "edit") {
      GetListingDetail();
    }
  }, []);

  /* ================= FEATURES ================= */

  const getFeatures = async () => {
    const result = await db.select().from(Features);

    setFeaturesList(result);
  };

  const handleFeatureChange = (featureId, checked) => {
    if (checked) {
      setFeaturesData((prev) => [...prev, featureId]);
    } else {
      setFeaturesData((prev) => prev.filter((id) => id !== featureId));
    }
  };

  /* ================= LISTING DETAILS ================= */

  const GetListingDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, recordId));

    const resp = Service.FormatResult(result);

    setCarInfo(resp[0]);
    setFormData(resp[0]);

    const featureResult = await db
      .select()
      .from(ListingFeatures)
      .where(eq(ListingFeatures.listingId, recordId));

    const featureIds = featureResult.map((item) => item.featureId);

    setFeaturesData(featureIds);
  };

  /* ================= FORM ================= */

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    const newErrors = {};

    for (const item of carDetails.carDetails) {
      if (!item.required) continue;

      const value = formData?.[item.name];

      if (value === undefined || value === null || value === "") {
        newErrors[item.name] = `Pole ${item.label.toLowerCase()} jest wymagane`;

        break;
      }
    }

    setErrors(newErrors);

    const firstErrorKey = Object.keys(newErrors)[0];

    if (firstErrorKey) {
      toast.error(newErrors[firstErrorKey]);

      return false;
    }

    return true;
  };

  /* ================= SUBMIT ================= */

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    if (!hasImages) {
      toast.error("Proszę dodać przynajmniej jedno zdjęcie");

      setLoader(false);

      return;
    }

    setLoader(true);

    try {
      /* ================= UPDATE ================= */

      if (mode === "edit") {
        await db
          .update(CarListing)
          .set({
            ...formData,

            createdBy: user?.primaryEmailAddress?.emailAddress,

            userName: user?.fullName,

            userImageUrl: user?.imageUrl,

            postedOn: moment().format("DD/MM/yyyy"),
            userId: dbUser.id,
          })
          .where(eq(CarListing.id, recordId));

        await db
          .delete(ListingFeatures)
          .where(eq(ListingFeatures.listingId, recordId));

        for (const featureId of featuresData) {
          await db.insert(ListingFeatures).values({
            listingId: recordId,
            featureId,
          });
        }

        toast.success("Ogłoszenie zaktualizowane");

        navigate("/profile");

        setLoader(false);

        return;
      }

      /* ================= INSERT LISTING ================= */

      const currentUser = await db
        .select()
        .from(Users)
        .where(eq(Users.clerkUserId, user.id));

      const dbUser = currentUser[0];

      const result = await db
        .insert(CarListing)
        .values({
          ...formData,

          createdBy: user?.primaryEmailAddress?.emailAddress,

          userName: user?.fullName,

          userImageUrl: user?.imageUrl,

          postedOn: moment().format("DD/MM/yyyy"),

          userId: dbUser.id,
        })
        .returning({ id: CarListing.id });

      if (result) {
        const listingId = result[0]?.id;

        for (const featureId of featuresData) {
          await db.insert(ListingFeatures).values({
            listingId,
            featureId,
          });
        }

        console.log("Data Saved");

        setTriggerUploadImages(listingId);

        setLoader(false);
      }
    } catch (e) {
      setLoader(false);

      toast.error("Proszę wypełnić wszystkie wymagane pola");

      console.log("Error", e);
    }
  };

  return (
    <div>
      <Header />

      <div className="page-container">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            {mode === "edit" ? "Edytuj ogłoszenie" : "Dodaj nowe ogłoszenie"}
          </h1>

          <p className="text-gray-500 mt-2 max-w-2xl">
            Uzupełnij poniższe informacje. Pola oznaczone * są wymagane.
          </p>
        </div>

        <form className="p-10 border rounded-xl mt-10">
          {/* ================= CAR DETAILS ================= */}

          <div>
            <h2 className="font-semibold text-xl mb-8">Specyfikacja</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carDetails.carDetails.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <IconField icon={item.icon} />
                    </span>

                    {item.label}

                    {item.required && <span className="text-red-500">*</span>}
                  </label>

                  <div
                    className={`
                      relative rounded-xl border bg-white
                      transition focus-within:ring-2 focus-within:ring-primary
                      ${
                        errors[item.name] ? "border-red-500" : "border-gray-200"
                      }
                    `}
                  >
                    {item.fieldType === "text" ||
                    item.fieldType === "number" ? (
                      <InputField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                      />
                    ) : item.fieldType === "dropdown" ? (
                      <DropdownField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                      />
                    ) : item.fieldType === "textarea" ? (
                      <TextAreaField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                      />
                    ) : item.fieldType === "city" ? (
                      <CitySelect
                        value={formData?.[item.name]}
                        onChange={(data) => {
                          handleInputChange(item.name, data.city);

                          handleInputChange("latitude", data.lat);

                          handleInputChange("longitude", data.lon);
                        }}
                      />
                    ) : null}
                  </div>

                  {errors[item.name] && (
                    <span className="text-xs text-red-500">
                      {errors[item.name]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ================= FEATURES ================= */}

          <Separator className="my-6" />

          <div>
            <h2 className="font-medium text-xl my-6">Cechy</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {featuresList.map((item) => (
                <div key={item.id} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.id, value)
                    }
                    checked={featuresData.includes(item.id)}
                  />

                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* ================= IMAGES ================= */}

          <Separator className="my-6" />

          <UploadImages
            triggleUploadImages={triggerUploadImages}
            carInfo={carInfo}
            mode={mode}
            setLoader={setLoader}
            onHasImagesChange={setHasImages}
            onUploadFinished={() => {
              toast.success("Ogłoszenie zostało dodane");

              navigate("/profile");
            }}
          />

          {/* ================= BUTTON ================= */}

          <div className="mt-10 flex justify-end">
            <Button
              type="button"
              disabled={loader}
              onClick={(e) => onSubmit(e)}
            >
              {!loader ? (
                mode === "edit" ? (
                  "Zapisz"
                ) : (
                  "Dodaj"
                )
              ) : (
                <BiLoaderAlt className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
