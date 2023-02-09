import React, { useState, useEffect } from "react";
import FormAvatar from "./Profile/sessions/FormAvatar";
import AccountSession from "./Profile/sessions/AccountSession";
import { useAuth } from "contexts/AuthContext";
import firebase from "firebase/app";
import { AUTH_TOKEN } from "redux/constants/Auth";
import notification from "components/shared-components/Notification/";
import "firebase/storage";

const EditPorfile = () => {
  const data = { auth_id: localStorage.getItem(AUTH_TOKEN) };
  const { generateToken } = useAuth();
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);

  // File Upload
  const handleUpload = (event) => {
    event.preventDefault();
    console.log(file);
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`/avatar/${Date.now()}-${file?.name}`);

    fileRef.put(file).then(function (_) {
      console.log("File uploaded!");
      fileRef.getDownloadURL().then(function (url) {
        setUrl(url);
        console.log(url);
      });
    });
  };

  //select file upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const notificationHandle = () => {
    notification({
      message: "Notification Title",
      description:
        "I will never close automatically. This is a purposely very very long description that has many many characters and words.",
      duration: 5,
      type: "success",
    });
  };

  return (
    <>
      {" "}
      {/* <button onClick={notificationHandle} type="submit">
        Upload
      </button> */}
      {/* frontend
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        {url && (
          <p>
            File: <a href={url}>{file?.name}</a>
          </p>
        )}
      </form> */}
      <FormAvatar {...data} />
      <AccountSession />
    </>
  );
};

export default EditPorfile;
