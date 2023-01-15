import axios from "axios";
import { SESSION_TOKEN } from "redux/constants/Auth";
import { message } from "antd";

export async function logOut(signOut, generateToken) {
  const data = {
    session_token: localStorage.getItem(SESSION_TOKEN),
  };
  const token = generateToken();
  await axios
    .post("/api/logout", data, token[1])
    .then((response) => {
      if (response.data.length > 0) {
        return signOut();
      }
    })
    .catch((error) => {
      console.log(error);
      return message.error(error.message);
    });
}
export async function logOutDeactivate(signOut, generateToken) {
  try {
    const data = {
      session_token: localStorage.getItem(SESSION_TOKEN),
    };
    const token = generateToken();
    await axios
      .post("/api/logout", data, token[1])
      .then(async (response) => {
        if (response.data.length > 0) {
          await axios.post("/api/deactivate", {}, token[1]).then(() => {
            message.success("Deactivation successful please wait.");
            return signOut();
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return message.error(error.message);
      });
  } catch (error) {
    message.error(error.message);
  }
}
