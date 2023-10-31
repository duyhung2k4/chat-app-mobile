import React from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native-ui-lib";

const OverLoading: React.FC = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large"/>
    </View>
  )
}

export default OverLoading;