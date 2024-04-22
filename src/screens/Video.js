import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";
import Controls from "../components/Controls";
import BottomControls from "../components/BottomControls";
import TextContainer from "../components/TextContainer";
import { videoWidth, videoHeight, height, width } from "../utils/Const";
import { fetchVideoScreens } from "../api/api";

const VideoScreen = () => {
  const [videoData, setVideoData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVideoScreens();
        setVideoData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isFullScreen) {
          handleFullScreen();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [isFullScreen]);

  useEffect(() => {
    if (videoData) {
      setDuration(videoData.duration);
    }
  }, [videoData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime((prevTime) => prevTime + 1000);
        setProgress((currentTime / duration) * 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  useEffect(() => {
    let timer;
    if (showControls) {
      timer = setTimeout(() => {
        setShowControls(false);
      }, 5000); // Hide controls after 5 seconds if not tapped
    }
    return () => clearTimeout(timer);
  }, [showControls]);

  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleForward = () => {
    const newPosition = currentTime + 10000;
    setCurrentTime(Math.min(newPosition, duration));
    videoRef.current.setPositionAsync(newPosition);
  };

  const handleBackward = () => {
    const newPosition = currentTime - 10000;
    setCurrentTime(Math.max(newPosition, 0));
    videoRef.current.setPositionAsync(newPosition);
  };

  const handleFullScreen = async () => {
    if (isFullScreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
      setIsFullScreen(false);
      navigation.setOptions({ headerShown: true });
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
      setIsFullScreen(true);
      navigation.setOptions({ headerShown: false });
    }
  };

  const handleTapVideo = () => {
    setShowControls((prevState) => !prevState);
  };

  const handleSliderChange = (value) => {
    setProgress(value);
    setCurrentTime((value * duration) / 100);
  };

  const handleSlidingComplete = (value) => {
    videoRef.current.setPositionAsync((value * duration) / 100);
  };

  const containerStyles = {
    width: isFullScreen ? height + 17 : videoWidth,
    height: isFullScreen ? videoWidth : videoHeight,
    backgroundColor: "#000",
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleTapVideo}>
      <View style={[styles.container, containerStyles]}>
        {/* Add StatusBar with hidden prop */}
        <StatusBar hidden={isFullScreen} />
        {videoData ? (
          <>
            <Video
              ref={videoRef}
              source={{ uri: videoData.sources }}
              style={[
                styles.video,
                isFullScreen && { width: height, height: width },
              ]}
              useNativeControls={false}
              resizeMode="contain"
              isMuted={false}
              shouldPlay={isPlaying}
              onPlaybackStatusUpdate={(status) => {
                setCurrentTime(status.positionMillis);
                if (!duration) setDuration(status.durationMillis);
                setProgress(
                  (status.positionMillis / status.durationMillis) * 100
                );
              }}
            />
            {showControls && (
              <>
                <BottomControls
                  currentTime={currentTime}
                  duration={duration}
                  progress={progress}
                  handleSliderChange={handleSliderChange}
                  handleSlidingComplete={handleSlidingComplete}
                  handleFullScreen={handleFullScreen}
                  isFullScreen={isFullScreen}
                />
                <Controls
                  handleBackward={handleBackward}
                  togglePlayPause={togglePlayPause}
                  handleForward={handleForward}
                  isPlaying={isPlaying}
                  isFullScreen={isFullScreen}
                />
              </>
            )}
            <TextContainer videoData={videoData} showControls={showControls} />
          </>
        ) : (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={{ top: "50%" }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  video: {
    width: videoWidth,
    height: videoHeight,
  },
});

export default VideoScreen;
