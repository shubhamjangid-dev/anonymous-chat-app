import React, { useState, useEffect, useRef } from "react";
import Text from "./Text";
import { useNavigate, useParams } from "react-router-dom";
import ChatEvents from "./ChatEvents";

function Chat({ socket }) {
  const navigate = useNavigate();
  const { roomId } = useParams();
  //   console.log(roomId);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (roomId.length == 10) {
      socket.emit("join-room", { roomId });
      console.log("room changed");
    }
    socket.emit("get-room", { roomId });
  }, [roomId]);

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    socket.on("recieved-message", payload => {
      //   console.log(payload);
      setChats([...chats, { ...payload, type: "text" }]);
    });
    socket.on("new-person-joined", () => {
      //   console.log(payload);
      setChats([...chats, { message: "unknown person joined the chat", type: "event" }]);
      console.log("new person joined the chat");
    });
    socket.on("get-room-info", payload => {
      //   console.log(payload);
      if (roomId == payload.roomId) {
        if (socket.id == payload.socketOne) {
          setChats([...chats, { message: "room created by you", type: "event" }, { message: "you joined the chat", type: "event" }]);
        } else if (socket.id == payload.socketTwo) {
          setChats([...chats, { message: "room created by unknown", type: "event" }, { message: "unknown joined the chat", type: "event" }, { message: "you joined the chat", type: "event" }]);
        } else {
          navigate("/chat/occupied");
        }
      }
    });
  });

  const sendMessage = e => {
    e.preventDefault();
    if (message != "") {
      socket.emit("sent-message", { message, name: "unknown", roomId });
      setChats([...chats, { message, name: "you", roomId, type: "text" }]);
      setMessage("");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="max-w-screen-lg mx-auto flex flex-col justify-center bg-stone-400 h-screen">
          <div className="w-full flex flex-col h-full">
            <div className="w-full h-full flex-grow overflow-y-auto p-4">
              {chats.map((ele, index) => {
                if (ele.type == "text")
                  return (
                    <Text
                      prop={ele}
                      key={index}
                    />
                  );
                else if (ele.type == "event") {
                  return (
                    <ChatEvents
                      prop={ele}
                      key={index}
                    />
                  );
                }
              })}
            </div>
            <div className="w-full flex-shrink-0">
              <form
                onSubmit={sendMessage}
                className="w-full px-3 py-2 flex"
              >
                <input
                  type="text"
                  placeholder="enter a message..."
                  className="w-full px-2 py-1 rounded-full outline-none"
                  value={message}
                  onChange={e => {
                    setMessage(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="bg-green-500 px-2 py-1 mx-1 rounded-full"
                >
                  send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
