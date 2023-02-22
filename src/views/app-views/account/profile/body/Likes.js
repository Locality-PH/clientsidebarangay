import React, { useState, useEffect } from "react";
import { Row, Col, Card, message, Divider, Skeleton, Button } from "antd";
import { useAuth } from "contexts/AuthContext";
import axios from 'axios'
import moment from 'moment'
import SearchCampaign from "components/shared-components/SearchCampaign";

const Likes = () => {
  //for api
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const { generateToken } = useAuth();

  //useState
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [campaignList, setCampaignList] = useState([]);
  const [pageSetup, setPageSetup] = useState({ page: 1, pageSize: 4, landingPage: "likes", })

    //useEffect
    useEffect(() => {
      getLatestCampaign()
    }, [])
  
    useEffect(() => {
      getLatestCampaign()
    }, [pageSetup])
  
    //axios
    const getLatestCampaign = async () => {
      const { page, pageSize, landingPage } = pageSetup
  
      setLoading(true)
  
      try {
        await axios.get(
          `/api/campaign/latest?page=${page}&pageSize=${pageSize}&landingPage=${landingPage}`,
          generateToken()[1],
          { cancelToken })
          .then(
            (res) => {
              var data = res.data
              console.log("data", data)
              setCampaignList([...campaignList, ...data])
              if (data.length == 0) setHasMore(false)
            })
      } catch (error) {
        handleError(error)
      }
  
      setLoading(false)
    }

  return (
    <Card title={"Liked Events"}>
      {campaignList.map((item, i) => {
        return (
          <div key={i}>
            <Divider
              className="divider-margin"
              style={{ margin: "0px !important" }}
            />
            <Col sm={24} md={24}>
              <SearchCampaign
                startDate={
                  new Date(item?.starting_date)
                }
                profile={
                  item && item.images && item.images[0]
                    ? item.images[0].data
                    : undefined
                }
                title={item?.title}
                address={item?.organization?.address}
                name={item?.organization?.organization_name}
                id={item?.organization?.organization_id}
                campaign_id={item?._id}
                link={`/home/posts/63f5a0ea53dca62f010488e6/${item?._id}/single/data`}
              />
            </Col>
          </div>
        );
      })}
      {loading && (
        <>
          <Col sm={24} md={24}>
            <Card>
              <Skeleton loading={loading} avatar active></Skeleton>
            </Card>
          </Col>
          <Col sm={24} md={24}>
            <Card>
              <Skeleton loading={loading} avatar active></Skeleton>
            </Card>
          </Col>
          <Col sm={24} md={24}>
            <Card>
              <Skeleton loading={loading} avatar active></Skeleton>
            </Card>
          </Col>
        </>
      )}
      <Col justify="center" className="text-center" sm={24} md={24}>
        {!loading && hasMore && (
          <Button
            onClick={() => setPageSetup({ ...pageSetup, page: pageSetup.page + 1 })}
          >
            Load More
          </Button>
        )}
      </Col>
    </Card>
  );
};

export default Likes;
