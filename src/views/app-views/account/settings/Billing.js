import React from "react";
import { AUTH_TOKEN } from "redux/constants/Auth";
import BillingTable from "./Profile/BillingTable";
import FormBillingInfo from "./Profile/FormBillingInfo";

const Billing = () => {
  // Constant State
  const data = { auth_id: localStorage.getItem(AUTH_TOKEN) };

  return (
    <>
      <BillingTable />
      <FormBillingInfo {...data} />
    </>
  );
};

export default Billing;
