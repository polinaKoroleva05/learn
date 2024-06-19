import { io } from "socket.io-client";
import { reactive } from "vue";

export const state = reactive({
  connected: false,
  updateEvents: [],
  adminEvents: []
});

export const socket = io("http://localhost:3001");

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("update", (...args) => {
  state.updateEvents.push(args);
});

socket.on("admin", (...args) => {
    console.log("in socket recieve admin message")
    state.adminEvents.push(args);
  });