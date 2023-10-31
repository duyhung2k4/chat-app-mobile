import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonCustom from "@/core/Button";


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
import { useSendCodeRegisterMutation, useSendInfoRegisterMutation } from "@/redux/query/api/auth";
import AlertCustom, { AlertCustomProps } from "@/core/Alert";

const CELL_COUNT = 6;

type Props = NativeStackScreenProps<TypeAuthStack, "AuthStack_AcceptCodeRegister">
const AcceptCodeRegister: React.FC<Props> = ({ navigation }) => {
  const [code, setCode] = useState<string>("");
  const [exp, setExp] = useState<number | undefined>(undefined);

  const [sendCode, { isLoading: loadingSendCode }] = useSendCodeRegisterMutation();
  const [resendCode, { isLoading: loadingResendCode }] = useSendInfoRegisterMutation();
  const [alert, setAlert] = useState<Omit<AlertCustomProps, "onClose">>({
    textAlert: "",
    typeAlert: "notification",
    open: false,
  });

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
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

  const handlerSendCode = async () => {
    const textJson = await AsyncStorage.getItem("id");
    if(textJson === null) { 
      navigation.navigate("AuthStack_Register");
      return;
    }

    const objectJson: InfoAcceptCode = JSON.parse(textJson);

    const result = await sendCode({
      idTemporaryCredential: objectJson.id,
      code,
    });

    if("data" in result) {
      setAlert({
        typeAlert: "success",
        textAlert: "Success",
        open: true,
      })
    } else {
      setAlert({
        typeAlert: "error",
        textAlert: "Error",
        open: true,
      })
    }
  }

  const handlerResendCode = async () => {
    const textJson = await AsyncStorage.getItem("id");
    if(textJson === null) { 
      navigation.navigate("AuthStack_Register");
      return;
    }
    const objectJson: InfoAcceptCode = JSON.parse(textJson);

    const result = await resendCode({
      username: objectJson.username,
      password: objectJson.password,
      email: objectJson.email,
    });

    if("data" in result) {
      if(result.data.data !==  undefined) {
        const exp = dayjs(result.data.data.timeEnd).toString();
        const expLocal = dayjs(result.data.data.timeEnd).add(60, "s").toString();

        const saveInfo: InfoAcceptCode = {
          id: result.data.data.id,
          email: objectJson.email,
          username: objectJson.username,
          password: objectJson.password,
          exp,
          expLocal,
        }

        const _ = await AsyncStorage.setItem("id", JSON.stringify(saveInfo));

        setCode("");
        getExp();
      }
    } else {
      setAlert({
        typeAlert: "error",
        textAlert: "Error",
        open: true,
      })
    }
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
          value={code}
          onChangeText={setCode}
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
        <ButtonCustom 
          onPress={cancelAccept} 
          type="cancel" 
          style={styles.buttonCancel} 
          label="Cancel" 
          disabled={loadingResendCode || loadingSendCode}
        />
        {
          (exp !== undefined && exp <= 0) ?
            <ButtonCustom 
              style={styles.buttonAccept} 
              label="Resend" 
              loading={loadingResendCode}
              onPress={handlerResendCode}
            /> :
            <ButtonCustom 
              disabled={code.length < 6} 
              style={styles.buttonAccept} 
              label="Accept" 
              onPress={handlerSendCode}
              loading={loadingSendCode}
            />
        }
      </View>

      <AlertCustom
        {...alert}
        onClose={() => {
          if(alert.typeAlert === "success") {
            navigation.navigate("AuthStack_Login");
          }
          setAlert({ ...alert, open: false });
        }}
      /> 
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