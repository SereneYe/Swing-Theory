import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as Progress from "react-native-progress";
import styles from "./styles";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import { theme } from "../../constants/theme";
import { getUserInfo } from "../../services/user";
import { hp } from "../../constants/common";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon, ArrowRightIcon } from "../../components/icons/icons";

const HomeScreen = () => {
  // const [user, setUser] = useState(() => getUserInfo());
  // useEffect(
  //   useCallback(() => {
  //     (async () => {
  //       const data = await getUserInfo();
  //       setUser(data);
  //     })();
  //   }, [])
  // );
  const banner = require("../../assets/images/bg.jpeg");
  const forehand = require("../../assets/images/forehand.png");
  const backhand = require("../../assets/images/backhand.png");
  const serve = require("../../assets/images/serve.png");
  const couple = require("../../assets/images/teachvideo.png");
  const star = require("../../assets/images/Star.png");
  const play = require("../../assets/images/play.png");
  const backteach = require("../../assets/images/backteach.png");
  const serveteach = require("../../assets/images/serveteach.png");

  const navigation = useNavigation();

  const data = [
    {
      id: "Forehand",
      name: "Forehand",
      status: 24,
      image: forehand,
      color: theme.colors.lightYellow,
      darkColor: theme.colors.darkYellow,
    },
    {
      id: "Backhand",
      name: "Backhand",
      status: 50,
      image: backhand,
      color: theme.colors.lightGreen,
      darkColor: theme.colors.darkGreen,
    },
    {
      id: "Serve",
      name: "Serve",
      status: 88,
      image: serve,
      color: theme.colors.lightBlue,
      darkColor: theme.colors.darkBlue,
    },
  ];

  const Card = ({ data, index, navigation }) => {
    return (
      <View
        style={{
          flex: 1,
          height: index === 1 ? hp(18) : hp(16),
          padding: 6,
          alignSelf: "center",
          backgroundColor: data.color,
          justifyContent: "space-between",
          marginHorizontal: 8,
          borderRadius: 10,
          shadowColor: "lightgrey",
          shadowOffset: { width: -5, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 2,
        }}
      >
        <View style={{ alignSelf: "center", marginTop: 10 }}>
          <Progress.Circle
            size={70}
            showsText={true}
            progress={data.status / 100}
            formatText={() => data.status + "%"}
            unfilledColor="#ededed"
            borderColor="#ededed"
            color={data.darkColor}
            direction="clockwise"
            strokeCap="round"
            thickness={7}
            style={styles.circlestyle}
            textStyle={styles.textStyle}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => navigation.push("summary", { summaryId: data.id })}
            style={styles.practicePressContainer}
          >
            <Text style={styles.circleText}>{data.name}</Text>
            <ArrowRightIcon color={theme.colors.textDark} />
          </Pressable>
        </View>
      </View>
    );
  };

  const videoData = [
    {
      title: "Forehand Training",
      description: "2 Hour Forehand Training",
      duration: "45 Min",
      level: "Beginner",
      image: couple,
    },
    {
      title: "Backhand Training",
      description: "1.5 Hour Backhand Training",
      duration: "40 Min",
      level: "Intermediate",
      image: backteach,
    },
    {
      title: "Serve Training",
      description: "1 Hour Serve Practice",
      duration: "30 Min",
      level: "Advanced",
      image: serveteach,
    },
  ];

  const VideoPlay = ({ video }) => (
    <View style={styles.videoCard}>
      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        <ImageBackground
          source={video.image}
          style={styles.VideoImage}
        ></ImageBackground>
        <Text style={styles.videoText}>{video.title}</Text>
        <View style={styles.videoplay1}>
          <Image source={star} style={styles.videoImage} />
        </View>
      </View>

      <View style={styles.videoplay2}>
        <View style={styles.videoplay3}>
          <Image source={play} style={styles.videoImage} />
        </View>
        <Text style={styles.videoTitle}> {video.description}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.cirText}>{video.level}</Text>
          <Text style={styles.videotext}>{video.duration}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}> Hey, Welcome Back 😀</Text>
        </View>
        <ScrollView style={styles.screen}>
          <ImageBackground style={styles.banner} source={banner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Serve, Smash & Win!🎾</Text>
              <Text style={styles.title}>Become a Tennis Pro with Us! ✊</Text>
            </View>
          </ImageBackground>

          <View style={styles.activitiesContainer}>
            <Text style={styles.activitiesTitle1}>Practices</Text>
            <View style={{ flexDirection: "row" }}>
              {data.map((item, index) => (
                <Card
                  key={item.name}
                  data={item}
                  index={index}
                  navigation={navigation}
                />
              ))}
            </View>
          </View>

          <View style={{ padding: 10, alignItems: "flex-start" }}>
            <Text style={styles.titleVideo}>Tutorial Video</Text>
            <ScrollView
              horizontal
              style={{ paddingBottom: 20, paddingTop: 10 }}
            >
              {videoData.map((video, index) => (
                <VideoPlay key={index} video={video} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;
