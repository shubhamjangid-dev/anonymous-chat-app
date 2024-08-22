import React from "react";

function ChatEvents({ prop }) {
  return (
    <div className="w-full flex justify-center mt-1 text-sm">
      <span className="bg-white/70 px-10 rounded-md">{prop.message}</span>
    </div>
  );
}

export default ChatEvents;
