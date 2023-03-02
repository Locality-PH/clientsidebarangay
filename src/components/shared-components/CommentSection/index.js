import React, { useState, useEffect } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { Col, Row, Skeleton, Card, Popconfirm, Button } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { CommentData } from "./commentData";
import { useAuth } from "contexts/AuthContext";
const CommentComponent = (props) => {
  const { generateToken, currentUser } = useAuth();
  const { orgId, campaignId } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // Page State
  const count = 5;
  const [start, setStart] = useState(6);

  const handleNextComment = (response) => {
    try {
      let resData = response.data;
      console.log(response.data);
      const modifiedArray = resData.map((obj) => {
        return {
          fullName: obj?.account?.full_name,
          userId: obj?.account?.uuid,
          avatarUrl: obj?.account?.profileUrl?.data,
          text: obj?.text,
          userProfile: "#",
          comId: obj?.comId,
          replies: obj?.replies,
        };
      });
      console.log(modifiedArray);
      setData((oldArray) => [...oldArray, ...modifiedArray]);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmitCallback = (response) => {
    console.log(response.data);
  };
  const handleDeleteCallback = (response) => {
    const newData = data.filter((data) => data.comId !== response.data.comId);
    setData(newData);
  };
  const handleDataCallback = (response) => {
    try {
      let resData = response.data;
      const modifiedArray = resData.map((obj) => {
        return {
          fullName: obj?.account?.full_name,
          userId: obj?.account?.uuid,
          avatarUrl: obj?.account?.profileUrl?.data,
          text: obj?.text,
          userProfile: "#",
          comId: obj?.comId,
          replies: obj?.replies,
        };
      });
      console.log(modifiedArray);
      setData(modifiedArray);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCommentData = async (callback, token, count) => {
    try {
      await axios
        .get(
          `/api/comment/${campaignId}/${orgId}?start=${0}&result=${count}`,

          token
        )
        .then((response) => {
          return callback(response);
        });
    } catch (error) {
      return console.log(error.message);
    }
  };
  const handleNextCommentData = async (callback, token, count, start) => {
    try {
      await axios
        .get(
          `/api/comment/${campaignId}/${orgId}?start=${start}&result=${count}`,

          token
        )
        .then((response) => {
          return callback(response);
        });
    } catch (error) {
      return console.log(error.message);
    }
  };

  const onSubmit = async (callback, token, data) => {
    try {
      await axios.post("/api/comment/create", data, token).then((response) => {
        return callback(response);
      });
    } catch (error) {
      return console.log(error.message);
    }
  };
  const onDeleteData = async (callback, token, data) => {
    try {
      await axios.post("/api/comment/delete", data, token).then((response) => {
        return callback(response);
      });
    } catch (error) {
      return console.log(error.message);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      handleCommentData(handleDataCallback, generateToken()[1], count),
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <CommentSection
        currentUser={{
          currentUserId: currentUser.uid,
          currentUserImg: currentUser.photoURL,
          currentUserProfile: "#",
          currentUserFullName: currentUser.displayName,
        }}
        logIn={{
          loginLink: "#",
          signupLink: "#",
        }}
        commentData={data}
        onSubmitAction={(data) => {
          console.log("check submit, ", data);
          const finalData = {
            text: data.text,
            comId: data.comId,
            replies: data.replies,
            campaignId: campaignId,
            organizationId: orgId,
          };
          onSubmit(handleSubmitCallback, generateToken()[1], finalData);
          setData((oldArray) => [...oldArray, data]);
        }}
        onDeleteAction={(data) => {
          console.log("delete", data);
          onDeleteData(handleDeleteCallback, generateToken()[1], data);
        }}
        onReplyAction={(data) => console.log("reply submit, ", data)}
        onEditAction={() => alert("Reply was edited!")}
      />
      <div className="text-center">
        <Row justify="center">
          <Col>
            {console.log(data.length)}
            {data.length && hasMore > 0 ? (
              <>
                {hasMore ? (
                  <Button
                    onClick={() => {
                      setStart(count + start);

                      handleNextCommentData(
                        handleNextComment,
                        generateToken()[1],
                        count,
                        start
                      );
                    }}
                    type="primary"
                    shape="round"
                  >
                    Show More
                  </Button>
                ) : null}
              </>
            ) : null}
          </Col>
        </Row>
      </div>
    </>
  );
};
CommentComponent.propTypes = {
  campaignId: PropTypes.string,
  orgId: PropTypes.string,
};

CommentComponent.defaultProps = {
  campaignId: null,
  orgId: null,
};
export default CommentComponent;
