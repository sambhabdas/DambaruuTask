import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import Home from "../screens/Home";
import VideoScreen from "../screens/Video";

const AppStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "Home",
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={24}
              color="black"
              style={{ marginLeft: 16 }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Video"
        component={VideoScreen}
        options={{ title: "Video" }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
