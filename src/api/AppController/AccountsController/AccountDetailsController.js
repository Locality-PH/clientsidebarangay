import axios from "axios";
import { PROFILE_URL } from "redux/constants/Auth";
import firebase from "firebase/app";
import "firebase/storage";
import { message } from "antd";

const deletePhoto = async (setLoadingButton, setEditOrganization, oldUrl) => {
  let pictureRef = firebase.storage().refFromURL(oldUrl);
  await pictureRef
    .delete()
    .then(() => {
      console.log("Picture is deleted successfully!");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        setLoadingButton(false);
        setEditOrganization(false);
      }, 1000);
    });
};
export async function updateAccount(
  values,
  profileAvatar,
  currentUser,
  setDisplayName,
  setProfileAvatar,
  setEditOrganization,
  setLoadingButton,
  generateToken,
  oldUrl
) {
  try {
    const config = generateToken()[1];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(
      `/avatar/${Date.now()}_${profileAvatar?.name}`
    );

    if (profileAvatar.type) {
      // New Image
      await fileRef.put(profileAvatar).then(function (_) {
        console.log("File uploaded!");
        // initialized file upload
        fileRef.getDownloadURL().then(async function (url) {
          console.log(url);
          const dataForm = {
            full_name: values.name,
            profile_url: url,
            mime_type: profileAvatar?.type,
          };

          await axios
            .post("/api/app/user/update", dataForm, config)
            .then((response) => {
              if (response.status === 400) {
                throw new Error("your error message here");
              }
              if (response.status === 200) {
                let data = JSON.parse(localStorage.getItem(PROFILE_URL));
                data.profile_data = response.data.profile_url;
                setProfileAvatar(response.data?.profile_url);
                setDisplayName(response.data?.full_name);
                localStorage.setItem(PROFILE_URL, JSON.stringify(data));
                currentUser.updateProfile({
                  displayName: response.data?.full_name,
                  photoURL: response.data?.profile_url,
                });
              }
            })
            .then(async (_) => {
              // Old Image delete after success
              if (oldUrl)
                await deletePhoto(
                  setLoadingButton,
                  setEditOrganization,
                  oldUrl
                );
            })
            .catch((error) => {
              // if error occure delete new image uploaded
              deletePhoto(setLoadingButton, setEditOrganization, url);
              console.log(error.message);
              return message.error(error.message);
            });
        });
      });
    } else {
      //Old Image
      const dataForm = {
        full_name: values.name,
      };
      await axios
        .post("/api/app/user/update", dataForm, config)
        .then((response) => {
          if (response.status === 400) {
            message.error("Something went wrong");
            throw new Error("Something went wrong");
          }
          if (response.status === 200) {
            currentUser.updateProfile({
              displayName: response.data?.full_name,
            });

            message.success("Updated successfully");
          }
        })
        .catch((error) => {
          return message.error(error.message);
        });
    }
  } catch (error) {
    setTimeout(() => {
      setLoadingButton(false);
      setEditOrganization(false);
    }, 1000);

    console.error("Error updating account:", error);
    return message.error(error.message);
  } finally {
    setTimeout(() => {
      setLoadingButton(false);
      setEditOrganization(false);
    }, 1000);
  }
}
export async function deleteSession(session_id, generateToken, setShowMessage) {
  const data = {
    session_id: session_id,
  };
  axios
    .post("/api/app/user/sessions/delete", data, generateToken()[1])
    .then((_) => {
      return setShowMessage({
        show: true,
        message: "Delete sucessful",
        type: "success",
      });
    })
    .catch((err) => {
      console.log(err);

      return setShowMessage({
        show: true,
        message: "Delete unsucessful",
        type: "error",
      });
    });
}
