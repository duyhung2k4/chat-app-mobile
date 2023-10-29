import React, { useEffect } from "react";
import ButtonCustom from "@/components/Button";
import YstackCustom from "@/components/YStack";

import { Text, View } from "react-native-ui-lib";
import { DEFAULT_EVENT } from "@/socket/event";
import { useSocket } from "@/hook/useSocket";

const Home: React.FC = () => {

  const socket = useSocket("global");

  const sendMessage = () => {
    const message: { mess: string } = { mess: "Hello server" };
    socket.emit("mess", message);
  }

  const disconnect = () => {
    socket.disconnect();
    socket.on(DEFAULT_EVENT.DISCONNECT, () => console.log("Disconnected"));
  }

  useEffect(() => {
    socket.on("rep", (values) => {
      console.log(values);
    });

    return () => {
      socket.removeListener("rep");
    }
  }, []);

  return (
    <View>
      <Text>Home</Text>
      <YstackCustom spacing={20}>
        <ButtonCustom
          label="Send"
          onPress={sendMessage}
        />
        <ButtonCustom
          label="Disconnect"
          onPress={disconnect}
        />
      </YstackCustom>
    </View>
  )
}

export default Home;