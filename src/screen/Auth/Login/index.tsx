import React, { useState } from "react";
import ButtonCustom from "@/components/Button";
import DividerCustom from "@/components/Divider";
import TextInputCustom from "@/components/Form/TextInput";
import ScrollViewCustom from "@/components/ScrollView";
import YstackCustom from "@/components/YStack";
import AlertCustom, { AlertCustomProps } from "@/components/Alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";

import IconChat from "@/assets/icon/chat-round-dots-svgrepo-com.svg";

import { useLoginMutation } from "@/redux/query/api/auth";
import { TypeHomeStack } from "@/stack/home.stack";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import { useFormik } from "formik";
import { Text, View } from "react-native-ui-lib";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TypeAuthStack } from "@/stack/auth.stack";
import { StyleSheet } from "react-native";

interface FormLogin {
  username: string
  password: string
}
const initFormLogin: FormLogin = {
  username: "",
  password: "",
}

const schemaLogin = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
})

type Props = NativeStackScreenProps<TypeAuthStack, "AuthStack_Login">;
const Login: React.FC<Props> = ({ navigation }) => {

  const [login, { isLoading }] = useLoginMutation();
  const [alert, setAlert] = useState<Omit<AlertCustomProps, "onClose">>({
    textAlert: "",
    typeAlert: "notification",
    open: false,
  });

  const navigationHome = useNavigation<NavigationProp<TypeHomeStack, "HomeStack_Home">>()

  const form = useFormik<FormLogin>({
    initialValues: initFormLogin,
    onSubmit: (values) => handlerLogin(values),
    validationSchema: schemaLogin,
  })

  const handlerLogin = async (infoLogin: FormLogin) => {
    const result = await login({
      username: infoLogin.username,
      password: infoLogin.password,
    })

    if ("data" in result) {
      const accessToken = result.data.data?.accessToken;
      if(accessToken === undefined) {
        setAlert({
          typeAlert: "error",
          textAlert: "Error",
          open: true,
        })  
      } else {
        const _ = await AsyncStorage.setItem("accessToken", accessToken);
        navigationHome.navigate("HomeStack_Home");
      }
    } else {
      setAlert({
        typeAlert: "error",
        textAlert: "Error",
        open: true,
      })
    }
  }

  return (
    <ScrollViewCustom contentContainerStyle={{ flexGrow: 1 }} >
      <View style={styles.root}>
        <YstackCustom spacing={50}>


          <YstackCustom spacing={20}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <IconChat height={60} width={60} />
            </View>
            <Text style={styles.title}>Login</Text>
          </YstackCustom>


          <YstackCustom spacing={20}>
            <TextInputCustom
              label="Username"
              placeholder="Username"
              value={form.values.username}
              onChangeText={form.handleChange("username")}
              textValidate={form.errors.username}
            />
            <TextInputCustom
              label="Password"
              placeholder="Password"
              secureTextEntry
              value={form.values.password}
              onChangeText={form.handleChange("password")}
              textValidate={form.errors.password}
            />
          </YstackCustom>


          <YstackCustom spacing={16}>
            <ButtonCustom
              label="Login"
              loading={isLoading}
              onPress={form.handleSubmit}
            />
            <DividerCustom
              text="or"
              paddingHorizontal={50}
            />
            <ButtonCustom
              disabled={isLoading}
              label="Register"
              onPress={() => navigation.navigate("AuthStack_Register")}
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

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1C202F",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",
    color: "#766FB8",
    fontWeight: "800",
  }
})

export default Login;