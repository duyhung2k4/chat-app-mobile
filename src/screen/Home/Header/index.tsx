import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import IconMenu from "@/assets/icon/menu-svgrepo-com.svg";
import AlertCustom from "@/core/Alert";

export interface HomeTabsHeaderProps {
  name: string
}
const HomeTabsHeader: React.FC<HomeTabsHeaderProps> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <View
      style={styles.root}
    >
      <IconMenu 
        height={40} 
        width={40} 
        onPress={() => setShow(true)}
      />
      <Text style={styles.name}>{props.name}</Text>
      <AlertCustom
        textAlert="HEHE"
        open={show}
        onClose={() => setShow(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 60,
    backgroundColor: "#FFFFFF",
    padding: 10,
    columnGap: 10,
  },
  name: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 18,
  }
})

export default HomeTabsHeader;