import axios from "axios";
import AES from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";
import { bearer, dispatchesUrl } from "../../config";

const requestHeader = (key) => {
  const bearerBytes = AES.decrypt(bearer, key);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerBytes.toString(encUtf8)}`,
  };

  return headers;
};

export const postQuestionnairesData = async (postData, options) => {
  await axios.post(
    dispatchesUrl,
    {
      event_type: "submit-request",
      client_payload: {
        questionnaires: JSON.stringify(postData),
      },
    },
    {
      headers: requestHeader(options.key),
    }
  );
};

export const postUsersData = async (postData, options) => {
  await axios.post(
    dispatchesUrl,
    {
      event_type: "submit-request",
      client_payload: {
        users: JSON.stringify(postData),
      },
    },
    {
      headers: requestHeader(options.key),
    }
  );
};
