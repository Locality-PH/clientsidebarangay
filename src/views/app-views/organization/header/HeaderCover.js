import React from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";

const HeaderCover = ({ img }) => {
  return (
    <>
      <PageHeaderAlt
        style={{ marginLeft: "-22px", marginRight: "-22px" }}
        background={img}
        cssClass="bg-primary borderless"
        overlap
      >
        <div className="container text-center">
          <div className="py-5 my-md-5"></div>
        </div>
      </PageHeaderAlt>
    </>
  );
};

export default HeaderCover;
