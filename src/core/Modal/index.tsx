import React from "react";
import ScrollViewCustom from "@/core/ScrollView";

import { Modal, View } from "react-native-ui-lib";
import { StyleSheet, ViewStyle } from "react-native";

import IconClose from "@/assets/icon/close-svgrepo-com.svg";

export interface ModalCustomProps {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
  headerStyle?: ViewStyle
}
const ModalCustom: React.FC<ModalCustomProps> = (props) => {
  return (
    <Modal
      visible={props.open}
      animationType="fade"
    >
      <View
        style={{
          ...(styles.header),
          ...(props.headerStyle),
        }}
      >
        <IconClose
          height={25}
          width={25}
          onPress={props.onClose}
        />
      </View>
      <ScrollViewCustom>
        {props.children}
      </ScrollViewCustom>
    </Modal>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
})

export default ModalCustom;