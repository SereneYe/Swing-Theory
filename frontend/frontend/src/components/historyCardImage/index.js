import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React from "react";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";
import { Video } from "expo-av";
import { styles } from "./styles";
import * as Progress from "react-native-progress";

export const HistoryCardImageContainer = ({ item, index, type }) => {
  let compare_url1 = "",
    compare_url2 = "",
    compare_url3 = "";
  if (type == "Forehand") {
    compare_url1 =
      "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fforehand1.png?alt=media&token=6df5c78e-8222-45df-b856-3a580131829f";
    compare_url2 =
      "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fforehand2.png?alt=media&token=f92c608c-cb78-4c0f-991e-7e698b17a576";
    compare_url3 =
      "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fforehand3.png?alt=media&token=7e118772-d3b6-417b-ad11-3dca4414e36a";
  } else if (type == "Backhand") {
    compare_url1 =
      "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75";
    compare_url2 =
      "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea";
    compare_url3 =
      "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40";
  } else {
    compare_url1 =
      "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fserve1.png?alt=media&token=2be862b0-3b75-40bc-a95e-b29820bcdb12";
    compare_url2 =
      "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fserve2.png?alt=media&token=cc27f129-fa57-4dc5-aabd-588c5dbb8062";
    compare_url3 =
      "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fserve3.png?alt=media&token=371d5164-4471-42ec-af1b-fdbce6b6f59e";
  }

  return (
    <View style={styles.cardImageContainer}>
      <Text style={styles.resultDivisor}>
        {"---------------" + " TURN " + (index + 1) + " ---------------"}
      </Text>
      <View style={styles.resultColumnContainer}>
        <Text style={styles.resultTitle}>⭐️ Your Turn Score ⭐️</Text>
        <View style={{ alignSelf: "center" }}>
          <Progress.Circle
            size={120}
            showsText={true}
            progress={(item.score || 76) / 100}
            formatText={() => item.score || 76}
            unfilledColor="#ededed"
            borderColor="#ededed"
            color={theme.colors.primary}
            direction="clockwise"
            strokeCap="round"
            thickness={12}
            style={styles.circlestyle}
            textStyle={styles.textStyle}
          />
        </View>
      </View>

      <View style={styles.resultColumnContainer}>
        <Text style={styles.resultTitle}>⭐️ Stage 1 Comparison ⭐️</Text>
        <View style={styles.resultImageContainer}>
          <Image
            source={{ uri: item.image_url1 }}
            style={{ ...styles.resultImage }}
          />
          <Image
            source={{ uri: compare_url1 }}
            style={{ ...styles.resultImage }}
          />
        </View>

        <Text style={styles.resultTitle}>🎯 Your Instruction </Text>
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultText}>👉 {item.instruction1}</Text>
        </View>
        <Text style={styles.resultTitle}>⭐️ Stage 2 Comparison ⭐️</Text>
        <View style={styles.resultImageContainer}>
          <Image
            source={{ uri: item.image_url2 }}
            style={{ ...styles.resultImage }}
          />
          <Image
            source={{ uri: compare_url2 }}
            style={{ ...styles.resultImage }}
          />
        </View>

        <Text style={styles.resultTitle}>🎯 Your Instruction </Text>
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultText}>👉 {item.instruction2}</Text>
        </View>

        <Text style={styles.resultTitle}>⭐️ Stage 3 Comparison ⭐️</Text>
        <View style={styles.resultImageContainer}>
          <Image
            source={{ uri: item.image_url3 }}
            style={{ ...styles.resultImage }}
          />
          <Image
            source={{ uri: compare_url3 }}
            style={{ ...styles.resultImage }}
          />
        </View>

        <Text style={styles.resultTitle}>🎯 Your Instruction </Text>
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultText}>👉 {item.instruction3}</Text>
        </View>
      </View>

      <View style={styles.resultLastColumnContainer}>
        <Text style={styles.resultTitle}>⭐️ Your Video ⭐️</Text>
        <Video
          style={[styles.postMedia, {}]}
          source={{ uri: item.video_url }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      </View>
    </View>
  );
};
