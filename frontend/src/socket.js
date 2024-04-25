import React from "react";
import socketClient from "socket.io-client";
const webSocketServer = process.env.REACT_APP_WEB_SOCKET_URL;
const baseURL = process.env.REACT_APP_API_URL;
const SERVER = process.env.REACT_APP_WEB_SOCKET_URL
const token =
  localStorage.getItem("id_token") || sessionStorage.getItem("id_token");
export const socket = socketClient(SERVER, {
  transports: ["websocket"],
  query: { token: `Bearer ${token}` },
});
