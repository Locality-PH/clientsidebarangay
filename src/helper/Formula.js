import moment from "moment";

export const computeAge = (birthday) => {
  var today = moment(new Date());
  var ageDate = moment.duration(today.diff(birthday));
  var age = Math.trunc(ageDate.asYears());
  return age;
};

export const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};
export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
export const timeSince = (date) => {
  var time = new Date(date);
  var seconds = Math.floor((new Date() - time) / 1000);
  // seconds -= +28800;
  var interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export const deepCompare = (arg1, arg2) => {
  if (
    Object.prototype.toString.call(arg1) ===
    Object.prototype.toString.call(arg2)
  ) {
    if (
      Object.prototype.toString.call(arg1) === "[object Object]" ||
      Object.prototype.toString.call(arg1) === "[object Array]"
    ) {
      if (Object.keys(arg1).length !== Object.keys(arg2).length) {
        return false;
      }
      return Object.keys(arg1).every(function (key) {
        return deepCompare(arg1[key], arg2[key]);
      });
    }
    return arg1 === arg2;
  }
  return false;
};
export const ccFormat = (value) => {
  var v = value;
  var match = v;
  var parts = [];

  for (var i = 1, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

export const formatPhoneNumber = (value) => {
  try {
    let x = value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    return !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  } catch (error) {
    return;
  }
};
export const toCapitalized = (str) => {
  const arr = str.split(" ");

  //loop through each element of the array and capitalize the first letter.

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
};
export function isBase64Url(str) {
  // First, remove any data URI scheme prefix, if present
  if (str.indexOf("data:") === 0) {
    str = str.slice(str.indexOf(",") + 1);
  }
  // Then, remove any leading/trailing whitespace
  str = str.trim();
  // Check if the string matches the pattern of a base64-encoded URL
  return /^data:[^;]+;base64,/.test(str);
}
