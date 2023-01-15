import React, { useState, useEffect } from "react";
import HeaderCover from "./header/HeaderCover";
import Header from "./header/Header";

import ContentBody from "./body";

const AccountProfile = () => {
  return (
    <div>
      <>
        <HeaderCover img="/img/others/img-12.jpg" />
        <div className="container my-4">
          <Header />
          <div>
            <ContentBody />
          </div>
        </div>
      </>
    </div>
  );
};

export default AccountProfile;
