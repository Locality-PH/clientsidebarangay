import React, { useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import PropTypes from "prop-types";
import ShowMoreText from "react-show-more-text";

const CommentComponent = (props) => {
  const [data, setData] = useState([
    {
      userId: "01a",
      comId: "012",
      fullName: "Riya Negi",
      avatarUrl: "https://ui-avatars.com/api/name=Riya&background=random",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "Hey, Loved your blog! ",
      replies: [
        {
          userId: "02b",
          comId: "017",
          fullName: "Lily",
          userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
          text: "I have a doubt about the 4th point🤔",
          avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
          replies: [],
        },
      ],
    },
  ]);
  console.log(data);
  return (
    <CommentSection
      currentUser={{
        currentUserId: "01a",
        currentUserImg:
          "https://ui-avatars.com/api/name=Riya&background=random",
        currentUserProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
        currentUserFullName: "Riya Negi",
      }}
      logIn={{
        loginLink: "http://localhost:3001/",
        signupLink: "http://localhost:3001/",
      }}
      commentData={data}
      onSubmitAction={(data) => {
        console.log("check submit, ", data);
        setData((oldArray) => [...oldArray, data]);
      }}
      onDeleteAction={() => window.prompt("Are you sure?")}
      onReplyAction={(data) => console.log("reply submit, ", data)}
      onEditAction={() => alert("Reply was edited!")}
    />
  );
};
CommentComponent.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  img: PropTypes.string,
  content: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  classData: PropTypes.string,
  isVisit: PropTypes.bool,
};

CommentComponent.defaultProps = {
  padding: "5",
  title: "",
  type: "",
  img: "",
  content: "",
  margin: "5px 5px",
  isVisit: true,
  classData: "",
};
export default CommentComponent;
