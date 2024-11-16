import React from "react";
import { View } from "react-native";
import { LogBox } from 'react-native';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  HomeIcon,
  AddIcon,
  UserIcon,
  TennisIcon,
} from "../../components/icons/icons";
import { theme } from "../../constants/theme";
import HomeScreen from "../../screens/home";
import ProfileScreen from "../../screens/profile";
import HistoryScreen from "../../screens/history";
import SelectScreen from "../../screens/cameraSelect";
import ResultScreen from "../../screens/result";
import SummaryScreen from "../../screens/summary";


LogBox.ignoreLogs([
    'A props object containing a "key" prop is being spread into JSX',
]);

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return <View></View>;
};

export default function MainScreen() {
  return (
    <Tab.Navigator
      activeColor={theme.colors.primaryDark2}
      inactiveColor="white"
      barStyle={{
        backgroundColor: theme.colors.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
      }}
      initialRouteName="main"
    >
      <Tab.Screen
        name="Home"
        key="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />

      <Tab.Screen
        name="Add"
        key="Add"
        component={SelectScreen}
        options={{
          tabBarIcon: ({ color }) => <AddIcon color={color} />,
        }}
      />

      <Tab.Screen
        name="History"
        key="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => <TennisIcon color={color} />,
        }}
      />
      {/* <Tab.Screen
        name="Result"
        component={ResultScreen}
        options={{
          tabBarIcon: ({ color }) => <TennisIcon color={color} />,
        }}
      /> */}

      <Tab.Screen
        name="Me"
        key="Me"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
