import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {
  const { data } = useContext(ChatContext);
  // const { dispatch } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>
          {data.user?.displayName}
          {/* {console.log("data:", data)} */}
          {/* {console.log("chat data", data)} */}
        </span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
