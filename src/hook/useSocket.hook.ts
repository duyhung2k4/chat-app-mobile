import { 
  globalSocket,
  adminSocket,
} from "@/socket";
import { Socket } from "socket.io-client";

type TypeSocket = "global" | "admin";

const sockets: Record<TypeSocket, Socket> = {
  global: globalSocket,
  admin: adminSocket,
}

export const useSocket = (type: TypeSocket) => {
  const socket = sockets[type];
  return socket;
}