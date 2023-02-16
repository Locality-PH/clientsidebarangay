import React, { useState, useEffect } from "react";
import { Card, Row, Col, Skeleton, Divider, Button, message } from "antd";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import SearchAvatar from "components/shared-components/SearchAvatar";
import { useParams } from "react-router-dom";

const Organizations = () => {
  const { currentOrganization, generateToken } = useAuth();
  let { id } = useParams();
  const [searchItem, setSearchItem] = useState(id || "");
  const [barangayList, setBarangayList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  // Page State
  const count = 6;
  const [start, setStart] = useState(7);

  const handleGetAll = (data) => {
    setBarangayList(data);
    setIsLoading(false);
  };
  const handleNextGetAll = (data) => {
    setBarangayList((oldArray) => [...oldArray, ...data]);
    if (data.length === 0) setHasMore(false);
    setIsLoading(false);
  };
  const getAllOrganizations = async (callback, token, data) => {
    await axios
      .get(
        `/api/organization/get-all-organizations?q=${data.trim()}&result=${count}&start=${0}`,
        token
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  const getDocumentDataNext = async (callback, token, count, start, data) => {
    await axios
      .get(
        `/api/organization/get-all-organizations?q=${data.trim()}&result=${count}&start=${start}`,
        token
      )
      .then((res) => {
        return callback(res.data);
      });
  };
  console.log(isLoading, hasMore);
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getAllOrganizations(handleGetAll, generateToken()[1], searchItem),
    ]);
  }, []);
  return (
    <>
      <Row justify="center">
        <Col xs={24} sm={24} md={15} lg={15}>
          <Card title={"Pages"}>
            {barangayList.map((item, i) => {
              return (
                <div key={i}>
                  <Divider
                    className="divider-margin"
                    style={{ margin: "0px !important" }}
                  />
                  <Col sm={24} md={24}>
                    <SearchAvatar
                      id={item?.organization_id}
                      profile={item?.profile?.fileUrl}
                      name={item?.organization_name}
                      address={item?.address}
                    />
                  </Col>
                </div>
              );
            })}
            {isLoading && (
              <>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={isLoading} avatar active></Skeleton>
                  </Card>
                </Col>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={isLoading} avatar active></Skeleton>
                  </Card>
                </Col>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={isLoading} avatar active></Skeleton>
                  </Card>
                </Col>
              </>
            )}
            <Col justify="center" className="text-center" sm={24} md={24}>
              {!isLoading && hasMore && (
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    setStart(count + start);
                    getDocumentDataNext(
                      handleNextGetAll,
                      generateToken()[1],
                      count,
                      start,
                      searchItem
                    );
                  }}
                >
                  Load More
                </Button>
              )}
            </Col>
          </Card>
        </Col>
      </Row>
      {isLoading && (
        <Card>
          <Skeleton loading={isLoading} avatar active></Skeleton>
          <Skeleton loading={isLoading} avatar active></Skeleton>
          <Skeleton loading={isLoading} avatar active></Skeleton>
        </Card>
      )}
    </>
  );
};

export default Organizations;
