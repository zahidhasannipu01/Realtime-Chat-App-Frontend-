import React from "react";
import { IoSearch } from "react-icons/io5";

const MobileChatlist = ({ setIsChatlistOpen, handleOpen, IsChatlistOpen }) => {
  return (
    <div className={`w-full h-full border-r border-black/10 `}>
      <div className="h-full overflow-y-auto scrollbar-hide ">
        <div className=" w-full sticky top-0 bg-white">
          <div className="space-y-2 p-4">
            <h1 className="text-2xl font-bold">Messages</h1>
            <div className="flex items-center gap-x-2 bg-[#EEEEEE] rounded-md px-4">
              <IoSearch className="text-2xl" />
              <input
                type="text"
                name=""
                id=""
                className="w-full py-2 px-1"
                placeholder="Search any user..."
              />
            </div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {Array.from({ length: 50 }).map((_, i) => (
            <p key={i}>
              <button
                onClick={handleOpen}
                className="w-full text-left"
              >{`Message ${i + 1}`}</button>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileChatlist;
