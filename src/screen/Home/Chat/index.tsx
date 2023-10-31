import ChatItem from "@/components/ChatItem";
import Search from "@/core/Search";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

const Chat: React.FC = () => {
  return (
    <View style={styles.root}>
      <View style={styles.boxSearch}>
        <Search/>
      </View>
      <ChatItem/>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
  },

  boxSearch: {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  }
})

export default Chat;