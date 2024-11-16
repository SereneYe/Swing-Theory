import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import Button from "../../components/button/index";
import Input from "../../components/input/index";
import * as ImagePicker from "expo-image-picker";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import styles from "./styles";
import {
  ArrowLeftIcon,
  CameraIcon,
  PhoneIcon,
  RulerIcon,
  ScaleIcon,
  UserIcon,
} from "../../components/icons/icons";
import { createImage, getUserInfo, updateUserInfo } from "../../services/user";

const EditProfileScreen = () => {
  const [currentUser, setUserData] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    image: null,
    gender: "",
    height: "",
    weight: "",
    handPreference: "",
  });

  const genderList = [
    { title: "Male" },
    { title: "Female" },
    { title: "Prefer not to say" },
  ];

  const handList = [{ title: "Left-handed" }, { title: "Right-handed" }];
  useEffect(() => {
    getUserInfo().then((user) => setUserData(user));
  }, []);

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name || "",
        phoneNumber: currentUser.phoneNumber || "",
        image: currentUser.image || null,
        height: currentUser.height || "",
        weight: currentUser.weight || "",
        handPreference: currentUser.handPreference || "",
      });
    }
  }, [currentUser]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, image: result.assets[0] });
    }
  };

  const onSubmit = async () => {
    let userData = { ...user };
    let { name, phoneNumber, image, gender, height, weight, handPreference } =
      userData;
    if (
      !name ||
      !phoneNumber ||
      !image ||
      !gender ||
      !height ||
      !weight ||
      !handPreference
    ) {
      Alert.alert("Profile", "Please fill all the fields");
      return;
    }

    setLoading(true);
    if (typeof image == "object") {
      let imageResult = await createImage(image.uri);
      if (imageResult) userData.image = imageResult;
      else userData.image = null;
    }

    const res = await updateUserInfo(userData);
    console.log(res);
    if (res.success) {
      setUserData({ ...currentUser, ...userData });
      navigation.goBack();
    }
  };

  let imageSource = user.image
    ? user.image
    : require("../../assets/images/defaultUser.png");

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <ArrowLeftIcon strokeWidth={2.5} color={theme.colors.text} />
            </Pressable>
          </View>
          {/* form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
              <Pressable
                style={styles.cameraIcon}
                onPress={() => onPickImage()}
              >
                <CameraIcon name="camera" strokeWidth={2.5} size={20} />
              </Pressable>
            </View>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill your profile details
            </Text>
            <Input
              icon={<UserIcon name="user" size={26} />}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.textLight}
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />
            <Input
              icon={<PhoneIcon name="call" size={26} />}
              placeholder="Enter your phone number"
              placeholderTextColor={theme.colors.textLight}
              value={user.phoneNumber}
              onChangeText={(value) => setUser({ ...user, phoneNumber: value })}
            />
            {/* **********SELECT GENDER********** */}
            <View style={styles.selectContainer}>
              <SelectDropdown
                data={genderList}
                onSelect={(selectedItem, index) => {
                  setUser({ ...user, gender: selectedItem.title });
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      {selectedItem && (
                        <Icon
                          name={selectedItem.icon}
                          style={styles.dropdownButtonIconStyle}
                        />
                      )}
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) ||
                          "  Select Gender"}
                      </Text>
                      <Icon
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        style={styles.dropdownButtonArrowStyle}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && { backgroundColor: "#D2D9DF" }),
                      }}
                    >
                      <Icon
                        name={item.icon}
                        style={styles.dropdownItemIconStyle}
                      />
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />

              <SelectDropdown
                data={handList}
                onSelect={(selectedItem, index) => {
                  setUser({ ...user, handPreference: selectedItem.title });
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      {selectedItem && (
                        <Icon
                          name={selectedItem.icon}
                          style={styles.dropdownButtonIconStyle}
                        />
                      )}
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) ||
                          "  Hand Preference"}
                      </Text>
                      <Icon
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        style={styles.dropdownButtonArrowStyle}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && { backgroundColor: "#D2D9DF" }),
                      }}
                    >
                      <Icon
                        name={item.icon}
                        style={styles.dropdownItemIconStyle}
                      />
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>
            {/* **********ONE ROW OF SELECT********** */}

            <Input
              icon={<RulerIcon name="height" />}
              placeholder="Enter your height(cm)"
              placeholderTextColor={theme.colors.textLight}
              onChangeText={(value) => setUser({ ...user, height: value })}
              value={user.height}
            />
            <Input
              icon={<ScaleIcon name="weight" />}
              placeholder="Enter your weight(kg)"
              placeholderTextColor={theme.colors.textLight}
              onChangeText={(value) => setUser({ ...user, weight: value })}
              value={user.weight}
            />

            {/* button */}
            <Button title="Update" loading={loading} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfileScreen;
