import React from "react";
import { Button } from "@/components/ui/button";
import { useMessageOwner } from "@/hooks/useMessageOwner";

function OwnersDetail({ carDetail }) {
  const { messageOwner, isOwner } = useMessageOwner(carDetail);

  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl mb-3">Właściciel</h2>

      <img
        src={carDetail?.userImageUrl}
        className="w-[70px] h-[70px] rounded-full"
        alt="Owner"
      />

      <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>

      <h2 className="mt-2 text-gray-500">{carDetail?.createdBy}</h2>

      <Button
        className="w-full mt-6"
        onClick={messageOwner}
        disabled={isOwner}
        variant={isOwner ? "secondary" : "default"}
      >
        Wyślij Wiadomość
      </Button>
    </div>
  );
}

export default OwnersDetail;
