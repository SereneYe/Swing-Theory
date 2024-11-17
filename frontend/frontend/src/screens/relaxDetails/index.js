import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { hp, wp } from "../../constants/common";

export default function RelaxDetailScreen() {
  const onboardingRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onboardingRef.current) {
        if (onboardingRef.current.state.currentPage >= 5) {
          setCurrentIndex(0);
          onboardingRef.current.goToPage(0, true);
        } else {
          onboardingRef.current.goNext();
          setCurrentIndex(currentIndex + 1);
        }
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const animations = [
    {
      file: require("../../assets/animations/dynamic-chest-shoulders-stretching.json"),
      title: "Dynamic Chest & Shoulders Stretching",
      description: "A great way to stretch your chest and shoulders.",
      color: "#f6cedc",
    },
    {
      file: require("../../assets/animations/dynamic-chest-stretching.json"),
      title: "Dynamic Chest Stretching",
      description:
        "Flex and tone your chest muscles with dynamic chest stretching.",
      color: "#DACFFF",
    },

    {
      file: require("../../assets/animations/overhead-tricep-stretching.json"),
      title: "Overhead Tricep Stretching",
      description: "Strengthen and tone your triceps with overhead stretching.",
      color: "#fdedc9",
    },
    {
      file: require("../../assets/animations/rear-deltoid-shoulders-stretching.json"),
      title: "Rear Deltoid & Shoulders Stretching",
      description:
        "Improve the flexibility and strength of your rear deltoids and shoulders.",
      color: "#e9f8d4",
    },
    {
      file: require("../../assets/animations/side-lunge-stretching.json"),
      title: "Side Lunge Stretching",
      description:
        "Boost your lower body strength and balance with side lunge stretches.",
      color: "#fdd5e3",
    },
    {
      file: require("../../assets/animations/standing-quadricep-stretching.json"),
      title: "Standing Quadricep Stretching",
      description:
        "Reduce risk of injury and improve flexibility with standing quadricep stretches.",
      color: "#cce4fb",
    },
  ];

  const pages = animations.map((animation) => ({
    backgroundColor: animation.color,
    image: (
      <LottieView
        style={{ height: hp(40), width: wp(90) }}
        source={animation.file}
        autoPlay
        loop
      />
    ),
    title: animation.title,
    subtitle: animation.description,
  }));

  return (
    <View style={styles.container}>
      <Onboarding
        ref={onboardingRef}
        bottomBarHighlight={false}
        showSkip={false}
        showNext={false}
        showDone={false}
        titleStyles={{ fontWeight: "600" }}
        subTitleStyles={{ fontWeight: "500" }}
        containerStyles={{ paddingHorizontal: 15 }}
        imageContainerStyles={{ paddingBottom: 40 }}
        pages={pages}
      />
      <Text style={styles.congratulations}>
        The system is analysing 🤖...{"\n"}Why not take this time to do some
        stretching exercises 😃?
      </Text>
      <ActivityIndicator
        color="gray"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  congratulations: {
    position: "absolute",
    top: hp(10),
    left: 0,
    right: 0,
    margin: 5,
    padding: 5,
    fontSize: hp(2.5),
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
  },
  activityIndicator: {
    zIndex: 1,
    position: "absolute",
    top: hp(82),
    left: 0,
    right: 0,
  },
});
