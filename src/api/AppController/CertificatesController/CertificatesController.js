import axios from "axios";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";
import { message } from "antd";
export const sendDocument = async (callback, data, generateToken) => {
  try {
    await axios
      .post(`/api/cert-display/request/data`, data, generateToken)
      .then((res) => {
        return callback(res.data);
      });
  } catch (error) {
    message.error(error.message);
    return callback(error.message);
  }
};
