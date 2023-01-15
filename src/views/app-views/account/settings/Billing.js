import React, { useState } from "react";
import { AUTH_TOKEN } from "redux/constants/Auth";
import BillingTable from "./Profile/billing/BillingTable";
import FormBillingInfo from "./Profile/billing/FormBillingInfo";

const Billing = () => {
  // Constant State
  const data = { auth_id: localStorage.getItem(AUTH_TOKEN) };
  const [parentData, setParentData] = useState({});

  return (
    <>
      <BillingTable
        type={"save"}
        parentData={parentData}
        setParentData={setParentData}
      />
      <FormBillingInfo
        {...data}
        type={"save"}
        parentData={parentData}
        setParentData={setParentData}
      />
    </>
  );
};

export default Billing;
