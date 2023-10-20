import React from "react";
import { Text, View } from "react-native-ui-lib";

export interface DividerCustomProps {
  text: string
  paddingHorizontal?: number
}
const DividerCustom: React.FC<DividerCustomProps> = (props) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: props.paddingHorizontal || 0,
      }}
    >
      <View 
        style={{
          flex: 5,
          height: 1,
          backgroundColor: "#766FB8",
          marginRight: 10,
        }}
      ></View>
      <Text 
        style={{
          color: "#766FB8",
          fontSize: 16,
        }}
      >{props.text}</Text>
      <View 
        style={{
          flex: 5,
          height: 1,
          backgroundColor: "#766FB8",
          marginLeft: 10,
        }}
      ></View>
    </View>
  )
}

export default DividerCustom;