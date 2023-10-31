import React, { Children } from "react";
import { View } from "react-native-ui-lib";

export interface YstackCustomProps {
  spacing?: number
  children: React.ReactNode
}
const YstackCustom: React.FC<YstackCustomProps> = (props) => {
  const listChild = Children.toArray(props.children);
  return (
    <View width="100%">
      {
        listChild.map((Child, index: number) => {
          return (
            <View 
              key={index}
              style={{
                width: "100%",
                marginBottom: index < listChild.length - 1 ?  props.spacing || 8 : 0,
              }}
            >{Child}</View>
          )
        })
      }
    </View>
  )
}

export default YstackCustom;