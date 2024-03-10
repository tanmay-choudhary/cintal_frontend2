// auth.js
import { API_URL } from "@/constant";
export const isLoggedIn = async (refreshToken) => {
  let validity = false;

  try {
    if (!refreshToken || refreshToken.length === 0) {
      validity = false;
    } else {
      const response = await (
        await fetch(API_URL + "/auth/token", {
          method: "POST",
          body: JSON.stringify({
            refresh_token: refreshToken,
            grant_type: "token_validity",
          }),
          headers: { "Content-Type": "application/json" },
        })
      ).json();
      console.log(response);
      if (response?.validity) {
        validity = true;
      }
    }
  } catch (error) {
    validity = false;
  }

  return validity;
};
