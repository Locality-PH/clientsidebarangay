import React from "react";
import {
  Typography,
  Col,
  Card,
  Avatar,
  Button,
  Menu,
  Dropdown,
  Row,
  Carousel,
} from "antd";
import {
  EllipsisOutlined,
  FormOutlined,
  FileOutlined,
  SendOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ShowMoreText from "react-show-more-text";
import CommentSection from "components/shared-components/CommentSection";
import moment from "moment";
import PDFTemplate from "components/shared-components/Documents";
import Rejected from "assets/file/rejected.pdf";
import Pending from "assets/file/pending.pdf";
import draftToHtmlPuri from "draftjs-to-html";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";

const { Text } = Typography;
const { Title } = Typography;

const News = (props) => {
  const {
    title,
    type,
    img,
    content,
    margin,
    isVisit,
    classData,
    enableVisit,
    enablePost,
    href,
    createdAt,
    orgName,
    attachFile,
    profileColor,
    subTitle,
  } = props;
  console.log(content);

  const contentData = {
    entityMap: {},
    blocks: content != null ? content.blocks : [],
  };
  console.log(contentData);

  const contentState = convertFromRaw(contentData);
  const editorState = EditorState.createWithContent(contentState);
  console.log(editorState.getCurrentContent());
  const htmlPuri = draftToHtmlPuri(
    convertToRaw(editorState.getCurrentContent())
  );
  console.log(htmlPuri);
  const color = ["#E1F8DC", "#FEF8DD", "#FFE7C7", "#B7E9F7", "#ADF7B6"];
  const randomColor = Math.floor(Math.random() * color.length);
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`#`}>
          <FormOutlined /> <span className="ml-2">Campaign</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`#`}>
          <FileOutlined /> <span className="ml-2">Certificate</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`#`}>
          <SendOutlined /> <span className="ml-2">Report Incident</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={`#`}>
          <InfoCircleOutlined /> <span className="ml-2">About</span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu}>
      <Button
        style={{
          border: "none",
          padding: 0,
        }}
      >
        <EllipsisOutlined
          style={{
            fontSize: 20,
            verticalAlign: "top",
          }}
        />
      </Button>
    </Dropdown>
  );
  return (
    <>
      <Card
        style={{ margin: margin }}
        title={
          <>
            <div className="d-flex">
              <Avatar
                style={{ backgroundColor: profileColor }}
                size={50}
                src={img}
                shape="circle"
              ></Avatar>

              <div>
                <div className="ml-1">
                  {/* <Text type="Primary">{moment(createdAt).format("LL")} </Text> */}
                  <Text type="Primary">{orgName} </Text>
                </div>
                <div className="ml-1" type="Primary">
                  <Title level={5}>
                    <div
                      style={{
                        color: "rgb(69, 85, 96) !important",
                        marginTop: -5,
                      }}
                    >
                      {moment(createdAt).format("LL")}
                    </div>
                  </Title>
                </div>
              </div>
            </div>
          </>
        }
        className={`${classData}`}
        extra={<DropdownMenu />}
      >
        <div style={{ background: color[randomColor], borderRadius: "1rem" }}>
          {type === "pending" ? (
            <>
              <Row>
                <Col>
                  <Carousel className="content-border-card">
                    <PDFTemplate
                      data={0}
                      certType="cert"
                      templateType="simple"
                      min={4}
                      max={9}
                      pdf={Pending}
                      type={"create"}
                    />
                  </Carousel>
                </Col>
              </Row>
            </>
          ) : type === "rejected" ? (
            <>
              <Row>
                <Col>
                  <Carousel className="content-border-card">
                    <PDFTemplate
                      data={0}
                      certType="cert"
                      templateType="simple"
                      min={4}
                      max={9}
                      pdf={Rejected}
                      type={"create"}
                    />
                  </Carousel>
                </Col>
              </Row>
            </>
          ) : (
            <>
              {attachFile.length > 0 ? (
                <>
                  <Row>
                    <Col>
                      <Carousel autoplay className="content-border-card">
                        {attachFile.map((item, i) => {
                          return (
                            <div key={i}>
                              <PDFTemplate
                                data={0}
                                certType="cert"
                                templateType="simple"
                                min={4}
                                max={9}
                                pdf={item?.url}
                                type={"create"}
                              />
                            </div>
                          );
                        })}
                      </Carousel>
                    </Col>
                  </Row>
                </>
              ) : null}
            </>
          )}

          {/* <img
            width="100%"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            style={{ borderRadius: "1rem 1rem 0 0" }}
          /> */}
          <div className="content-body-card ">
            <h2>
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
                <strong>{title}</strong>
              </ShowMoreText>
            </h2>
            <h4 className="text-muted">{subTitle}</h4>
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
                {/* {content} */}{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: htmlPuri,
                  }}
                />
              </ShowMoreText>
            </h4>
          </div>
        </div>
      </Card>
    </>
  );
};
News.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  img: PropTypes.string,
  content: PropTypes.object,
  padding: PropTypes.string,
  margin: PropTypes.string,
  classData: PropTypes.string,
  isVisit: PropTypes.bool,
  enableVisit: PropTypes.bool,
  enablePost: PropTypes.bool,
  href: PropTypes.string,
  attachFile: PropTypes.array,

  createdAt: PropTypes.instanceOf(Date),
};

News.defaultProps = {
  padding: "5",
  title: "",
  type: "",
  img: "",
  content: { blocks: [] },
  margin: "5px 5px",
  isVisit: true,
  enableVisit: true,
  enablePost: false,
  classData: "",
  href: "",
  attachFile: [],
  createdAt: moment().format(`LL`),
};
export default News;
