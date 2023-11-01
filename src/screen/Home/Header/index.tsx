import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Avatar, Text, View } from "react-native-ui-lib";

import IconMenu from "@/assets/icon/menu-svgrepo-com.svg";
import ModalCustom from "@/core/Modal";
import BoxModule from "@/components/BoxModule";
import ButtonCustom from "@/core/Button";
import { removeItem } from "@/utils/auth";
import { TypeAuthStack } from "@/stack/auth.stack";
import { ITEM_ASYNC_STORE_AGE } from "@/constants/itemAsycnStoreAge";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";

export interface HomeTabsHeaderProps {
  name: string
}
const HomeTabsHeader: React.FC<HomeTabsHeaderProps> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const navigationAuth = useNavigation<NavigationProp<TypeAuthStack, "AuthStack_Login">>();
  const profile = useAppSelector((state: RootState) => state.auth.profile);

  const logOut = () => {
    removeItem(ITEM_ASYNC_STORE_AGE.ACCESS_TOKEN, () => {
      navigationAuth.navigate("AuthStack_Login");
      setShow(false);
    });
  }

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
      <ModalCustom
        open={show}
        onClose={() => setShow(false)}
      >
        <View style={styles.modal}>
          <Avatar
            backgroundColor="gray"
            containerStyle={{
              height: 100,
              width: 100,
            }}
          />
          <Text style={styles.userName}>{profile?.credential?.username}</Text>
        </View>
        <View style={styles.modalListModule}>
          <BoxModule moduleName="Module 1" />
          <BoxModule moduleName="Module 2" />
          <BoxModule moduleName="Module 3" />
          <BoxModule moduleName="Module 4" />
        </View>
        <View style={styles.footer}>
          <ButtonCustom
            label="Log out"
            onPress={logOut}
          />
        </View>
      </ModalCustom>
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
  },
  footer: {
    padding: 10,
  },

  modal: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
  },
  modalListModule: {
    rowGap: 18,
    padding: 10,
    marginTop: 20,
    height: Dimensions.get("window").height,
  }
})

export default HomeTabsHeader;