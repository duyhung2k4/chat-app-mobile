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
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
  },

  boxSearch: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  }
})

export default Chat;