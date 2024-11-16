import { View, ActivityIndicator } from "react-native";
import React from "react";

const Loading = ({ size = "large", color = "#555" }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;
