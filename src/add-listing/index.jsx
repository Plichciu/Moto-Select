import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import carDetails from "./../Shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import features from "./../Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
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
  const [formData, setFormData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [carInfo, setCarInfo] = useState();
  const naviagte = useNavigate();
  const { user } = useUser();
  const [hasImages, setHasImages] = useState(false);
  const [errors, setErrors] = useState({});
  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if (mode == "edit") {
      GetListingDetail();
    }
  }, []);

  /**
   * Used to get Car Listing Details from ID
   */
  const GetListingDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, recordId));
    console.log(result.map((r) => r.carImages.id));
    const resp = Service.FormatResult(result);

    setCarInfo(resp[0]);
    setFormData(resp[0]);
    setFeaturesData(resp[0].features);
    console.log(featuresData);
  };

  /**
   * Use to capture user input from form
   * @param {*} name
   * @param {*} value
   */
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData);
  };

  /**
   * Used to save selected Feature List
   * @param {*} name
   * @param {*} value
   */
  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    for (const item of carDetails.carDetails) {
      if (!item.required) continue;

      const value = formData?.[item.name];

      if (value === undefined || value === null || value === "") {
        newErrors[item.name] = `${item.label} jest wymagane`;
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

    if (mode == "edit") {
      const result = await db
        .update(CarListing)
        .set({
          ...formData,
          features: featuresData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          userImageUrl: user?.imageUrl,
          postedOn: moment().format("DD/MM/yyyy"),
        })
        .where(eq(CarListing.id, recordId))
        .returning({ id: CarListing.id });
      toast.success("Ogłoszenie zaktualizowane");
      console.log(result);
      naviagte("/profile");
      setLoader(false);
    } else {
      try {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: CarListing.id });
        if (result) {
          console.log("Data Saved");
          setTriggerUploadImages(result[0]?.id);
          setLoader(false);
        }
      } catch (e) {
        setLoader(false);
        toast("Please fill all required fields");
        console.log("Error", e);
      }
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
            Wysokiej jakości zdjęcia zwiększają szanse na sprzedaż
          </p>
        </div>
        <form className="p-10 border rounded-xl mt-10">
          {/* Car Details  */}
          <div>
            <h2 className="font-semibold text-xl mb-8">Specyfikacja</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carDetails.carDetails.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  {/* LABEL */}
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <IconField icon={item.icon} />
                    </span>
                    {item.label}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>

                  {/* INPUT WRAPPER */}
                  <div
                    className={`
            relative rounded-xl border bg-white
            transition focus-within:ring-2 focus-within:ring-primary
            ${errors[item.name] ? "border-red-500" : "border-gray-200"}
          `}
                  >
                    {/* INPUT */}
                    {item.fieldType === "text" ||
                    item.fieldType === "number" ? (
                      <InputField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                        className="w-full bg-transparent px-4 py-3 outline-none"
                      />
                    ) : item.fieldType === "dropdown" ? (
                      <DropdownField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                        className="w-full bg-transparent px-4 py-3 outline-none"
                      />
                    ) : item.fieldType === "textarea" ? (
                      <TextAreaField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                        className="w-full bg-transparent px-4 py-3 outline-none resize-none"
                      />
                    ) : item.fieldType === "city" ? (
                      <CitySelect
                        value={formData?.[item.name]}
                        onChange={(data) => {
                          handleInputChange(item.name, data.city);
                          handleInputChange("latitude", data.lat);
                          handleInputChange("longitude", data.lon);
                        }}
                        className="w-full px-4 py-3"
                      />
                    ) : null}
                  </div>

                  {/* ERROR */}
                  {errors[item.name] && (
                    <span className="text-xs text-red-500">
                      {errors[item.name]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />
          {/* features List  */}
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                    checked={featuresData?.[item.name]}
                  />{" "}
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* Car Images  */}
          <Separator className="my-6" />
          <UploadImages
            triggleUploadImages={triggerUploadImages}
            carInfo={carInfo}
            mode={mode}
            setLoader={setLoader}
            onHasImagesChange={setHasImages}
            onUploadFinished={() => {
              toast.success("Ogłoszenie zostało dodane");
              naviagte("/profile");
            }}
          />
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
