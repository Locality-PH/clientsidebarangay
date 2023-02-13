import React, { useState, useEffect } from "react";
// Ant Design Component
import { Col, Row, Skeleton, Card } from "antd";
// Shared Component
import DocumentStatus from "components/shared-components/DocumentStatus";
import Spin from "components/shared-components/Loading";
// API Component

// Middleware
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import InfinitScroll from "react-infinite-scroll-component";
import moment from "moment";
import QueueAnim from "rc-queue-anim";
const { Meta } = Card;
const Document = () => {
  const { generateToken } = useAuth();
  // Document State
  const [document, setDocument] = useState([]);
  // Page State
  const count = 6;
  const [start, setStart] = useState(7);

  //Loading State
  const [drawer, setDrawer] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [landingLoading, setlandingLoading] = useState(true);

  //   GET http://localhost:5000/api/cert-display/request/data/user?result=6&start=0

  // CallBack Fetch CertificateAll
  const fetchCertifiateDataAll = (res) => {
    setDocument(res);
    setlandingLoading(!landingLoading);
  };

  // CallBack handleCertificateNext
  const handleCertificateNext = (data) => {
    setDocument((oldArray) => [...oldArray, ...data]);
    if (data.length === 0) setHasMore(false);
  };

  const getDocumentData = async (callback, token) => {
    await axios
      .get(
        `/api/cert-display/request/data/user?result=${count}&start=${0}`,
        token
      )
      .then((res) => {
        return callback(res.data);
      });
  };

  const getDocumentDataNext = async (callback, token, count, start) => {
    await axios
      .get(
        `/api/cert-display/request/data/user?result=${count}&start=${start}`,
        token
      )
      .then((res) => {
        return callback(res.data);
      });
  };
  console.log(document);
  useEffect(() => {
    Promise.all([getDocumentData(fetchCertifiateDataAll, generateToken()[1])]);
  }, []);
  return (
    <div>
      <InfinitScroll
        dataLength={document.length}
        hasMore={hasMore}
        loader={
          <>
            <Row>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card loading={true}>
                  <Meta />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card loading={true}>
                  <Meta />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <Card loading={true}>
                  <Meta />
                </Card>
              </Col>
            </Row>
          </>
        }
        next={() => {
          setStart(count + start);
          getDocumentDataNext(
            handleCertificateNext,
            generateToken()[1],
            count,
            start
          );
        }}
        style={{ overflow: "hidden" }}
      >
        <Row>
          {document ? (
            <>
              {document.map((item, i) => {
                return (
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8} key={i}>
                    <DocumentStatus
                      img={item?.user_id?.profileUrl?.data}
                      profileColor={item?.user_id?.profileLogo}
                      title={item?.certificate_type}
                      type={item?.status}
                      orgName={item?.organization_id?.organization_name}
                      createdAt={new Date(moment(item?.createdAt).format("LL"))}
                      attachFile={item?.attach_file}
                      subTitle={item?.issuer}
                      content={item?.notes}
                    />
                  </Col>
                );
              })}
            </>
          ) : null}
        </Row>
      </InfinitScroll>
    </div>
  );
};

export default Document;
