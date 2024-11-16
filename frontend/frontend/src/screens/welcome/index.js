import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import { StatusBar } from "expo-status-bar";
import { wp } from "../../constants/common";
import { theme } from "../../constants/theme";
import Button from "../../components/button";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* welcome image */}
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../../assets/images/welcome_image.png")}
        />
        {/* title */}
        <View style={{ gap: 20, flex: 1 }}>
          <Image
            style={styles.welcomeTitle}
            resizeMode="contain"
            source={require("../../assets/images/welcome_title.png")}
          />
          <Text style={styles.punchline}>
            Unlock your perfect swing with our UNIVERSE No.1 AI Coach 🤩 !
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => navigation.navigate("login")}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Didn't have an account?</Text>
            <Pressable onPress={() => navigation.navigate("signUp")}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default WelcomeScreen;
