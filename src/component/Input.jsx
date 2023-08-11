import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import {
  updateDoc,
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleImageUpload = async () => {
    if (!img) {
      return; // No image to upload
    }

    const imageRef = ref(storage, uuid());

    const uploadTask = uploadBytesResumable(imageRef, img);

    try {
      await uploadTask;

      const downloadURL = await getDownloadURL(imageRef);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSend = async () => {
    const imageDownloadURL = await handleImageUpload();

    const newMessage = {
      id: uuid(),
      text,
      senderId: currentUser.uid,
      date: Timestamp.now(),
    };

    if (imageDownloadURL) {
      newMessage.img = imageDownloadURL;
    }

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion(newMessage),
    });

    const chatUpdate = {
      [`${data.chatId}.lastMessage`]: { text },
      [`${data.chatId}.date`]: serverTimestamp(),
    };

    await updateDoc(doc(db, "userChats", currentUser.uid), chatUpdate);
    await updateDoc(doc(db, "userChats", data.user.uid), chatUpdate);

    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type Something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="Attach" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="Upload" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
