import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const currentUser = useContext(AuthContext);
  // console.log(currentUser.currentUser.displayName);
  // console.log(currentUser.currentUser);
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img src={currentUser.currentUser.photoURL} alt="" />
        <span>{currentUser.currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Log Out</button>
      </div>
    </div>
  );
}
