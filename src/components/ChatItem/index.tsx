import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Text, View } from "react-native-ui-lib";

const ChatItem: React.FC = () => {
  return (
    <View style={styles.root}>
      <Avatar 
        backgroundColor="gray" 
        containerStyle={styles.avatar}
      />
      <View style={styles.title}>
        <Text style={styles.name}>HIHI HAHA</Text>
        <Text style={styles.demoChat}>hihi haha</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1C202F",
    borderRadius: 8,
    padding: 10,
    columnGap: 10,
  },
  avatar: {
    width: 70,
    height: 70,
  },
  title: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  name: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  demoChat: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 14,
  }
})

export default ChatItem;