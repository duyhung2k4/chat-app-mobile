import React from "react";
import { ActivityIndicator } from "react-native";
import { Button, ButtonProps, Text } from "react-native-ui-lib";

type TypeButton = "accept" | "cancel";

const colorTypeButton: Record<TypeButton, string> = {
  accept: "#766FB8",
  cancel: "red",
}

export type ButtonCustomProps = ButtonProps & {
  loading?: boolean
  type?: TypeButton
}
const ButtonCustom: React.FC<ButtonCustomProps> = (props) => {
  return (
    <Button
      backgroundColor={colorTypeButton[props.type || "accept"]}
      disabled={props.loading}
      disabledBackgroundColor="gray"
      size="large"
      children={
        props.loading === true ?
        <ActivityIndicator size="small" color={"#FFFFFF"}/>:
        <Text 
          style={{
            fontSize: 16,
            color: "#FFFFFF"
          }}
        >{props.label}</Text>
      }
      {...props}
      label=""
    />
  )
}

export default ButtonCustom