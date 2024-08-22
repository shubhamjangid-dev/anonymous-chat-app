import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import Home from "./pages/Home.jsx";
import { io } from "socket.io-client";
import Occupied from "./pages/Occupied.jsx";
// if server and frontend host on same domain then
// const socket = io();

// if server and frontend host on different domain(front: 5173 & server: 7777) then
// const socket = io("http://localhost:7777");
// another way
const socket = io.connect(import.meta.env.VITE_BACKEND_URL);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home socket={socket} />,
      },
      {
        path: "/chat/:roomId",
        element: <Chat socket={socket} />,
      },
      {
        path: "/chat/occupied",
        element: <Occupied />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
