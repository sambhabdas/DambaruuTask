import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { videoWidth, videoHeight, height, width } from "../utils/Const";

const Controls = ({
  handleBackward,
  togglePlayPause,
  handleForward,
  isPlaying,
  isFullScreen,
}) => {
  const controlsTop = (isFullScreen ? width - 48 : videoHeight - 48) / 2;
  return (
    <View
      style={[
        styles.controls,
        { top: controlsTop, width: isFullScreen ? height : videoWidth },
      ]}
    >
      <TouchableOpacity onPress={handleBackward}>
        <MaterialIcons name="replay-10" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={togglePlayPause}>
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={48}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForward}>
        <MaterialIcons name="forward-10" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
  },
});

export default Controls;
