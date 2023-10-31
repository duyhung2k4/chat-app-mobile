import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";

const ScrollViewCustom: React.FC<ScrollViewProps> = (props) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  )
}

export default ScrollViewCustom;