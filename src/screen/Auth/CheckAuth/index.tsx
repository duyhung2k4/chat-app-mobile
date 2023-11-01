import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View } from "react-native-ui-lib";
import { ActivityIndicator } from "react-native";
import { TypeAuthStack } from "@/stack/auth.stack";
import { TypeHomeStack } from "@/stack/home.stack";
import { useLoginTokenMutation } from "@/redux/query/api/auth";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSocket } from "@/hook/useSocket";
import { ITEM_ASYNC_STORE_AGE } from "@/constants/itemAsycnStoreAge";




type Props = NativeStackScreenProps<TypeAuthStack, "AuthStack_CheckAuth">;
const CheckAuth: React.FC<Props> = ({ navigation }) => {
  const [loginToken] = useLoginTokenMutation();

  const navigationHome = useNavigation<NavigationProp<TypeHomeStack, "HomeStack_Home">>();
  const socket = useSocket("global");

  const checkAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem(ITEM_ASYNC_STORE_AGE.ACCESS_TOKEN);
    if(accessToken === null) {
      navigation.navigate("AuthStack_Login");
    } else {
      loginToken(undefined);
      navigationHome.navigate("HomeStack_Home");
    }
  }

  const handlerConnect = async () => {
    const accessToken = await AsyncStorage.getItem(ITEM_ASYNC_STORE_AGE.ACCESS_TOKEN);
    if(accessToken !== null) {
      socket.auth = {
        accessToken: accessToken,
      };
      socket.connect();
    }
  }

  useEffect(() => {
    handlerConnect();
    checkAccessToken();
  }, []);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1C202F",
      }}
    >
      <ActivityIndicator size="large"/>
    </View>
  )
}

export default CheckAuth;