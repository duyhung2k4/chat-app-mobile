import React from "react";
import Chat from "./Chat";
import Call from "./Call";
import Contact from "./Contact";
import Story from "./Story";

import { Text, View } from "react-native-ui-lib";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTabs } from "./tab";
import { StyleSheet } from "react-native";

import IconMess from "@/assets/icon/chat-round-line-svgrepo-com.svg";
import IconCameraVideo from "@/assets/icon/camera-video-fill-svgrepo-com.svg";
import IconPhone from "@/assets/icon/phone-svgrepo-com.svg";
import IconBook from "@/assets/icon/book-svgrepo-com.svg";

const Tab = createBottomTabNavigator<HomeTabs>();
const Home: React.FC = () => {

  return (
    <View style={styles.root}>
      <Tab.Navigator
        initialRouteName="Chat"
        screenOptions={{
          headerShown: false,
          lazy: true,
          tabBarStyle: {
            height: 60,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5,
            paddingBottom: 5,
          },
          tabBarLabel: (props) =>
            <Text
              style={{
                color: props.focused ? "#3276C3" : undefined,
                fontSize: props.focused ? 16 : 14,
              }}
            >{props.children}</Text>,
        }}
      >
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: () => <IconMess height={30} width={30} />
          }}
        />
        <Tab.Screen
          name="Call"
          component={Call}
          options={{
            tabBarIcon: () => <IconCameraVideo height={30} width={30} />
          }}
        />
        <Tab.Screen
          name="Contact"
          component={Contact}
          options={{
            tabBarIcon: () => <IconPhone height={30} width={30} />
          }}
        />
        <Tab.Screen
          name="Story"
          component={Story}
          options={{
            tabBarIcon: () => <IconBook height={30} width={30} />
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%"
  }
})

export default Home;