import socket from "@/socketInstance";
import { deleteCookie } from "cookies-next/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

const ChatList = ({ UserData, handleGetSigleData }) => {
  const router = useRouter();
  const [SearchText, setSearchText] = useState("");
  const handleLogout = (e) => {
    e.preventDefault();
    socket.emit("makeOffline", JSON.parse(localStorage.getItem("user")).id);
    if (socket.connected) {
      socket.disconnect();
    }
    deleteCookie("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const filterData = UserData.filter((user) => {
    return user.fullname.toLowerCase().includes(SearchText.toLowerCase());
  });

  return (
    <div className="w-[320px] h-full border-r border-black/10 ">
      <div className="h-full overflow-y-auto scrollbar-hide ">
        <div className=" w-full sticky top-0 bg-white">
          <div className="space-y-2 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Messages</h1>
              </div>
              <div className="relative group">
                <Link href="/">
                  <div className=" border-transparent group-hover:border-black/10 cursor-pointer">
                    <BsThreeDotsVertical />
                  </div>
                </Link>

                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[999]">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <p>Logout</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2 bg-[#EEEEEE] rounded-md px-4">
              <IoSearch className="text-2xl" />
              <input
                type="text"
                name=""
                id=""
                className="w-full py-2 px-1 focus:outline-none"
                placeholder="Search any user..."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="p-4 space-y-8">
          {UserData &&
            filterData.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleGetSigleData(item)}
                  className="cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-x-3 ">
                      <div className="relative">
                        <div className="w-12 h-12  overflow-hidden rounded-full">
                          <img
                            src={`https://chatapi.zahidhasannipu.com/profilepicture/${item.profilePicture}`}
                            alt=""
                          />
                        </div>
                        <div
                          className={`w-3 h-3 ${
                            item.isOnline ? "bg-green-500" : "bg-gray-400"
                          } rounded-full absolute bottom-0 right-0 z-30`}
                        ></div>
                      </div>
                      <div className="leading-4">
                        <p className="font-semibold">{item.fullname}</p>
                        <small className="text-gray-400">my last message</small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
