import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import * as Yup from "yup";
import ButtonCustom from "@/components/Button";
import DividerCustom from "@/components/Divider";
import TextInputCustom from "@/components/Form/TextInput";
import YstackCustom from "@/components/YStack";
import IconChat from "@/assets/icon/chat-round-dots-svgrepo-com.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScrollViewCustom from "@/components/ScrollView";

import { useFormik } from "formik";
import { Text, View } from "react-native-ui-lib";
import { useSendInfoRegisterMutation } from "@/redux/query/api/auth";
import { SendInfoRegisterPayload } from "@/payload/auth.payload";
import { InfoAcceptCode } from "@/storeage/infoAcceptCode";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { TypeAuthStack } from "@/stack/auth.stack";
import { TemporaryInfo } from "@/model/temporaryInfo";
import AlertCustom, { AlertCustomProps } from "@/components/Alert";


interface FormRegister {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const initFormRegister: FormRegister = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const schemaRegister = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Require"),
  password: Yup.string()
    .required("Require"),
  confirmPassword: Yup.string()
    .equals([Yup.ref("password")], "Confirm password not true")
    .required("Require")
})

type Props = NativeStackScreenProps<TypeAuthStack, "AuthStack_Register">
const Register: React.FC<Props> = ({ navigation }) => {

  const form = useFormik<FormRegister>({
    initialValues: initFormRegister,
    onSubmit: (values) => handlerSubmit(values),
    validationSchema: schemaRegister,
  });

  const [post, { isLoading }] = useSendInfoRegisterMutation();
  const [alert, setAlert] = useState<Omit<AlertCustomProps, "onClose">>({
    textAlert: "",
    typeAlert: "notification",
    open: false,
  });

  const handlerSubmit = async (values: FormRegister) => {
    const data: SendInfoRegisterPayload = {
      username: values.username,
      password: values.password,
      email: values.email,
    }

    const result = await post(data);

    if ("data" in result) {
      if (result.data.data === undefined) return;

      const exp = dayjs(result.data.data.timeEnd).toString();
      const expLocal = dayjs(result.data.data.timeEnd).add(60, "s").toString();

      if (result.data.data !== undefined) {
        const saveInfo: InfoAcceptCode = {
          id: result.data.data.id,
          email: form.values.email,
          username: form.values.username,
          password: form.values.password,
          exp,
          expLocal,
        }
        const _ = await AsyncStorage.setItem(
          "id",
          JSON.stringify(saveInfo),
        )
        navigation.navigate("AuthStack_AcceptCodeRegister");
      }


    } else {
      setAlert({
        typeAlert: "error",
        textAlert: "Error",
        open: true,
      })
    }
  }

  const checkExistId = async () => {
    const data = await AsyncStorage.getItem("id");
    if (data === null) return;

    const convert = (data as any) as TemporaryInfo;
    if (dayjs(convert.expLocal).isAfter(dayjs())) {
      //navigation.navigate("CheckAuth");
    } else {
      await AsyncStorage.removeItem("id");
    }
  }

  useEffect(() => {
    checkExistId();
  }, []);


  return (
    <ScrollViewCustom contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          backgroundColor: "#1C202F",
          width: "100%",
          height: "100%",
          padding: 20,
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <YstackCustom spacing={50}>

          <YstackCustom spacing={20}>
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <IconChat height={60} width={60} />
            </View>
            <Text
              style={{
                fontSize: 40,
                textTransform: "uppercase",
                width: "100%",
                textAlign: "center",
                color: "#766FB8",
                fontWeight: "800",
              }}
            >Register</Text>
          </YstackCustom>


          <YstackCustom spacing={10}>
            <TextInputCustom
              label="Username"
              placeholder="Username"
              textValidate={form.errors.username}
              value={form.values.username}
              onChangeText={form.handleChange("username")}
            />
            <TextInputCustom
              label="Email"
              placeholder="Email"
              value={form.values.email}
              textValidate={form.errors.email}
              onChangeText={form.handleChange("email")}
            />
            <TextInputCustom
              label="Password"
              placeholder="Password"
              secureTextEntry
              value={form.values.password}
              textValidate={form.errors.password}
              onChangeText={form.handleChange("password")}
            />
            <TextInputCustom
              label="Comfirm password"
              placeholder="Confirm password"
              secureTextEntry
              value={form.values.confirmPassword}
              textValidate={form.errors.confirmPassword}
              onChangeText={form.handleChange("confirmPassword")}
            />
          </YstackCustom>

          <YstackCustom spacing={16}>
            <ButtonCustom
              label="Register"
              loading={isLoading}
              onPress={form.handleSubmit}
            />
            <DividerCustom
              text="or"
              paddingHorizontal={50}
            />
            <ButtonCustom
              disabled={isLoading}
              label="Login"
              onPress={() => navigation.navigate("AuthStack_Login")}
            />
          </YstackCustom>

        </YstackCustom>
      </View>
      <AlertCustom
        {...alert}
        onClose={() => setAlert({ ...alert, open: false })}
      /> 
    </ScrollViewCustom>
  )
}

export default Register;