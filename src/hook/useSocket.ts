import { globalSocket } from "@/socket";
import { Socket } from "socket.io-client";


type TypeSocket = "global" | "admin";

const sockets: Record<TypeSocket, Socket> = {
  global: globalSocket,
  admin: globalSocket,
}

export const useSocket = (type: TypeSocket) => {
  return sockets[type];
}