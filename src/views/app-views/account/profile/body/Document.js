import React, { useState, useEffect } from "react";
// Ant Design Component
import { Col, Row, Skeleton, Card, Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// Shared Component
import DocumentStatus from "components/shared-components/DocumentStatus";
import CommentSection from "components/shared-components/CommentSection";
import Spin from "components/shared-components/Loading";
// API Component

// Middleware
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import InfinitScroll from "react-infinite-scroll-component";
import moment from "moment";
const { Meta } = Card;
const Document = (props) => {
  const { active } = props;
  const [open, setOpen] = useState(false);

  const { generateToken } = useAuth();
  // Document State
  const [document, setDocument] = useState([]);
  // Page State
  const count = 6;
  const [start, setStart] = useState(7);

  //Loading State
  const [drawer, setDrawer] = useState(false);
  const [hasMore, setHasMore] = useState(false);
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
    console.log(data.length > 0);
    setHasMore(data.length > 0);
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

  const deleteDocumetRequest = async (
    certificate_requests_id,
    organization_id
  ) => {
    const newData = {
      certificate_requests_id: certificate_requests_id,
      organization_id: organization_id,
    };
    console.log(newData);

    try {
      await axios
        .post(
          `/api/cert-display/request/data/delete`,
          newData,
          generateToken()[1]
        )
        .then((res) => {
          console.log(res.data);
          const newDocument = document.filter(
            (document) =>
              document.certificate_requests_id !== certificate_requests_id
          );
          return setDocument(newDocument);
          // return getDocumentData(fetchCertifiateDataAll, generateToken()[1]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(document);
  useEffect(() => {
    if (active === "6") {
      setDocument([]);
      Promise.all([
        getDocumentData(fetchCertifiateDataAll, generateToken()[1]),
      ]);
    }
  }, [active]);
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
                      certificate_requests_id={item?.certificate_requests_id}
                      organization_id={item?.organization_id?._id}
                      img={item?.organization_id?.profile?.fileUrl}
                      profileColor={item?.user_id?.profileLogo}
                      title={item?.certificate_type}
                      type={item?.status}
                      orgName={item?.organization_id?.organization_name}
                      createdAt={new Date(moment(item?.createdAt).format("LL"))}
                      attachFile={item?.attach_file}
                      subTitle={item?.issuer}
                      content={item?.notes}
                      deleteDocumetRequest={deleteDocumetRequest}
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
