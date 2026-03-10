import axios from "axios";
import features from "./../Shared/features.json";
const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

/* =====================================================
   FORMAT RESULT (🔥 KLUCZOWE DLA ZDJĘĆ GŁÓWNYCH)
===================================================== */

const FormatResult = (resp) => {
  const grouped = {};
  const finalResult = [];

  resp.forEach((row) => {
    const listing = row.carLisiting;
    const image = row.carImages;

    if (!listing) return;

    const listingId = listing.id;

    if (!grouped[listingId]) {
      grouped[listingId] = {
        car: listing,
        images: [],
      };
    }

    if (image) {
      grouped[listingId].images.push(image);
    }
  });

  Object.values(grouped).forEach((item) => {
    // 🔥 SORTOWANIE PO ORDER (MAIN PHOTO ZAWSZE PIERWSZE)
    const sortedImages = item.images.sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );

    finalResult.push({
      ...item.car,
      images: sortedImages,
    });
  });

  return finalResult;
};

/* =====================================================
   SENDBIRD
===================================================== */

const CreateSendBirdUser = (userId, nickName, profileUrl) => {
  return axios.post(
    `https://api-${SendBirdApplicationId}.sendbird.com/v3/users`,
    {
      user_id: userId,
      nickname: nickName,
      profile_url: profileUrl,
      issue_access_token: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
};

const CreateSendBirdChannel = (users, title) => {
  return axios.post(
    `https://api-${SendBirdApplicationId}.sendbird.com/v3/group_channels`,
    {
      user_ids: users,
      is_distinct: true,
      name: title,
      operator_ids: [users[0]],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
};

export const featureLabelMap = features.features.reduce((acc, item) => {
  acc[item.name] = item.label;
  return acc;
}, {});

/* =====================================================
   EXPORT
===================================================== */

export default {
  FormatResult,
  CreateSendBirdUser,
  CreateSendBirdChannel,
};
