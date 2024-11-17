import React, {  useRef, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import { View, Text, TouchableOpacity,  Pressable } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import {createPractice} from "../../redux/actions";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import CountdownBar from "react-native-countdown-bar";
import { GalleryIcon, ArrowLeftIcon } from "../../components/icons/icons";
import Button from "../../components/button";
import uuid from "uuid-random";
import RelaxDetailScreen from "../relaxDetails";
import { Audio } from "expo-av";


export default function CameraScreen({ route, navigation }) {
  const [facing, setFacing] = useState("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();
  const [imagePermission, requestImagePermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [finishedRecording, setFinishedRecording] = useState(false);
  const dispatch = useDispatch();
  const [showProgress, setShowProgress] = useState(false);
  const { practiceType, turnPreference } = route.params;
  const [sound, setSound] = useState();
  const sounds = [
    require("../../assets/voice/1.mp3"),
    require("../../assets/voice/2.mp3"),
    require("../../assets/voice/3.mp3"),
    require("../../assets/voice/4.mp3"),
    require("../../assets/voice/5.mp3"),
    require("../../assets/voice/6.mp3"),
    require("../../assets/voice/7.mp3"),
    require("../../assets/voice/8.mp3"),
    require("../../assets/voice/9.mp3"),
  ];
  const [timeLeft, setTimeLeft] = useState(5); // 倒计时初始时间 (秒)
  const circularProgressRef = useRef(null);

  if (!cameraPermission || !audioPermission || !mediaLibraryPermission) {
    return <View />;
  }

  if (
    !cameraPermission.granted ||
    !audioPermission.granted ||
    !mediaLibraryPermission.granted
  ) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          We need your permission to use the camera, microphone, and media
          library
        </Text>
        <Button
          style={styles.permissionButton}
          onPress={() => {
            requestCameraPermission();
            requestAudioPermission();
            requestImagePermission();
            requestMediaLibraryPermission();
          }}
          title="Grant permissions"
        />
      </View>
    );
  }

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    const selectedVideo = result.assets[0].uri;
    if (!selectedVideo) return;

    if (!result.canceled) {
      navigation.navigate("savePost", { source: selectedVideo });
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const toggleRecording = async () => {
    let roundId = uuid();
    let videoAddresses = [];
    for (let i = 0; i < turnPreference; i++) {
      console.log("Turns:", i);
      setShowProgress(true);
      console.log("Waiting for 3 seconds...");

      if (i === 0) {
        playBeginSound();
      }
      // else if (i === turnPreference - 1) {
      //   playLastSound();
      // }
      else {
        playSound();
      }
      await new Promise((resolve) => setTimeout(resolve, 4550));
      playAlertSound();
      await new Promise((resolve) => setTimeout(resolve, 450));

      setShowProgress(false);
      const videoAddr = await recordVideo();
      if (videoAddr) {
        videoAddresses.push(videoAddr);
      }
    }
    playFinishSound();
    setFinishedRecording(true);
    await stopRecording();
    for (let i = 0; i < videoAddresses.length; i++) {
      console.log("Dispatching video:", videoAddresses[i]);
      await dispatchVideo(
        videoAddresses[i],
        roundId,
        turnPreference,
        practiceType
      );
    }
    setFinishedRecording(false);
  };

  const recordVideo = async () => {
    if (!cameraRef.current) return null;
    setIsRecording(true);
    const videoPromise = await cameraRef.current.recordAsync({
      maxDuration: 3,
      codec: "avc1",
    });

    if (videoPromise) {
      console.log("Video recorded", videoPromise.uri);
      setIsRecording(false);
      // await saveVideoToLibrary(videoPromise.uri);
      return videoPromise.uri;
    }
    return null;
  };

  const dispatchVideo = async (
    videoURI,
    roundId,
    turnPreference,
    practiceType
  ) => {
    await dispatch(createPractice(videoURI, roundId, turnPreference, practiceType))
      .then(() => {
        console.log("createPratice dispatched successfully. Navigating to top...");
      })
      .catch((error) => {
        console.log("Dispatching createPratice failed:", error);
      })
      .finally(() => {});
  };

  const stopRecording = async () => {
    if (!cameraRef.current) return;
    try {
      await cameraRef.current.stopRecording();
      console.log("Video recording stopped");
    } catch (error) {
      console.error("Error stopping video recording:", error.message);
    } finally {
      setIsRecording(false);
    }
  };

  // const saveVideoToLibrary = async (uri) => {
  //   try {
  //     // Check permissions
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       throw new Error("Media library permissions not granted");
  //     }
  //
  //     // Check whether the video exists
  //     const fileInfo = await FileSystem.getInfoAsync(uri);
  //     if (!fileInfo.exists) {
  //       throw new Error("File does not exist");
  //     }
  //
  //     // Save the video to album
  //     await MediaLibrary.createAssetAsync(uri);
  //     await MediaLibrary.createAlbumAsync("Videos", asset, false);
  //     console.log("Video saved successfully to media library");
  //   } catch (error) {
  //     console.error("Error saving video to library:", error.message);
  //   }
  // };

  async function playSound() {
    console.log("Loading Sound");
    let randomNumber = Math.floor(Math.random() * 9);
    const { sound } = await Audio.Sound.createAsync(sounds[randomNumber]);
    setSound(sound);
    await sound.playAsync();
  }

  async function playBeginSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/voice/b.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  // async function playLastSound() {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("../../assets/voice/l.mp3")
  //   );
  //   setSound(sound);
  //   await sound.playAsync();
  // }

  async function playAlertSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/voice/alert.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  async function playFinishSound() {
    const { sound } = await Audio.Sound.createAsync(
        require("../../assets/voice/f.m4a")
    );

    setSound(sound);
    await sound.playAsync();
  }

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  if (finishedRecording) {
    return <RelaxDetailScreen />;
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing={facing}
          flashMode={"auto"}
          CameraRatio={"16:9"}
          onCameraReady={() => setIsCameraReady(true)}
          mode={"video"}
        >
          <View style={styles.backButtonContainer}>
            <Pressable
              onPress={() => navigation.navigate("home")}
              style={styles.backButton}
            >
              <ArrowLeftIcon
                strokeWidth={2.0}
                color="white"
                width={50}
                height={50}
              />
            </Pressable>
          </View>
          <View style={styles.sideBarContainer}>
            <TouchableOpacity
              style={styles.sideBarButton}
              onPress={toggleCameraFacing}
            >
              <Feather name="refresh-ccw" size={32} color="white" />
            </TouchableOpacity>
          </View>

          {isRecording && (
            <View style={styles.countdownBarContainer}>
              <CountdownBar
                time={3}
                height="3"
                BgColor="rgba(139,0,0,0.8)"
                BgColorIn="rgba(0, 0, 0, 0)"
              />
            </View>
          )}

          {showProgress ? (
            <View style={styles.counterCircularProgress}>
              <CountdownCircleTimer
                  isPlaying
                  duration={5}
                  strokeWidth={14}
                  colors={['#78c24e', '#ffc100', '#b40101']}
                  colorsTime={[5, 3, 0]}
              >
                {({ remainingTime }) => <Text style={styles.timerText}>{remainingTime}</Text>}
              </CountdownCircleTimer>


            </View>
          ) : null}

        </CameraView>
      ) : null}

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            disabled={!isCameraReady || showProgress}
            onPress={toggleRecording}
            style={[
              styles.recordButton,
              isRecording,
              (!isCameraReady || showProgress) && styles.recordButtonDisabled,
            ]}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.galleryButton} onPress={pickVideo}>
            <GalleryIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
