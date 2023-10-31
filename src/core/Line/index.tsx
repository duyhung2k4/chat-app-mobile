import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";

export interface LineProps {
  backgroundColor?: string
  height?: number
}
const Line: React.FC<LineProps> = (props) => {
  return (
    <View
      style={{
        ...(styles(props).root),
      }}
    ></View>
  )
}

const styles = (props: LineProps) => StyleSheet.create({
  root: {
    width: "100%",
    height: props.height || 2,
    backgroundColor: props.backgroundColor || "gray",
  }
})

export default Line;