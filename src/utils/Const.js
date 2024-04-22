import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get("window");
export const aspectRatio = 16 / 9;
export const videoWidth = width;
export const videoHeight = videoWidth / aspectRatio;
