import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ socket }) {
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("new-chat-person", payload => {
      if (payload.socketId === socket.id) {
        navigate(`/chat/${payload.roomId}`);
      }
    });
  });
  return (
    <div className="w-full">
      <div className="max-w-screen-lg min-h-screen mx-auto pt-5">
        <div className="w-full flex flex-col justify-between ">
          <div className="px-2 font-bold text-3xl text-center text-gray-800">Chats</div>
          <div className="flex justify-between items-center">
            {/* <input
              type="text"
              placeholder="User Name"
              className="px-3 py-1 mx-1 text-xl border-2 border-green-500 rounded-md"
              value={userName}
              onChange={e => {
                setUserName(e.target.value);
              }}
            /> */}
            {/* <input
              type="text"
              placeholder="Room Name"
              className="px-3 py-1 mx-1 text-xl border-2 border-green-500 rounded-md"
              value={roomName}
              onChange={e => {
                setRoomName(e.target.value);
              }}
            /> */}
            <button
              className="px-3 py-1 text-xl text-white bg-green-500 border-2 border-green-500 rounded-md"
              onClick={() => {
                socket.emit("create-room");
                // console.log(socket.id);
              }}
            >
              creat private room
            </button>
            <button
              className="px-3 py-1 text-xl text-white bg-green-500 border-2 border-green-500 rounded-md"
              onClick={() => {
                socket.emit("join-unknown-room");
              }}
            >
              join random chat
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col">
          {/* <div
            className="w-1/4 p-3 rounded-lg bg-slate-100"
            onClick={() => {
              navigate("/chat/123");
            }}
          >
            Shubham
          </div>
          <div
            className="w-1/4 p-3 rounded-lg bg-slate-100"
            onClick={() => {
              navigate("/chat/abc");
            }}
          >
            Jangir
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
