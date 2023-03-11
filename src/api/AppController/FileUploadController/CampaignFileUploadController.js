import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";
import { message } from "antd";

const deletePhoto = async (url) => {
  let pictureRef = firebase.storage().refFromURL(url);
  await pictureRef
    .delete()
    .catch((err) => {
      throw (err);
    });
};

export async function multipleImageDelete(urls) {
  try {
    urls.forEach(async url => {
      deletePhoto(url)
    });
  } catch (error) {
    throw error
  }
};

async function uploadImage(file, filePath) {
  if (file.status == "old") {
    return file
  }

  else {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`/${filePath}/${Date.now()}_${file?.name}`);

    await fileRef.put(file)
    const url = await fileRef.getDownloadURL();
    const type = file?.type
    return { data: url, contentType: type, name: file.name, status: file.status };
  }
}

export async function multipleImageUpload(images, filePath) {
  try {
    const imagePromises = Array.from(images, (image) => uploadImage(image, filePath));

    const imageRes = await Promise.all(imagePromises);
    return imageRes; // list of url like ["https://..", ...]
  } catch (error) {
    throw error
  }
}

