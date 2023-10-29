import { io, Manager } from "socket.io-client";

const managerSocket = new Manager("http://10.0.2.2:3001", {
  autoConnect: false,
});

export const globalSocket = managerSocket.socket("/");
export const adminSocket = managerSocket.socket("/admin");
export const defaultSocket = managerSocket.socket("/", { auth: {} });
export default managerSocket;