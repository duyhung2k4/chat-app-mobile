import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import { Text, View } from "react-native-ui-lib";
import IconQuestion from "@/assets/icon/question-sign-svgrepo-com.svg";

export interface BoxModuleProps {
  moduleName: string
  moduleNameStyle?: TextStyle
}
const BoxModule: React.FC<BoxModuleProps> = (props) => {
  return (
    <View style={styles.root}>
      <IconQuestion
        height={40}
        width={40}
      />
      <Text
        style={{
          ...(styles.moduleName),
          ...(props.moduleNameStyle),
        }}
      >{props.moduleName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 10,
  },
  moduleName: {
    fontSize: 20,
    fontWeight: "600"
  }
})

export default BoxModule;