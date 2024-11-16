import React from "react";
import { View, Text } from "react-native";
import Video from "react-native-video";

const VideoPlayerScreen = ({ navigation, route }) => {
  const { external, videoURL } = route.params || {};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Video source={{ uri: videoURL }} style={{ flex: 1 }} />
    </View>
  );
};

export default VideoPlayerScreen;
