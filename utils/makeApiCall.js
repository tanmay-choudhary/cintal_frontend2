import { API_URL } from "@/constant";
import axios from "axios";
const apiUrl = API_URL;

const makeApiCall = (method, url, payload = null, headers = {}) => {
  const obj = {
    method,
    url: `${apiUrl}${url}`,
    data: payload,
    headers,
  };
  console.log(obj);
  return new Promise((resolve, reject) => {
    axios(obj)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log("Error making API call:", error);
        reject(error);
      });
  });
};

export default makeApiCall;
