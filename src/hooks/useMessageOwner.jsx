import Service from "@/Shared/Service";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export function useMessageOwner(carDetail) {
  const { user } = useUser();
  const navigation = useNavigate();

  const isOwner =
    user?.primaryEmailAddress?.emailAddress === carDetail?.createdBy;

  const messageOwner = async () => {
    if (isOwner) return;

    const userId = user?.primaryEmailAddress?.emailAddress
      ?.split("@")[0]
      ?.replace(/[^a-zA-Z0-9]/g, "");

    const ownerUserId = carDetail?.createdBy
      ?.split("@")[0]
      ?.replace(/[^a-zA-Z0-9]/g, "");

    try {
      // USER
      try {
        await Service.CreateSendBirdUser(
          userId,
          user?.fullName,
          user?.imageUrl,
        );
      } catch (e) {
        if (
          !e?.response?.data?.message?.includes("violates unique constraint")
        ) {
          throw e;
        }
      }

      // OWNER
      try {
        await Service.CreateSendBirdUser(
          ownerUserId,
          carDetail?.userName,
          carDetail?.userImageUrl,
        );
      } catch (e) {
        if (
          !e?.response?.data?.message?.includes("violates unique constraint")
        ) {
          throw e;
        }
      }

      // CHANNEL
      const channel = await Service.CreateSendBirdChannel(
        [userId, ownerUserId],
        carDetail?.userName,
      );

      console.log("CHANNEL:", channel);

      // przejście do konkretnego chatu
      navigation("/profile", {
        state: {
          tab: "inbox",
          channelUrl: channel.channel_url,
        },
      });
    } catch (e) {
      console.error("Błąd:", e?.response?.data || e);
    }
  };

  return {
    messageOwner,
    isOwner,
  };
}
