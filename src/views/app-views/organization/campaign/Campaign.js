import { React, useState, useEffect, createRef } from 'react'
import { Row, Col, Tag, message, Card, Empty } from 'antd';
import CampaignForm from './CampaignForm';
import CampaignRequested from './CampaignRequested';
import { useAuth } from "contexts/AuthContext";
import axios from 'axios'
import moment from 'moment'

const Campaign = ({ organizationId }) => {
  //for api
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const { generateToken } = useAuth();

  //useState
  const [campaigns, setCampaigns] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [pageSetup, setPageSetup] = useState({ page: 1, pageSize: 5, landingPage: "suggestion", })

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
        `/api/campaign/latest?page=${page}&pageSize=${pageSize}&landingPage=${landingPage}&orgId=${organizationId}`,
        generateToken()[1],
        { cancelToken })
        .then(
          (res) => {
            var data = res.data
            // data.map((data) => data.starting_date = moment(new Date(data.starting_date)))
            setCampaigns([...campaigns, ...data])
            console.log("data", data)
            if (data.length == 0) setHasMore(false)
          })
    } catch (error) {
      handleError(error)
    }

    setLoading(false)
  }

  const handleError = (error) => {
    message.error("There is a problem with uploading the data!!!")
    console.log("error", error)
  }

  return (
    <>
      <Row gutter={16} align="center">
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 20, order: 2 }}
          xl={{ span: 12, order: 1 }}
          xxl={{ span: 14, order: 1 }}
        >
          <CampaignRequested
            organizationId={organizationId}
            campaigns={campaigns}
            pageSetup={pageSetup}
            setPageSetup={setPageSetup}
            getLatestCampaign={getLatestCampaign}
            loading={loading}
            hasMore={hasMore}
          />
        </Col>

        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 24, order: 1 }}
          lg={{ span: 20, order: 1 }}
          xl={{ span: 12, order: 2 }}
          xxl={{ span: 10, order: 2 }}
        >
          <CampaignForm
            setCampaigns={setCampaigns}
            organizationId={organizationId}
            campaigns={campaigns}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  )
}

export default Campaign
