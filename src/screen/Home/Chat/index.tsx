import React from "react";
import ChatItem from "@/components/ChatItem";
import Line from "@/core/Line";
import ScrollViewCustom from "@/core/ScrollView";
import SearchInput from "@/core/Form/SearchInput";

import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";

const Chat: React.FC = () => {
  return (
    <View style={styles.root}>
      <SearchInput />
      <Line height={2.5} />
      <ScrollViewCustom>
        <View style={styles.listChat}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <ChatItem key={n} />)}
        </View>
      </ScrollViewCustom>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    rowGap: 10,
  },
  boxSearch: {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  listChat: {
    paddingTop: 0,
    rowGap: 10,
    padding: 10,
  }
})

export default Chat;