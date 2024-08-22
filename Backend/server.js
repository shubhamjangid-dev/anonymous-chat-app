import express from "express";
import { nanoid } from "nanoid";

const app = express();

import http from "http";

const server = http.createServer(app);

// creating socket
import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = {};
const privateRooms = {};
// some triggers
io.on("connection", async socket => {
  console.log("socket is connected successfully with socketId :", socket.id);

  // triggers
  // create Room
  socket.on("create-room", () => {
    const roomId = nanoid(10);
    privateRooms[roomId] = { joined: false, socketOne: socket.id };
    socket.join(roomId);
    socket.emit("new-chat-person", { roomId, socketId: socket.id });
    // console.log("pvt", privateRooms);
  });

  // join Room
  socket.on("join-room", payload => {
    const roomId = payload.roomId;
    if (roomId != null && privateRooms[roomId]?.joined === false && socket.id != privateRooms[roomId]?.socketOne) {
      socket.join(roomId);
      privateRooms[roomId] = { ...privateRooms[roomId], joined: true, socketTwo: socket.id };
      socket.to(roomId).emit("new-person-joined", {});
      socket.emit("user-found", { socketId: socket.id });
    }
  });

  // leave room
  socket.on("leave-room", payload => {
    socket.leave(payload.roomId);
  });

  // join unknown Room
  socket.on("join-unknown-room", () => {
    // console.log(rooms);
    const roomId = Object.keys(rooms).find(key => rooms[key]?.joined == false);
    // console.log(roomId);

    if (roomId) {
      socket.join(roomId);
      rooms[roomId] = { ...rooms[roomId], joined: true, socketTwo: socket.id };
      socket.to(roomId).emit("new-person-joined", {});
      socket.emit("new-chat-person", { roomId, socketId: socket.id });
    } else {
      const roomId = nanoid(8);
      rooms[roomId] = { joined: false, socketOne: socket.id };
      socket.join(roomId);
      socket.emit("new-chat-person", { roomId, socketId: socket.id });
    }
  });
  // getroom information
  socket.on("get-room", payload => {
    const roomId = payload.roomId;
    if (roomId.length == 10) {
      //   console.log(roomId);

      socket.emit("get-room-info", { roomId, ...privateRooms[roomId] });
    } else {
      socket.emit("get-room-info", { roomId, ...rooms[roomId] });
    }
  });

  // messages transfering
  socket.on("sent-message", payload => {
    // console.log(payload);
    // io.emit("chat", payload); // send to everyone
    socket.to(payload.roomId).emit("recieved-message", payload); // send to everyone except sender
  });

  // on disconnect
  socket.on("disconnect", (reason, detail) => {
    console.log("disconnected -->", reason);
  });
  socket.on("hello", data => {
    console.log("hello", data);
  });
});
// server listening
const port = 7777;
server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
