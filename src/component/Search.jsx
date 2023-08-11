import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    //Go check out in firebase query Execute
    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If no matching user found, reset the user state and set error flag
        setUser(null);
        setErr(true);
      } else {
        // If a matching user is found, only take the first document and set the user state
        const doc = querySnapshot.docs[0];
        setUser(doc.data());
        setErr(false);
      }
    } catch (error) {
      // Handle any errors that occur during the query
      setErr(true);
      console.log("Error in query:", error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not create new one
    const combinedId =
      currentUser.uid > user.id
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log("combine : ", combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //Create user chats

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        // create user chats
        // userChats:{
        //   janesId:{
        //     combinedId:{
        //       userInfo{
        //         dn,img,id
        //       },
        //       lastMessage:"",
        //       date:"",
        //     }
        //   }
        // }
      }
    } catch (error) {}
    setUser(null);
    setUserName("");
    // console.log(currentUser);
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {err && <span>User not Found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
