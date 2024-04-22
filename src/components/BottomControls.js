import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";
import { moderateScale } from "../utils/Scale";
import formatTime from "./FormatTime";
const BottomControls = ({
  currentTime,
  duration,
  progress,
  handleSliderChange,
  handleSlidingComplete,
  handleFullScreen,
  isFullScreen,
}) => {
  return (
    <View style={styles.bottomControls}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timerText}> / {formatTime(duration)}</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={progress}
        onValueChange={handleSliderChange}
        onSlidingComplete={handleSlidingComplete}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
      />
      <TouchableOpacity onPress={handleFullScreen}>
        <MaterialIcons
          name={isFullScreen ? "fullscreen-exit" : "fullscreen"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomControls: {
    bottom: moderateScale(35),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    width: "100%",
  },
  timerContainer: {
    flexDirection: "row",
    marginRight: moderateScale(10),
  },
  timerText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  slider: {
    flex: 1,
    marginHorizontal: moderateScale(10),
  },
});
export default BottomControls;
