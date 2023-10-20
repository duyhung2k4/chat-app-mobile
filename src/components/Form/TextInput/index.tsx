import React from "react";
import { StyleSheet } from "react-native";

import { Text, TextField, TextFieldProps, View } from "react-native-ui-lib";

export type TextInputCustomProps = TextFieldProps & {
  textValidate?: string
};
const TextInputCustom: React.FC<TextInputCustomProps> = (props) => {
  return (
    <View width={"100%"}>
      <TextField
        style={styles.field}
        labelStyle={styles.labelField}
        placeholderTextColor={"gray"}
        {...props}
      />
      {(props.textValidate !== undefined) && <Text style={styles.textValidate}>{props.textValidate}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    height: 50,
    textAlign: "left",
    textAlignVertical: "center",
    borderRadius: 8,
    paddingLeft: 10,
    color: "#766FB8",
    fontSize: 16,
    backgroundColor: "#232736",
  },
  labelField: {
    color: "#766FB8",
    fontSize: 16,
    marginBottom: 6,
  },
  textValidate: {
    fontSize: 16,
    color: "red",
  }
})

export default TextInputCustom;