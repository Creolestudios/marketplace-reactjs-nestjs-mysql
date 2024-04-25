// SECTION - Utility Functions

import { Map } from "immutable";
import axios from "axios";
import moment from "moment";
import { message } from "antd";

export function clearToken() {
  localStorage.removeItem("remember_me");
  localStorage.removeItem("id_token");
  sessionStorage.removeItem("id_token");
  sessionStorage.removeItem("refresh_token");
  sessionStorage.removeItem("activeApp");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("activeApp");
}

export function getToken() {
  try {
    const idToken =
      localStorage.getItem("id_token") || sessionStorage.getItem("id_token");
    return new Map({ idToken });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function getActiveApp() {
  try {
    const activeApp =
      localStorage.getItem("activeApp") || sessionStorage.getItem("activeApp");
    return new Map({ activeApp });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function arrayEqual(array1, array2) {
  return array1.sort().toString() == array2.sort().toString();
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = (number) => {
    return number > 1 ? "s" : "";
  };
  const number = (num) => (num > 9 ? "" + num : "0" + num);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + " day" + numberEnding(days);
      } else {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return "a few seconds ago";
  };
  return getTime();
}

export function stringToInt(value, defValue = 0) {
  if (!value) {
    return 0;
  } else if (!isNaN(value)) {
    return parseInt(value, 10);
  }
  return defValue;
}

export function stringToPosetiveInt(value, defValue = 0) {
  const val = stringToInt(value, defValue);
  return val > -1 ? val : defValue;
}

export function typeofStringCheck(value) {
  return typeof value === "string";
}

export const downloadBlobFile = (urls, doc) => {
  axios({
    url: urls,
    method: "GET",
    responseType: "blob", // important
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", doc);
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      message.error(error.response.statusText);
      console.log(error);
    });
};

export const removeUTC = (date) => {
  return moment.utc(date);
};
