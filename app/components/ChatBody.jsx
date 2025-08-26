"use client";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import socket from "@/socketInstance";

const ChatBody = ({ SingleData, LoggedUserId }) => {
  const [MessageText, setMessageText] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [IsEmojiOpen, setIsEmojiOpen] = useState(false);
  const handleGetData = () => {
    const response = fetch(
      `https://chatapi.zahidhasannipu.com/message/messages/${LoggedUserId}/${SingleData.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMessageData(data.messages);
      });
  };
  const handlePushObject = () => {
    if (MessageText.trim() !== "") {
      const newMessage = {
        sender_id: LoggedUserId,
        receiver_id: SingleData.id,
        message: MessageText,
        isSeen: 0,
        createdAt: new Date(),
      };

      socket.emit("NewMessage", newMessage);
    }

    setMessageText("");
  };
  const handleEmojiClick = (emojiData, event) => {
    setMessageText((prev) => prev + emojiData.emoji);
    setIsEmojiOpen(false);
  };
  useEffect(() => {
    socket.on("newMessage", (data) => {
      setMessageData((prev) => [...prev, data]);
    });
    socket.emit("join", LoggedUserId);
    handleGetData();

    return () => {
      socket.off("newMessage");
    };
  }, [LoggedUserId, SingleData.id]);
  return (
    <div className="w-screen h-screen bg-gray-200/20 flex flex-col relative">
      {SingleData !== "" ? (
        <>
          <div className="w-full h-18 lg:h-20 bg-white border-b border-black/10 flex items-center justify-between px-3 lg:px-10">
            <div className="flex justify-center items-center gap-x-2 lg:gap-x-4 cursor-pointer">
              <div className="w-13 h-13 overflow-hidden rounded-full">
                <Image
                  src={`https://chatapi.zahidhasannipu.com/profilepicture/${SingleData?.profilePicture}`}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                  alt="user"
                />
              </div>
              <div className="leading-3 lg:leading-2">
                <h1 className="text-md lg:text-lg font-bold">
                  {SingleData?.fullname}
                </h1>
                <span className="text-gray-500 text-sm">
                  {SingleData?.isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-1 lg:gap-x-3">
              <div className="cursor-pointer p-1 lg:p-3 bg-white hover:bg-black/10 rounded-full duration-150">
                <IoCall className="text-xl text-gray-400" />
              </div>
              <div className="cursor-pointer p-1 lg:p-3 bg-white hover:bg-black/10 rounded-full duration-150">
                <CiVideoOn className="text-xl text-green-600" />
              </div>
              <div className="cursor-pointer p-1 lg:p-3 bg-white hover:bg-black/10 rounded-full duration-150">
                <FaCircleInfo className="text-xl text-gray-400" />
              </div>
            </div>
          </div>
          <div className="w-full h-full overflow-y-auto px-10 scrollbar-hide flex flex-col-reverse pb-20 relative">
            <div className="p-1 lg:p-2 space-y-9 lg:space-y-3">
              {messageData.map((msg, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <div
                    className={`max-w-[50%] lg:max-w-[60%] px-0 py-1.5 rounded-md lg:rounded-xl ${
                      msg.sender_id === LoggedUserId
                        ? "bg-gray-300 text-black self-end"
                        : "bg-gray-200 text-black self-start"
                    }`}
                  >
                    <p className="font-roboto px-1 lg:px-5">{msg.message}</p>
                    <div className="flex justify-end">
                      {msg.isSeen ? (
                        <span className="text-xs pr-0 lg:pr-2 py-0.5 text-gray-500 self-start">
                          <Image
                            src="/greentick.svg"
                            alt="check"
                            width={20}
                            height={20}
                          />
                        </span>
                      ) : (
                        <span className="text-xs pr-0 lg:pr-2 py-0.5  text-gray-500 self-end">
                          <Image
                            src="/graytick.svg"
                            alt="check"
                            width={20}
                            height={20}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                  {/* <span
                className={`text-xs pl-3 pb-3 text-gray-500 ${
                  msg.sender_id === 1 ? "self-end" : "self-start"
                }`}
              >
                {new Date(msg.createdAt).toLocaleString()}
              </span> */}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-x-1 lg:gap-x-3 justify-between items-center px-2 lg:px-4 w-full absolute bottom-0 bg-white border-t border-black/10 py-2">
            <div>
              <button
                className="cursor-pointer"
                onClick={() => setIsEmojiOpen(!IsEmojiOpen)}
              >
                <BsEmojiHeartEyes className="text-xl" color="gray" />
              </button>
              {IsEmojiOpen && (
                <div className="absolute bottom-20">
                  <EmojiPicker
                    lazyLoadEmojis={true}
                    emojiStyle="facebook"
                    onEmojiClick={handleEmojiClick}
                    searchPlaceHolder="Search..."
                  />
                </div>
              )}
            </div>

            <div className="w-full px-2 lg:px-10">
              <form
                className="flex w-full "
                action="submit"
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePushObject();
                }}
              >
                <input
                  type="text"
                  name=""
                  id=""
                  className="w-full p-3 focus:outline-none"
                  placeholder="Type a message..."
                  value={MessageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button type="submit" className="curpointer text-center">
                  <p className="font-bold  text-green-600 text-nowrap">Send</p>
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col gap-y-5">
          <Image src="/chatting.jpg" alt="emptychat" width={400} height={400} />
          <p className="text-4xl font-bold text-gray-400">
            Start a conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatBody;
