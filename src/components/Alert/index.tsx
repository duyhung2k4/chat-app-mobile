import React from "react";
import { Dialog, Text, View } from "react-native-ui-lib";
import ButtonCustom from "../Button";
import YstackCustom from "../YStack";

import IconSuccess from "@/assets/icon/success-svgrepo-com.svg";
import IconWarning from "@/assets/icon/warning-circle-svgrepo-com.svg";
import IconError from "@/assets/icon/error-svgrepo-com.svg";
import IconNotification from "@/assets/icon/notification-svgrepo-com.svg";

export type TypeAlert = "success" | "warning" | "error" | "notification";
export interface AlertCustomProps {
  textAlert: string
  typeAlert?: TypeAlert
  open: boolean
  onClose: () => void
}

const iconWithType: Record<TypeAlert, React.ReactNode> = {
  success: <IconSuccess height={45} width={45}/>,
  warning: <IconWarning height={45} width={45}/>,
  error: <IconError height={45} width={45}/>,
  notification: <IconNotification height={45} width={45}/>,
}

const AlertCustom: React.FC<AlertCustomProps> = (props) => {
  return (
    <Dialog
      visible={props.open}
      ignoreBackgroundPress
    >
      <View
        style={{
          borderRadius: 8,
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 20,
          width: "100%",
        }}
      >
        <YstackCustom spacing={30}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            {iconWithType[props.typeAlert || "notification"]}
            <Text style={{ marginTop: 10 }}>{props.textAlert}</Text>
          </View>

          <ButtonCustom
            style={{ width: "100%" }}
            label="Close"
            onPress={() => props.onClose()}
          />
        </YstackCustom>
      </View>
    </Dialog>
  )
}

export default AlertCustom;