import React, { useState } from "react";
import { Row, Col } from "antd";
import News from "views/app-views/home/announcement";
import { Link, useHistory, useParams } from "react-router-dom";

export const CommentPage = () => {
  console.log(useParams());

  const [newsReportData] = useState({
    img: "/img/avatars/thumb-9.jpg",
    href: `${window.location.hostname}:3000/home/feeds/100001/101111`,
    title: "Modified Enhanced Community Quaratine",
    type: "Global Nation",
    content:
      "The Department of Health (DOH) reported 12,159 new coronavirus cases on Sunday, October 10. This brings the total confirmed cases in the Philippines to 2,666,562. ",
  });

  return (
    <>
      <Row gutter={16} justify="center">
        <Col xs={24} sm={21} md={22} lg={12} xl={12} xxl={12}>
          <News
            margin={"5px 0px"}
            title={newsReportData.title}
            type={newsReportData.type}
            img={newsReportData.img}
            content={newsReportData.content}
            enableVisit={false}
            enablePost={true}
          />
        </Col>
      </Row>
    </>
  );
};

export default CommentPage;
