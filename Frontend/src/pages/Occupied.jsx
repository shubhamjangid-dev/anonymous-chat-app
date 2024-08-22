import React from "react";
import { useNavigate } from "react-router-dom";

function Occupied() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl">Room is already occupied</h1>
      <button
        className="bg-green-500 text-white"
        onClick={() => {
          navigate("/");
        }}
      >
        home
      </button>
    </div>
  );
}

export default Occupied;
