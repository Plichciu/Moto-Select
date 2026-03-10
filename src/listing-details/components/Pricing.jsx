import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
function Pricing({ carDetail }) {
  return (
    <div className="p-10 rounded-xl border shadow-md">
      <p>Cena</p>
      <h2 className="font-bold text-4xl">{carDetail?.sellingPrice} zł</h2>

      <Button className="w-full mt-7" size="lg">
        <MdOutlineLocalOffer className="text-lg mr-2" /> Wyślij wiadomość
      </Button>
    </div>
  );
}

export default Pricing;
