import React from "react";
import Chat from "../component/Chat";
import Sidebar from "../component/Sidebar";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
