const axios = require("axios");

const sendSMS = async (phone, message) => {
  try {
    const baseURL = "https://api.afromessage.com/api/send";
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoibGE5OWszM1czcTQ2R0pyWmM1Vk9WRlZxcXhhdVJCVlEiLCJleHAiOjE4MzE4ODk2MDYsImlhdCI6MTY3NDEyMzIwNiwianRpIjoiYmZiODlhZDQtMzhlYS00OTU1LWI0OGQtNmZhMWRkNmRkYTY1In0.DISJFRqh1h_5yAoipp2W1rl7dI8nV2w3Qq9679DLS2Q";

    const url = new URL(baseURL);
    const params = {
      to: `${phone}`,
      message: `${message}`,
      callback: "",
      from: "e80ad9d8-adf3-463f-80f4-7c4b39f7f164",
      sender: "",
    };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await axios.request({
      method: "GET",
      url: url.toString(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return new Error("SMS notification failed");
  }
};
module.exports = sendSMS;
