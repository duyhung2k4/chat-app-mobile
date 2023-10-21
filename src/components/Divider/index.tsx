import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

export interface DividerCustomProps {
  text: string
  paddingHorizontal?: number
}
const DividerCustom: React.FC<DividerCustomProps> = (props) => {
  return (
    <View
      style={{
        ...(styles.root),
        paddingHorizontal: props.paddingHorizontal || 0,
      }}
    >
      <View style={styles.lineLeft}></View>
      <Text style={styles.text}>{props.text}</Text>
      <View style={styles.lineRight}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lineLeft: {
    flex: 5,
    height: 1,
    backgroundColor: "#766FB8",
    marginRight: 10,
  },
  lineRight: {
    flex: 5,
    height: 1,
    backgroundColor: "#766FB8",
    marginLeft: 10,
  },
  text: {
    color: "#766FB8",
    fontSize: 16,
  }
})

export default DividerCustom;