import { React, useState, useEffect } from "react";
import {
  Typography,
  Col,
  Avatar,
  Card,
  Button,
  Space,
  Carousel,
  Image,
} from "antd";
import {
  HeartOutlined,
  MessageOutlined,
  EyeOutlined,
  HeartFilled,
  HeartTwoTone,
  TeamOutlined,
} from "@ant-design/icons";
import { BsPeopleFill, BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ShowMoreText from "react-show-more-text";
import CommentSection from "components/shared-components/CommentSection";
import CustomAvatar from "../CustomAvatar";
import moment from "moment";
import utils from "utils";
import CustomDropdown from "../CustomDropdown";
import Flex from "../Flex";

const { Text } = Typography;
const { Title } = Typography;

const CampaignCard = (props) => {
  const {
    title,
    category,
    orgName,
    orgProfile,
    startingDate,
    images,
    content,
    publisherName,
    suggestorName,
    campaignStatus,
    margin,
    isVisit,
    classData,
    enableVisit,
    enablePost,
    href,
    loading,
  } = props;

  const [visible, setVisible] = useState(false);
  const [campaignStatusState, setCampaignsStatusState] = useState(
    campaignStatus
  );

  useEffect(() => {
    console.log("campaignStatusState", campaignStatusState);
  }, [campaignStatusState]);

  const menuItems = [
    {
      text: "View all images",
      icon: <EyeOutlined />,
      onClick: () => setVisible(true),
    },
  ];

  const getColor = (category) => {
    switch (category) {
      case "Health":
        return "#E1F8DC";
      //light green
      case "Sport":
        return "#FEF8DD";
      //yellow
      case "Environment":
        return "#FFE7C7";
      //melon
      case "Technology":
        return "#B7E9F7";
      //blue
      case "Seminar":
        return "#ADF7B6";
      //green
      case "Event":
        return "#c6a7eb";
      case "Others":
        return "#f2aa8a";
      default:
      // code block
    }
  };

  const likeDecrement = () => {
    setCampaignsStatusState({
      ...campaignStatusState,
      isLike: false,
      likes: campaignStatusState.likes - 1,
    });
  };

  const likeIncrement = () => {
    setCampaignsStatusState({
      ...campaignStatusState,
      isLike: true,
      likes: campaignStatusState.likes + 1,
    });
  };

  const participantDecrement = () => {
    setCampaignsStatusState({
      ...campaignStatusState,
      isParticipant: false,
      participants: campaignStatusState.participants - 1,
    });
  };

  const participantIncrement = () => {
    setCampaignsStatusState({
      ...campaignStatusState,
      isParticipant: true,
      participants: campaignStatusState.participants + 1,
    });
  };

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
              <div className="mt-2 ml-2">
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
        <div
          className="custom-carousel-div"
          style={{ background: getColor(category), borderRadius: "1rem" }}
        >
          {images != null && (
            <>
              <Carousel adaptiveHeight autoplay draggable>
                {images.map((img, i) => {
                  return (
                    <img
                      key={i}
                      width="100%"
                      alt="picture"
                      src={img.data}
                      style={{ borderRadius: "1rem 1rem 0 0" }}
                    />
                  );
                })}
              </Carousel>

              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  {images.map((img, i) => {
                    return (
                      <Image
                        key={i}
                        width="100%"
                        alt="picture"
                        src={img.data}
                        style={{ borderRadius: "1rem 1rem 0 0" }}
                      />
                    );
                  })}
                </Image.PreviewGroup>
              </div>
            </>
          )}

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
            <h3 className="text-muted" style={{ fontWeight: "bolder" }}>
              {category}
            </h3>
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
                {campaignStatusState.isLike != true ? (
                  <>
                    <HeartOutlined
                      style={{
                        fontSize: "1.8rem",
                        color: "rgb(0, 49, 81)",
                        cursor: "pointer",
                      }}
                      onClick={() => likeIncrement()}
                    />
                    <p
                      className="ml-1"
                      style={{ color: "rgb(0, 49, 81)", marginTop: 10 }}
                    >
                      {campaignStatusState.likes}
                    </p>
                  </>
                ) : (
                  <>
                    <HeartFilled
                      style={{
                        fontSize: "1.8rem",
                        color: "rgb(252, 108, 133)",
                        cursor: "pointer",
                      }}
                      onClick={() => likeDecrement()}
                    />
                    <p
                      className="ml-1"
                      style={{ color: "rgb(252, 108, 133)", marginTop: 10 }}
                    >
                      {campaignStatusState.likes}
                    </p>
                  </>
                )}

                {campaignStatusState.isParticipant != true ? (
                  <>
                    <BsPeopleFill
                      style={{
                        fontSize: "2rem",
                        color: "rgb(0, 49, 81)",
                        marginLeft: 5,
                      }}
                    />

                    <p
                      className="ml-1"
                      style={{ color: "rgb(0, 49, 81)", marginTop: 10 }}
                    >
                      {campaignStatusState.participants}
                    </p>
                  </>
                ) : (
                  <>
                    <BsPeopleFill
                      style={{
                        fontSize: "2rem",
                        marginLeft: 5,
                        color: "	#0080FE",
                      }}
                    />

                    <p
                      className="ml-1"
                      style={{ color: "#0080FE", marginTop: 10 }}
                    >
                      {campaignStatusState.participants}
                    </p>
                  </>
                )}
              </div>
              <div className="d-flex align-items-center">
                {campaignStatusState.isParticipant != true ? (
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
                ) : (
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() => participantDecrement()}
                  >
                    Don't participate
                  </Button>
                )}

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
  loading: PropTypes.bool,
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
  campaignStatus: {
    likes: 420,
    isLike: false,
    participants: 69,
    isParticipant: false,
  },
  loading: false,
};
export default CampaignCard;
