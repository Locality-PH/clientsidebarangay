import { React, useState, useEffect } from "react";
import { Typography, Col, Avatar, Card, Button, Space, Carousel, Image } from "antd";
import { HeartOutlined, MessageOutlined, EyeOutlined, HeartFilled, HeartTwoTone, TeamOutlined } from "@ant-design/icons";
import { BsPeopleFill, BsPeople } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ShowMoreText from "react-show-more-text";
import CommentSection from "components/shared-components/CommentSection";
import CustomAvatar from "../CustomAvatar";
import { useAuth } from "contexts/AuthContext";
import moment from 'moment';
import axios from 'axios'
import utils from "utils";
import CustomDropdown from "../CustomDropdown";

const { Text } = Typography;
const { Title } = Typography;

const CampaignCard = (props) => {
  const {
    title,
    category,
    orgName,
    orgProfile,
    orgId,
    startingDate,
    images,
    content,
    publisherName,
    suggestorName,
    userId,
    campaignStatus,
    campaignId,
    margin,
    isVisit,
    classData,
    enableVisit,
    enablePost,
    href,
    loading
  } = props;

  //Initialize
  const history = useHistory();

  //for api
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const { generateToken, currentUser } = useAuth();

  //useState
  const [visible, setVisible] = useState(false);

  const [likeStatus, setLikeStatus] =
    useState({
      likeCounter: campaignStatus.likeCounter,
      isLike: campaignStatus.isLike,
      likes: campaignStatus.likes
    });

  const [participantStatus, setParticipantStatus] =
    useState({
      participantCounter: campaignStatus.participantCounter,
      isParticipant: campaignStatus.isParticipant,
      participants: campaignStatus.participants
    });

  //useEffect
  // useEffect(() => {
  //   // console.log("campaignStatusState", campaignStatusState)
  // }, [campaignStatusState])


  //axios
  const updateCampaignStatus = async (values, type, operation) => {

    if (type == "participant") {
      var newCampaignData = {
        participantCounter: values.participantCounter,
      }
    }

    if (type == "like") {
      var newCampaignData = {
        likeCounter: values.likeCounter,
      }
    }

    await axios.post(
      `/api/campaign/update-status`,
      { values: newCampaignData, operation, type, userId, campaignId },
      generateToken()[1],
      { cancelToken }
    ).catch((error) => {
      throw error
    })

  }

  const likeDecrement = async () => {
    var newStatus = { ...likeStatus, isLike: false, likeCounter: likeStatus.likeCounter - 1 }
    await updateCampaignStatus(newStatus, "like", "decrement")
    setLikeStatus(newStatus)
  }

  const likeIncrement = async () => {
    var newStatus = { ...likeStatus, isLike: true, likeCounter: likeStatus.likeCounter + 1 }
    await updateCampaignStatus(newStatus, "like", "increment")
    setLikeStatus(newStatus)
  }

  const participantDecrement = async () => {
    var newStatus = { ...participantStatus, isParticipant: false, participantStatus: participantStatus.participantCounter - 1 }
    await updateCampaignStatus(newStatus, "participant", "decrement")
    setParticipantStatus(newStatus)
  }

  const participantIncrement = async () => {
    var newStatus = { ...participantStatus, isParticipant: true, participantCounter: participantStatus.participantCounter + 1 }
    await updateCampaignStatus(newStatus, "participant", "increment")
    setParticipantStatus(newStatus)
  }

  const menuItems = [{
    text: "View all images",
    icon: <EyeOutlined />,
    onClick: () => setVisible(true)
  }]


  const getColor = (category) => {
    switch (category) {
      case "Health":
        return "#E1F8DC"
      //light green
      case "Sport":
        return "#FEF8DD"
      //yellow
      case "Environment":
        return "#FFE7C7"
      //melon
      case "Technology":
        return "#B7E9F7"
      //blue
      case "Seminar":
        return "#ADF7B6"
      //green
      case "Event":
        return "#c6a7eb"
      case "Others":
        return "#f2aa8a"
      default:
      // code block
    }
  }

  return (
    <>
      <Card
        loading={loading}
        style={{ margin: margin }}
        title={
          <div className="d-flex">
            <CustomAvatar
              icon={utils.getNameInitial(orgName)}
              image={orgProfile.fileUrl}
              color="#003151"
              size={60}
              style={{ fontSize: 20 }}
            />

            <div>
              <div className="ml-2 mt-2">
                <Text type="Primary">{orgName} </Text>
              </div>
              <div className="ml-1" type="Primary">
                <Text>
                  <div
                    style={{
                      color: "rgb(69, 85, 96) !important",
                      marginTop: -5,
                    }}
                  >
                    {moment(startingDate).format("LL")}
                  </div>
                </Text>
              </div>
            </div>
          </div>
        }
        extra={<CustomDropdown menuItems={menuItems} />}
        className={`${classData}`}
      >
        <div className="custom-carousel-div" style={{ background: getColor(category), borderRadius: "1rem" }}>
          {images != null &&
            <>
              <Carousel adaptiveHeight autoplay draggable
              >
                {images.map((img, i) => {
                  return <img
                    key={i}
                    width="100%"
                    alt="picture"
                    src={img.data}
                    style={{ borderRadius: "1rem 1rem 0 0" }}

                  />
                })}
              </Carousel>

              <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
                  {images.map((img, i) => {
                    return <Image
                      key={i}
                      width="100%"
                      alt="picture"
                      src={img.data}
                      style={{ borderRadius: "1rem 1rem 0 0" }}
                    />
                  })}
                </Image.PreviewGroup>
              </div>
            </>
          }

          <div style={{ padding: "1rem" }}>
            <h2 style={{ fontWeight: "bolder" }}>
              <ShowMoreText
                /* Default options */
                lines={1}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="my-anchor-css-className"
                expanded={false}
                truncatedEndingComponent={"... "}
              >
                {title}
              </ShowMoreText>
            </h2>
            <h3 className="text-muted" style={{ fontWeight: "bolder" }}>{category}</h3>
            <h4>
              <ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="my-anchor-css-className"
                expanded={false}
                truncatedEndingComponent={"... "}
              >
                {content}{" "}
              </ShowMoreText>
            </h4>
          </div>
        </div>{" "}
        {isVisit ? (
          <div className="mt-3">
            <div className="mb-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                {likeStatus.isLike != true ?
                  <>
                    <HeartOutlined
                      style={{
                        fontSize: "1.8rem",
                        color: "rgb(0, 49, 81)",
                        cursor: "pointer",
                      }}
                      onClick={() => likeIncrement()}
                    />
                    <p style={{ color: "rgb(0, 49, 81)", marginTop: 10, marginLeft: 3 }}>{likeStatus.likeCounter}</p>

                  </>
                  :
                  <>
                    <HeartFilled
                      style={{
                        fontSize: "1.8rem",
                        color: "rgb(252, 108, 133)",
                        cursor: "pointer",
                      }}
                      onClick={() => likeDecrement()}
                    />
                    <p style={{ color: "rgb(252, 108, 133)", marginTop: 10, marginLeft: 3 }}>{likeStatus.likeCounter}</p></>
                }

                {participantStatus.isParticipant != true ?
                  <>
                    <BsPeopleFill
                      style={{
                        fontSize: "2rem",
                        color: "rgb(0, 49, 81)",
                        marginLeft: 5
                      }} />

                    <p style={{ color: "rgb(0, 49, 81)", marginTop: 10 }}>{participantStatus.participantCounter}</p>
                  </>

                  :
                  <>
                    <BsPeopleFill
                      style={{
                        fontSize: "2rem",
                        marginLeft: 5,
                        color: "	#0080FE"
                      }} />

                    <p style={{ color: "#0080FE", marginTop: 10 }}>{participantStatus.participantCounter}</p>
                  </>
                }

              </div>
              <div className="d-flex align-items-center">
                {participantStatus.isParticipant != true ?
                  <Button
                    style={{
                      color: "rgb(0, 49, 81)",
                    }}
                    type="default"
                    shape="round"
                    onClick={() => participantIncrement()}
                  >
                    Participate
                  </Button>


                  :
                  <Button
                    type="primary" shape="round"
                    onClick={() => participantDecrement()}
                  >
                    Don't participate
                  </Button>
                }

                {enableVisit ? (
                  <Link to={href}>
                    <Button type="primary" shape="round">
                      Visit
                    </Button>
                  </Link>
                ) : null}

              </div>
              {/* <MessageOutlined
                    style={{
                      fontSize: "1.8rem",
                      color: "#3e79f7",
                      cursor: "pointer",
                    }}
                  />
                  <p style={{ color: "#3e79f7" }}>8</p> */}
            </div>
            {enablePost ? (
              <>
                <hr className="hr-style" />
                <CommentSection />
              </>
            ) : null}
          </div>
        ) : null}
      </Card>
    </>
  );
};
CampaignCard.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  images: PropTypes.array,
  content: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  classData: PropTypes.string,
  isVisit: PropTypes.bool,
  enableVisit: PropTypes.bool,
  enablePost: PropTypes.bool,
  href: PropTypes.string,
  orgName: PropTypes.string,
  publisherName: PropTypes.string,
  orgProfile: PropTypes.object,
  campaignStatus: PropTypes.object,
  likeStatus: PropTypes.object,
  participantStatus: PropTypes.object,
  loading: PropTypes.bool
};

CampaignCard.defaultProps = {
  padding: "5",
  title: "",
  category: "",
  images: [],
  content: "",
  margin: "5px 5px",
  isVisit: true,
  enableVisit: true,
  enablePost: false,
  orgName: "",
  classData: "",
  href: "",
  publisherName: "",
  suggestorName: "",
  orgProfile: {},
  participantStatus: { participantCounter: 69, isParticipant: false, participants: [] },
  likeStatus: { likeCounter: 420, isLike: false, participants: [], likes: [] },
  campaignStatus: { likeCounter: 420, isLike: false, participantCounter: 69, isParticipant: false, participants: [], likes: [] },
  loading: false
};
export default CampaignCard;
