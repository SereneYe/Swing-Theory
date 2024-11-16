import { View, Text, Pressable, Alert } from "react-native";
import React, { useRef, useState } from "react";
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
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth";
import { userAuthStateListener } from "../../redux/actions/auth";

const LoginScreen = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    return dispatch(login(email, password))
      .then(() => {
        console.log("Login successful");
        return null;
      })
      .catch((error) => {
        console.log("Login unsuccessful");
        return error;
      });
  };

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all the fields!");
      return;
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);
    const error = await handleLogin(email, password);

    setLoading(false);
    if (error) {
      Alert.alert("Login", error.message);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 800));
      navigation.navigate("home");
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

        {/* welcome */}
        <View>
          <Text style={styles.welcomeText}>Hey, </Text>
          <Text style={styles.welcomeText}>Welcome Back </Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please login to continue
          </Text>
          <Input
            autoCapitalize="none"
            icon={<MailIcon size={26} strokeWidth={1.6} />}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.textLight}
            onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={<LockIcon size={26} strokeWidth={1.6} />}
            secureTextEntry
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.textLight}
            onChangeText={(value) => (passwordRef.current = value)}
          />
          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          {/* button */}
          <Button title="Login" loading={loading} onPress={onSubmit} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Dont't have an account?</Text>
          <Pressable onPress={() => navigation.navigate("signUp")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semibold,
                },
              ]}
            >
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;
