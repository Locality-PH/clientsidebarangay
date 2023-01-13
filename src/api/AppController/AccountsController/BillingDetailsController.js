import axios from "axios";
import { message } from "antd";

export const getPaymethod = async (generateToken) => {
  try {
    const response = await axios.get(
      "/api/app/user/billing/data",
      generateToken()[1]
    );

    return response.data;
  } catch (error) {
    console.log(error);
    message.error("Could not fetch the data in the server!");
    return;
  }
};

export const createPaymethod = async (data, generateToken) => {
  try {
    const response = await axios.post(
      "/api/app/user/billing/create",
      {},
      generateToken()[1]
    );
    return response.data;
  } catch (error) {
    console.log(error);
    message.error("The action can't be completed, please try again.");
    return;
  }
};

export const deletePaymethod = async (idDelete, idSet, generateToken) => {
  try {
    const data = { card_id: idDelete, card_id_new: idSet };
    const response = await axios.post(
      "/api/app/user/billing/delete",
      data,
      generateToken()[1]
    );
    message.success(response.data);
  } catch (error) {
    console.log(error);
    message.error("The action can't be completed, please try again.");
    return;
  }
};
export const updatePaymethod = async (
  card_id_prev,
  card_id_new,
  generateToken
) => {
  try {
    const data = { card_id_prev: card_id_prev, card_id_new: card_id_new };
    const response = await axios.post(
      "/api/app/user/billing/updateCard",
      data,
      generateToken()[1]
    );
    message.success(response.data);
  } catch (error) {
    console.log(error);
    message.error("The action can't be completed, please try again.");
    return;
  }
};
