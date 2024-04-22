import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale } from "../utils/Scale";
const TextContainer = ({ videoData, showControls }) => {
  return (
    <View style={[styles.textContainer, { top: showControls ? moderateScale(35) : moderateScale(57.5), }]}>
      <Text style={styles.title}>{videoData.title}</Text>
      <Text style={styles.description}>{videoData.description}</Text>
      <Text style={styles.subtitle}>{videoData.subtitle}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: moderateScale(20),
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    bottom: 10,
  },
  description: {
    fontSize: 18,
    bottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
});
export default TextContainer;
