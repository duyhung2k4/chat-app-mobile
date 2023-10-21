import React from "react";

import AcceptCodeRegister from "@/screen/Auth/AcceptCodeRegister";
import Login from "@/screen/Auth/Login";
import Register from "@/screen/Auth/Register";

import Home from "@/screen/Home";

import { TypeAuthStack } from "@/stack/auth.stack";
import { TypeHomeStack } from "@/stack/home.stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



export type TypeRootStack =
  & TypeAuthStack
  & TypeHomeStack



const Stack = createNativeStackNavigator<TypeRootStack>();
export type TypeStack = typeof Stack;
const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthStack_Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name="AuthStack_AcceptCodeRegister" component={AcceptCodeRegister} />
          <Stack.Screen name="AuthStack_Register" component={Register} />
          <Stack.Screen name="AuthStack_Login" component={Login}/>
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen name="HomeStack_Home" component={Home} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation;