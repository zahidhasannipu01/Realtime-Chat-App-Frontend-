import { io } from "socket.io-client";

const socket = io("https://chatapi.zahidhasannipu.com", {
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;
