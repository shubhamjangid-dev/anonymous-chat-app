import React from "react";

function Text({ prop, name }) {
  return (
    <div className={`flex mt-1 ${prop.name == "you" ? "justify-end text-right" : "justify-start text-left"}`}>
      <span className={`flex flex-col bg-yellow-300 px-3 rounded-t-xl ${prop.name == "you" ? "rounded-l-xl" : "rounded-r-xl"}`}>
        <span className="text-[8px] border-b-[1px] border-black/50">{prop.name}</span>
        <span className="text-md">{prop.message}</span>
      </span>
    </div>
  );
}

export default Text;
