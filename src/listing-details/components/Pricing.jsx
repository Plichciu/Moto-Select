import { Button } from "@/components/ui/button";
import { useMessageOwner } from "@/hooks/useMessageOwner";
import React from "react";

function Pricing({ carDetail }) {
  const { messageOwner, isOwner } = useMessageOwner(carDetail);

  return (
    <div className="p-10 rounded-xl border shadow-md">
      
      <p>Cena</p>
      <h2 className="font-bold text-4xl">{carDetail?.sellingPrice} zł</h2>

      <Button
        className="mt-5 w-full"
        onClick={messageOwner}
        disabled={isOwner}
        variant={isOwner ? "secondary" : "default"}
      >
        {isOwner ? "To Twoje ogłoszenie" : "Wyślij wiadomość"}
      </Button>
    </div>
  );
}

export default Pricing;
