import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonCustom from "@/components/Button";


import { Text, View } from "react-native-ui-lib";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { StyleSheet } from "react-native";
import { TypeAuthStack } from "@/stack/auth.stack";
import { InfoAcceptCode } from "@/storeage/infoAcceptCode";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const CELL_COUNT = 6;

type Props = NativeStackScreenProps<TypeAuthStack, "AuthStack_AcceptCodeRegister">
const AcceptCodeRegister: React.FC<Props> = ({ navigation }) => {
  const [value, setValue] = useState<string>("");
  const [exp, setExp] = useState<number | undefined>(undefined);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const getExp = async () => {
    const textJson = await AsyncStorage.getItem("id");
    if(textJson === null) { 
      navigation.navigate("AuthStack_Register");
      return;
    }
    const objectJson: InfoAcceptCode = JSON.parse(textJson);
    const exp = dayjs(objectJson.exp).diff(dayjs(), "second");
    setExp(exp);
  }

  const cancelAccept = async () => {
    const _ = await AsyncStorage.removeItem("id");
    navigation.navigate("AuthStack_Register");
  }

  useEffect(() => {
    if(exp === undefined) { 
      getExp();
      return;
    }
    if(exp <= 0) return;
    const countExp = setTimeout(() => {
      getExp();
      if (exp <= 0) clearTimeout(countExp);
    }, 1000);

    return () => {
      clearTimeout(countExp);
    }
  }, [exp]);

  return (
    <View
      style={styles.root}
    >
      {
        (exp !== undefined && exp <= 0) ?
          <Text style={{ color: "red", fontSize: 16, }}>Verification code has expired</Text> :
          <>
            <Text style={{ color: "#766FB8", fontSize: 16, }}>The confirmation code expires later</Text>
            <Text style={{ color: "red", fontSize: 16, }}>{exp} second</Text>
          </>
      }
      <View
        style={{
          width: "100%",
        }}
      >
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
        }}
      >
        <ButtonCustom onPress={cancelAccept} type="cancel" style={styles.buttonCancel} label="Cancel" />
        <ButtonCustom style={styles.buttonAccept} label="Accept" />
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1C202F",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "#7770B9",
  },
  warning: {
    color: "red",
    fontSize: 16,
    opacity: 0.8
  },
  codeFieldRoot: {
    marginTop: 20
  },
  cell: {
    width: 50,
    height: 60,
    lineHeight: 38,
    borderRadius: 8,
    color: "#7770B9",
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    textAlignVertical: "center",
  },
  focusCell: {
    borderColor: "#7770B9",
  },

  buttonAccept: {
    flex: 1, 
    marginLeft: 5,
  },
  buttonCancel: {
    flex: 1, 
    marginRight: 5,
  }
});

export default AcceptCodeRegister;