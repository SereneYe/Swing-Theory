import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import Button from "../../components/button/index";
import { theme } from "../../constants/theme";
import { hp } from "../../constants/common";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import { ArrowLeftIcon } from "../../components/icons/icons";

const SelectScreen = () => {
  const [round, setRound] = useState({ practiceType: "", turn: "" });
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const practiceTypeList = [
    { title: "Forehand" },
    { title: "Backhand" },
    { title: "Serve" },
  ];
  const turnList = [
    { title: "2" },
    { title: "5" },
    { title: "10" },
    { title: "15" },
  ];

  const onSubmit = async () => {
    let roundData = { ...round };
    let { practiceType, turnPreference } = roundData;
    if (!practiceType || !turnPreference) {
      Alert.alert("Practice Set", "Please select practice type and turns!");
      return;
    }
    setLoading(true);
    navigation.navigate("camera", roundData);
    setLoading(false);
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
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
          <Text
            style={{
              fontSize: hp(2),
              color: theme.colors.text,
              fontWeight: "500",
            }}
          >
            Please select hits you want to practice:
          </Text>
          <SelectDropdown
            data={practiceTypeList}
            onSelect={(selectedItem, index) => {
              setRound({ ...round, practiceType: selectedItem.title });
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
                      "  Select Practice Type"}
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
                  <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
          <SelectDropdown
            data={turnList}
            onSelect={(selectedItem, index) => {
              setRound({ ...round, turnPreference: selectedItem.title });
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
                      "  Select Number of Turns"}
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
                  <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          {/* button */}
          <Button title="Start!" loading={loading} onPress={onSubmit} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SelectScreen;
