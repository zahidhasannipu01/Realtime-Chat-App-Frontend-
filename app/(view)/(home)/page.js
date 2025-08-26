"use client";
import ChatBody from "@/app/components/ChatBody";
import ChatList from "@/app/components/ChatList";
import MobileChatlist from "@/app/components/MobileChatlist";
import socket from "@/socketInstance";
import { getCookies } from "cookies-next/client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [IsChatlistOpen, setIsChatlistOpen] = useState(false);
  const [UserData, setUserData] = useState([]);
  const [SingleData, setSingleData] = useState("");
  const [LoggedUserId, setLoggedUserId] = useState(null);
  const [FiltteredData, setFiltteredData] = useState([]);
  const handleFetch = async () => {
    const response = await fetch(
      "https://chatapi.zahidhasannipu.com/user/users"
    );
    const result = await response.json();
    setUserData(result);
  };
  useEffect(() => {
    handleFetch();
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedUserId(JSON.parse(user).id);
    }
  }, []);
  useEffect(() => {
    if (UserData.users?.length) {
      const filterData = UserData.users.filter(
        (user) => user.id !== LoggedUserId
      );
      setFiltteredData(filterData);
    }
  }, [UserData, LoggedUserId, SingleData]);
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("connect", () => {
      socket.emit("makeOneline", LoggedUserId);
    });
    socket.on("disconnect", () => {});
    socket.on("userStatusChanged", (data) => {
      handleFetch();
    });
    const handleUnload = () => {
      socket.emit("makeOffline", LoggedUserId);
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [LoggedUserId]);
  const handleOpen = () => {
    setIsChatlistOpen(!IsChatlistOpen);
  };
  const handleGetSigleData = (data) => {
    setSingleData(data);
  };
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="hidden lg:flex w-full h-full">
        <ChatList
          UserData={FiltteredData}
          handleGetSigleData={handleGetSigleData}
        />
        <ChatBody LoggedUserId={LoggedUserId} SingleData={SingleData} />
      </div>
      <div className="flex lg:hidden w-full h-full">
        {IsChatlistOpen ? (
          <ChatBody LoggedUserId={LoggedUserId} SingleData={SingleData} />
        ) : (
          <MobileChatlist
            setIsChatlistOpen={setIsChatlistOpen}
            handleOpen={handleOpen}
            IsChatlistOpen={IsChatlistOpen}
          />
        )}
      </div>
    </div>
  );
};

export default page;
