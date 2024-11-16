import React, { useRef, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import { StatusBar } from "expo-status-bar";
import {
  MailIcon,
  LockIcon,
  ArrowLeftIcon,
} from "../../components/icons/icons";
import { hp } from "../../constants/common";
import { theme } from "../../constants/theme";
import Button from "../../components/button";
import Input from "../../components/input";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { register } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

const SignUpScreen = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignUp = async (email, password) => {
    return dispatch(register(email, password))
      .then(() => {
        console.log("register successful");
        return null;
      })
      .catch((error) => {
        console.log("register unsuccessful");
        return error;
      });
  };

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign up", "Please fill all the fields!");
      return;
    }
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const error = await handleSignUp(email, password);
    if (error) {
      Alert.alert("Sign up", error.message);
      setLoading(false);
    } else {
      navigation.navigate("login");
    }
  };

  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View>
          <Pressable
            onPress={() => navigation.navigate("welcome")}
            style={styles.backButton}
          >
            <ArrowLeftIcon strokeWidth={2.5} color={theme.colors.text} />
          </Pressable>
        </View>

        <View>
          <Text style={styles.welcomeText}>Lets's </Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please fill the details to create an account
          </Text>

          <Input
            autoCapitalize="none"
            icon={<MailIcon size={26} strokeWidth={1.6} />}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.textLight}
            onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={<LockIcon name="lock" size={26} strokeWidth={1.6} />}
            secureTextEntry
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.textLight}
            onChangeText={(value) => (passwordRef.current = value)}
          />

          <Button title="Sign up" loading={loading} onPress={onSubmit} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account!</Text>
          <Pressable onPress={() => navigation.navigate("login")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semibold,
                },
              ]}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUpScreen;
